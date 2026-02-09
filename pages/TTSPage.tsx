
import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import { generateSpeech } from '../services/speechService';

const TTSPage: React.FC = () => {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceName, setVoiceName] = useState('Kore');

  const handleSpeak = async () => {
    if (!text.trim()) return;
    setIsSpeaking(true);
    try {
      await generateSpeech(text, voiceName);
    } catch (err) {
      console.error(err);
      alert('Failed to generate speech. Please try again.');
    } finally {
      setIsSpeaking(false);
    }
  };

  return (
    <PageWrapper 
      title="Text to Audio" 
      description="Turn your written words into speech with natural AI voices. Powered by Gemini."
    >
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select 
          className="flex-grow md:flex-none md:w-64 p-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          value={voiceName}
          onChange={(e) => setVoiceName(e.target.value)}
        >
          <option value="Kore">Kore (Neutral)</option>
          <option value="Puck">Puck (Cheerful)</option>
          <option value="Charon">Charon (Deep)</option>
          <option value="Fenrir">Fenrir (Professional)</option>
          <option value="Zephyr">Zephyr (Soft)</option>
        </select>
        
        <div className="flex gap-2 flex-grow">
          <button
            onClick={handleSpeak}
            disabled={!text || isSpeaking}
            className="flex-grow py-3 px-6 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-md"
          >
            {isSpeaking ? (
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
            Generate Audio
          </button>
        </div>
      </div>

      <textarea
        className="w-full h-80 p-6 bg-zinc-50 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 transition-all text-lg leading-relaxed placeholder:text-zinc-300 resize-none outline-none shadow-inner"
        placeholder="Type something amazing and click 'Generate Audio' to hear it spoken by Gemini..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
          <h4 className="font-bold text-zinc-900 mb-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            Natural Speech
          </h4>
          <p className="text-sm text-zinc-500">Uses high-quality prebuilt voices from Google's latest models.</p>
        </div>
        <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
          <h4 className="font-bold text-zinc-900 mb-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            Multilingual TTS
          </h4>
          <p className="text-sm text-zinc-500">Supports all languages understood by Gemini for speech generation.</p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default TTSPage;
