
import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import { capitalizeSentences } from '../utils/capitalizeUtils';

const CapitalizePage: React.FC = () => {
  const [text, setText] = useState('');

  const handleCapitalize = () => {
    setText(capitalizeSentences(text));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <PageWrapper 
      title="Sentence Capitalization" 
      description="Automatically capitalize the first letter of every sentence in your paragraphs. Works globally with Unicode support."
    >
      <div className="mb-6 flex gap-4">
        <button
          onClick={handleCapitalize}
          className="flex-grow py-4 px-6 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
        >
          Fix Capitalization
        </button>
        <button
          onClick={copyToClipboard}
          className="py-4 px-6 bg-white border border-zinc-200 text-zinc-700 rounded-xl font-bold hover:bg-zinc-50 transition-all"
        >
          Copy All
        </button>
      </div>

      <textarea
        className="w-full h-96 p-6 bg-zinc-50 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 transition-all text-lg leading-relaxed placeholder:text-zinc-300 resize-none outline-none"
        placeholder="Paste your uncapitalized text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </PageWrapper>
  );
};

export default CapitalizePage;
