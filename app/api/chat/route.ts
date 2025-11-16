import { Mistral } from "@mistralai/mistralai";
import { NextRequest } from "next/server";

const mistral = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY || "",
});

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Convert messages to Mistral format
    const mistralMessages = messages.map(
      (msg: { role: string; content: string }) => ({
        role: (msg.role === "assistant" ? "assistant" : "user") as
          | "user"
          | "assistant",
        content: msg.content,
      })
    );

    // Add system prompt for solo female travelers
    const systemPrompt = {
      role: "system" as const,
      content: `You are a helpful and empathetic AI travel assistant specifically designed to support solo female travelers. 
      Provide practical, safety-focused advice, destination recommendations, and travel tips. 
      Always prioritize safety, cultural awareness, and empowering women to travel confidently. 
      Be warm, encouraging, and informative.`,
    };

    // Use streaming for faster response times
    const stream = await mistral.chat.stream({
      model: "mistral-small-latest",
      messages: [systemPrompt, ...mistralMessages],
      temperature: 0.7,
      maxTokens: 800, // Reduced for faster responses
    });

    // Create a readable stream for the response
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            // Access content from the chunk - structure may vary by SDK version
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const chunkData = chunk as any;
            const content =
              chunkData.choices?.[0]?.delta?.content ||
              chunkData.data?.choices?.[0]?.delta?.content ||
              "";
            if (content) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          console.error("Streaming error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Mistral API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to get response from AI" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
