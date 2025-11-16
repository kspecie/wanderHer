# WanderHer

https://wanderher.vercel.app/


**WanderHer** is an AI-powered travel companion application designed specifically for solo female travelers. Built with Next.js and powered by Mistral AI, it provides intelligent, safety-focused guidance for planning unforgettable adventures around the world.

## Features

- 🤖 **AI Travel Assistant**: Chat with an intelligent assistant powered by Mistral AI's public LLM
- 🛡️ **Safety-Focused**: Tailored advice prioritizing safety and cultural awareness for solo female travelers
- 🌍 **Global Expertise**: Get recommendations for destinations worldwide
- 💬 **Streaming Responses**: Real-time streaming chat interface for faster, more responsive interactions
- 🎨 **Modern UI**: Beautiful, responsive design with gradient themes

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **AI**: Mistral AI SDK (@mistralai/mistralai)


## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Mistral AI API key ([Get one here](https://console.mistral.ai/))

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd wanderher
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory:

```bash
MISTRAL_API_KEY=your_mistral_api_key_here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
wanderher/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # API route for Mistral AI chat
│   ├── components/
│   │   └── Chat.tsx              # Chat component with streaming support
│   ├── page.tsx                  # Landing page with hero section
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   └── icon.svg                  # Briefcase favicon
├── public/                       # Static assets
├── next.config.ts                # Next.js configuration
└── package.json                  # Dependencies
```

## Features in Detail

### Chat Interface

- Real-time streaming responses from Mistral AI
- Large, readable chat window with responsive design
- Message history with distinct styling for user and assistant messages
- Loading indicators during AI responses

### Landing Page

- Hero section with travel imagery
- Clean, modern design with purple-to-pink gradient theme
- Responsive layout for all screen sizes

## Environment Variables

| Variable          | Description             | Required |
| ----------------- | ----------------------- | -------- |
| `MISTRAL_API_KEY` | Your Mistral AI API key | Yes      |

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add your `MISTRAL_API_KEY` as an environment variable
4. Deploy!

For more details, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## License

This project is private and proprietary.
