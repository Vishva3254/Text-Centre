
import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import { generateSpeech } from '../services/geminiService';

const TTSPage: React.FC = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [voice, setVoice] = useState('Kore');

  const voices = ['Kore', 'Puck', 'Charon', 'Zephyr', 'Fenrir'];

  const handlePlay = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      await generateSpeech(text, voice);
    } catch (err) {
      console.error(err);
      alert('Failed to generate audio. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper 
      title="Text to Audio" 
      description="Turn your written words into crystal clear speech. Perfect for accessibility and content creation."
    >
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select 
          className="flex-grow md:flex-none md:w-48 p-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
        >
          {voices.map(v => (
            <option key={v} value={v}>{v} (Voice)</option>
          ))}
        </select>
        <button
          onClick={handlePlay}
          disabled={loading || !text}
          className="flex-grow py-3 px-6 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:bg-zinc-200 transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Generate & Play
            </>
          )}
        </button>
      </div>

      <textarea
        className="w-full h-80 p-6 bg-zinc-50 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 transition-all text-lg leading-relaxed placeholder:text-zinc-300 resize-none outline-none"
        placeholder="Type something amazing for the AI to speak..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
          <h4 className="font-bold text-zinc-900 mb-2">Natural & Clear</h4>
          <p className="text-sm text-zinc-500">Our AI uses advanced neural models for realistic human-like voices.</p>
        </div>
        <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
          <h4 className="font-bold text-zinc-900 mb-2">Instant Playback</h4>
          <p className="text-sm text-zinc-500">Generate and listen in seconds without any storage overhead.</p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default TTSPage;
