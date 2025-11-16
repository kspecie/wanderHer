import Image from "next/image";
import Chat from "./components/Chat";

export default function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-white'>
      {/* Hero Section */}
      <section className='relative w-full h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden'>
        {/* Hero Image Background */}
        <div className='absolute inset-0 z-0'>
          <Image
            src='https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop'
            alt='Solo female traveler exploring a beautiful destination'
            fill
            className='object-cover'
            priority
            sizes='100vw'
          />
          <div className='absolute inset-0 bg-gradient-to-r from-purple-900/70 via-pink-900/60 to-purple-900/70'></div>
        </div>

        {/* Hero Content */}
        <div className='relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto'>
          <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight'>
            WanderHer
          </h1>
          <p className='text-xl sm:text-2xl lg:text-3xl text-white/95 mb-4 font-light'>
            Your AI Travel Companion
          </p>
          <p className='text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8'>
            Empowering solo female travelers with intelligent, safety-focused
            guidance for unforgettable adventures around the world.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce'>
          <svg
            className='w-6 h-6 text-white'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path d='M19 14l-7 7m0 0l-7-7m7 7V3'></path>
          </svg>
        </div>
      </section>

      {/* Chat Section */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-purple-50'>
        <div className='w-full mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              Start Your Journey
            </h2>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              Chat with our AI travel assistant to get recommendations, safety tips, and travel planning help. Ask
              anything about your next adventure!
            </p>
          </div>
          <Chat />
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-6xl mx-auto text-center'>
          <h3 className='text-2xl font-bold mb-4'>WanderHer</h3>
          <p className='text-gray-400 mb-6'>
            Empowering solo female travelers one adventure at a time.
          </p>
          <p className='text-sm text-gray-500'>
            Powered by Mistral AI • Built with Next.js
          </p>
        </div>
      </footer>
    </div>
  );
}
