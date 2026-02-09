
import React, { useState, useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';
import { getCalligraphyStyles } from '../utils/textUtils';

const CalligraphyPage: React.FC = () => {
  const [inputText, setInputText] = useState('Text Centre');
  const [fontSearch, setFontSearch] = useState('');
  const [searchedFonts, setSearchedFonts] = useState<string[]>([]);
  const [styles, setStyles] = useState<{name: string, content: string, key: string}[]>([]);

  useEffect(() => {
    setStyles(getCalligraphyStyles(inputText));
  }, [inputText]);

  const copy = (content: string) => {
    navigator.clipboard.writeText(content);
    // Optional: simple feedback could be added here
  };

  const loadGoogleFont = (fontName: string) => {
    if (!fontName.trim()) return;
    
    // Format font name for Google Fonts API (spaces to pluses)
    const formattedName = fontName.trim().split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
    
    const apiName = formattedName.replace(/ /g, '+');
    const linkId = `google-font-${apiName}`;

    // Check if link already exists
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css?family=${apiName}`;
      document.head.appendChild(link);
    }

    if (!searchedFonts.includes(formattedName)) {
      setSearchedFonts([formattedName, ...searchedFonts]);
    }
    setFontSearch('');
  };

  const removeSearchedFont = (name: string) => {
    setSearchedFonts(searchedFonts.filter(f => f !== name));
  };

  return (
    <PageWrapper 
      title="Calligraphy & Fonts" 
      description="Convert text into social-media ready calligraphy or search and preview thousands of Google Fonts."
    >
      <div className="space-y-8">
        {/* Main Input */}
        <div>
          <label className="block text-sm font-bold text-zinc-500 mb-2 uppercase tracking-wide">Your Text</label>
          <input
            type="text"
            className="w-full p-6 bg-zinc-50 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 transition-all text-2xl font-medium outline-none shadow-inner"
            placeholder="Enter text to stylize..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

        {/* Google Fonts Search */}
        <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
          <label className="block text-sm font-bold text-indigo-600 mb-3 uppercase tracking-wide">Search Google Fonts</label>
          <div className="flex gap-3">
            <div className="relative flex-grow">
              <input
                type="text"
                className="w-full p-4 pl-12 bg-white rounded-xl border border-indigo-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="e.g. Tangerine, Lobster, Roboto..."
                value={fontSearch}
                onChange={(e) => setFontSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && loadGoogleFont(fontSearch)}
              />
              <svg className="w-5 h-5 text-indigo-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              onClick={() => loadGoogleFont(fontSearch)}
              className="px-6 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-sm whitespace-nowrap"
            >
              Find Font
            </button>
          </div>
          <p className="mt-3 text-xs text-indigo-400">Previews use official Google Fonts CSS. Search by full name.</p>
        </div>

        {/* Google Font Previews */}
        {searchedFonts.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-100 pb-2">Google Font Results</h3>
            <div className="grid grid-cols-1 gap-4">
              {searchedFonts.map((font) => (
                <div
                  key={font}
                  className="w-full group p-8 rounded-2xl border border-indigo-100 bg-white hover:border-indigo-300 hover:shadow-lg transition-all text-left flex items-center justify-between"
                >
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-black text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-tighter">Google Font</span>
                      <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{font}</span>
                    </div>
                    <span 
                      className="text-4xl font-normal text-zinc-800 break-all leading-normal"
                      style={{ fontFamily: `'${font}', serif` }}
                    >
                      {inputText || 'Preview Text'}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => copy(inputText)}
                      className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-500 hover:text-indigo-600 hover:border-indigo-200 transition-all"
                      title="Copy Plain Text"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => removeSearchedFont(font)}
                      className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-400 hover:text-rose-500 hover:border-rose-200 transition-all"
                      title="Remove"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Character-Mapped Calligraphy */}
        <div className="space-y-4 pt-4">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-100 pb-2">Copyable Social Media Styles</h3>
          <div className="grid grid-cols-1 gap-4">
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
        </div>
      </div>

      <div className="mt-12 p-6 bg-zinc-900 rounded-2xl text-white">
        <h4 className="font-bold mb-2">Pro Tip:</h4>
        <p className="text-zinc-400 text-sm leading-relaxed">
          The <span className="text-white font-semibold">Social Media Styles</span> use special mathematical characters that look like calligraphy. These can be copied and pasted into Instagram bios or Twitter posts. <span className="text-indigo-400">Google Fonts</span> are used for high-fidelity design previews on the web.
        </p>
      </div>
    </PageWrapper>
  );
};

export default CalligraphyPage;
