
import React from 'react';
import { Link } from 'react-router-dom';

const tools = [
  {
    title: 'Text Stats',
    description: 'Instantly count words, characters, and sentences with precision.',
    path: '/counter',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    color: 'bg-blue-50 text-blue-600'
  },
  {
    title: 'Grammar Checker',
    description: 'AI-powered proofreading to refine your writing in any language.',
    path: '/grammar',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    color: 'bg-emerald-50 text-emerald-600'
  },
  {
    title: 'Text Similarity',
    description: 'Compare two texts to find Lexical and Semantic commonalities.',
    path: '/similarity',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    color: 'bg-indigo-50 text-indigo-600'
  },
  {
    title: 'Text to Audio',
    description: 'Convert your text into high-quality natural speech with AI.',
    path: '/tts',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
      </svg>
    ),
    color: 'bg-purple-50 text-purple-600'
  },
  {
    title: 'Auto Capitalize',
    description: 'Automatically fix capitalization for every sentence in your text.',
    path: '/capitalize',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
    color: 'bg-orange-50 text-orange-600'
  },
  {
    title: 'Calligraphy Styles',
    description: 'Transform plain text into stylish calligraphy for social media.',
    path: '/calligraphy',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    color: 'bg-rose-50 text-rose-600'
  }
];

const HomePage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-zinc-50 [clip-path:ellipse(100%_50%_at_50%_0%)] -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-zinc-900 mb-6 tracking-tight">
            The Ultimate <span className="text-indigo-600">Text Centre</span>
          </h1>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Professional text utility tools at your fingertips. No accounts, no fees, just powerful tools to help you write better.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link 
              key={tool.path} 
              to={tool.path}
              className="group p-8 rounded-3xl border border-zinc-200 hover:border-indigo-600 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col items-start"
            >
              <div className={`w-12 h-12 ${tool.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {tool.icon}
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-2">{tool.title}</h3>
              <p className="text-zinc-500 leading-relaxed mb-6">{tool.description}</p>
              <div className="mt-auto flex items-center text-indigo-600 font-semibold">
                Open Tool
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Feature Highlight */}
      <section className="bg-zinc-900 py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-indigo-400 text-3xl font-bold mb-4">Multi-lingual</div>
            <p className="text-zinc-400">Supports over 10 major global languages powered by Gemini AI.</p>
          </div>
          <div>
            <div className="text-indigo-400 text-3xl font-bold mb-4">Privacy First</div>
            <p className="text-zinc-400">We don't store your text. Everything happens in your browser session.</p>
          </div>
          <div>
            <div className="text-indigo-400 text-3xl font-bold mb-4">Lightning Fast</div>
            <p className="text-zinc-400">Highly optimized algorithms for instantaneous text processing.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
