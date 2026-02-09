
import React, { useState, useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';
import { getCalligraphyStyles } from '../utils/textUtils';

const CalligraphyPage: React.FC = () => {
  const [inputText, setInputText] = useState('Text Centre');
  const [styles, setStyles] = useState<{name: string, content: string, key: string}[]>([]);

  useEffect(() => {
    setStyles(getCalligraphyStyles(inputText));
  }, [inputText]);

  const copy = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <PageWrapper 
      title="Calligraphy Styles" 
      description="Convert simple text into beautiful styles. Click any box to copy the style to your clipboard."
    >
      <div className="mb-10">
        <label className="block text-sm font-bold text-zinc-500 mb-2 uppercase tracking-wide">Enter Text</label>
        <input
          type="text"
          className="w-full p-6 bg-zinc-50 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 transition-all text-2xl font-medium outline-none"
          placeholder="Enter text to stylize..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {styles.map((style) => (
          <button
            key={style.key}
            onClick={() => copy(style.content)}
            className="w-full group p-8 rounded-2xl border border-zinc-100 bg-zinc-50/50 hover:bg-white hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all text-left flex items-center justify-between"
          >
            <div>
              <span className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">{style.name}</span>
              <span className="text-3xl font-normal text-zinc-800 break-all">{style.content || 'Your Text Here'}</span>
            </div>
            <div className="shrink-0 w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      <p className="mt-8 text-center text-zinc-400 text-sm">
        Copy and paste these styles anywhere: Instagram, Twitter, WhatsApp, and more.
      </p>
    </PageWrapper>
  );
};

export default CalligraphyPage;
