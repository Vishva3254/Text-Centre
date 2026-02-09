
import React, { useState, useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';
import { getStats } from '../utils/textUtils';

const CounterPage: React.FC = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({ words: 0, characters: 0, sentences: 0, paragraphs: 0 });

  useEffect(() => {
    setStats(getStats(text));
  }, [text]);

  const clearText = () => setText('');

  return (
    <PageWrapper 
      title="Text Statistics" 
      description="Calculate word count, characters, sentences, and paragraphs instantly as you type."
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Words', value: stats.words, color: 'text-blue-600' },
          { label: 'Characters', value: stats.characters, color: 'text-indigo-600' },
          { label: 'Sentences', value: stats.sentences, color: 'text-violet-600' },
          { label: 'Paragraphs', value: stats.paragraphs, color: 'text-fuchsia-600' }
        ].map((item) => (
          <div key={item.label} className="bg-zinc-50 rounded-xl p-5 border border-zinc-100 flex flex-col items-center shadow-sm">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">{item.label}</span>
            <span className={`text-3xl font-black ${item.color}`}>{item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div className="relative">
        <textarea
          className="w-full h-[480px] p-8 bg-zinc-50 rounded-2xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-lg leading-relaxed placeholder:text-zinc-300 resize-none outline-none shadow-inner"
          placeholder="Paste or type your text here to analyze its structure..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="absolute bottom-6 right-6 flex items-center gap-3">
          <button 
            onClick={clearText}
            className="px-6 py-2.5 bg-white text-zinc-500 border border-zinc-200 rounded-xl hover:bg-zinc-100 hover:text-zinc-800 transition-all text-sm font-semibold shadow-sm"
          >
            Clear Text
          </button>
        </div>
      </div>
      <div className="mt-6 text-center">
         <p className="text-zinc-400 text-xs">Analysis happens in real-time. No data is sent to our servers for basic counting.</p>
      </div>
    </PageWrapper>
  );
};

export default CounterPage;
