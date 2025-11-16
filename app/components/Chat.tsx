"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your travel companion. I'm here to help you plan safe and amazing adventures as a solo female traveler. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // Skip scrolling on initial mount to prevent page scroll
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    // Only scroll when messages actually change (new messages added)
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Add empty assistant message that we'll update as we stream
    // Calculate ID after user message is added
    let assistantMessageId: number;
    setMessages((prev) => {
      assistantMessageId = prev.length; // This is the index after user message
      return [...prev, { role: "assistant", content: "" }];
    });

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No response body");
      }

      let accumulatedContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") {
              setIsLoading(false);
              return;
            }

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                accumulatedContent += parsed.content;
                // Update the assistant message with accumulated content
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[assistantMessageId] = {
                    role: "assistant",
                    content: accumulatedContent,
                  };
                  return updated;
                });
              }
            } catch {
              // Ignore JSON parse errors for incomplete chunks
            }
          }
        }
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[assistantMessageId] = {
          role: "assistant",
          content:
            "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        };
        return updated;
      });
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col h-[800px] w-full mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden'>
      <div className='bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4'>
        <h2 className='text-xl font-semibold text-white'>Travel Assistant</h2>
        <p className='text-sm text-purple-100'>
          Your AI companion for safe solo travel
        </p>
      </div>

      <div
        ref={messagesContainerRef}
        className='flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50'
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === "user"
                  ? "bg-purple-50 shadow-md border border-purple-200"
                  : "bg-white text-gray-800 shadow-md border border-gray-100"
              }`}
            >
              <div
                className={`text-lg leading-relaxed whitespace-pre-wrap ${
                  message.role === "user" ? "text-black" : ""
                }`}
              >
                {message.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className='flex justify-start'>
            <div className='bg-white rounded-2xl px-4 py-3 shadow-md border border-gray-100'>
              <div className='flex space-x-2'>
                <div className='w-2 h-2 bg-purple-600 rounded-full animate-bounce'></div>
                <div
                  className='w-2 h-2 bg-purple-600 rounded-full animate-bounce'
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className='w-2 h-2 bg-purple-600 rounded-full animate-bounce'
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSend}
        className='border-t border-gray-200 p-4 bg-white'
      >
        <div className='flex gap-2'>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Ask about destinations, safety tips, or travel planning...'
            className='flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black text-lg placeholder:text-gray-400'
            disabled={isLoading}
          />
          <button
            type='submit'
            disabled={isLoading || !input.trim()}
            className='px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg'
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
