
import React, { useState, useEffect, useRef } from 'react';
import PageWrapper from '../components/PageWrapper';
import { speakText, stopSpeaking, getAvailableVoices } from '../services/speechService';

const TTSPage: React.FC = () => {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState<number>(0);
  const statusInterval = useRef<number | null>(null);

  useEffect(() => {
    const updateVoices = () => {
      const available = getAvailableVoices();
      setVoices(available);
      
      // Try to find a good default (prefer English/Local)
      const defaultIdx = available.findIndex(v => v.default) || 0;
      setSelectedVoiceIndex(defaultIdx >= 0 ? defaultIdx : 0);
    };

    updateVoices();
    // Some browsers load voices asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    return () => {
      stopSpeaking();
      if (statusInterval.current) clearInterval(statusInterval.current);
    };
  }, []);

  const handleSpeak = () => {
    if (!text.trim()) return;
    
    setIsSpeaking(true);
    speakText(text, selectedVoiceIndex);
    
    // Poll for status because the 'end' event on Utterance can be unreliable across browsers
    if (statusInterval.current) clearInterval(statusInterval.current);
    statusInterval.current = window.setInterval(() => {
      if (!window.speechSynthesis.speaking) {
        setIsSpeaking(false);
        if (statusInterval.current) clearInterval(statusInterval.current);
      }
    }, 200);
  };

  const handleStop = () => {
    stopSpeaking();
    setIsSpeaking(false);
    if (statusInterval.current) clearInterval(statusInterval.current);
  };

  return (
    <PageWrapper 
      title="Say Aloud" 
      description="Hear your text read aloud using your system's native voices. Fast, private, and works offline."
    >
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-grow">
          <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 ml-1">Select Voice</label>
          <select 
            className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all"
            value={selectedVoiceIndex}
            onChange={(e) => setSelectedVoiceIndex(parseInt(e.target.value))}
          >
            {voices.length > 0 ? (
              voices.map((voice, index) => (
                <option key={index} value={index}>
                  {voice.name} ({voice.lang})
                </option>
              ))
            ) : (
              <option>Default System Voice</option>
            )}
          </select>
        </div>
        
        <div className="flex items-end gap-2 md:w-64">
          {!isSpeaking ? (
            <button
              onClick={handleSpeak}
              disabled={!text}
              className="w-full py-3 px-6 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-md h-[46px]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              Play
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="w-full py-3 px-6 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-all flex items-center justify-center gap-2 shadow-md h-[46px]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              </svg>
              Stop
            </button>
          )}
        </div>
      </div>

      <textarea
        className="w-full h-80 p-6 bg-zinc-50 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 transition-all text-lg leading-relaxed placeholder:text-zinc-300 resize-none outline-none shadow-inner"
        placeholder="Type or paste your text here and click 'Play' to hear it spoken..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-zinc-900 mb-1">Instant Play</h4>
            <p className="text-xs text-zinc-500">No loading or audio generation time. Works directly using your browser's resources.</p>
          </div>
        </div>
        <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-zinc-900 mb-1">Local & Private</h4>
            <p className="text-xs text-zinc-500">Your text is never sent to a server for audio conversion, keeping your content 100% private.</p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default TTSPage;
