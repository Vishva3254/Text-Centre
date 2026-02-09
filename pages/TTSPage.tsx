
import React, { useState, useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';

const TTSPage: React.FC = () => {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        // Prefer a "Google" or "Premium" voice if available
        const preferred = availableVoices.find(v => v.name.includes('Google')) || availableVoices[0];
        setSelectedVoice(preferred.name);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleSpeak = () => {
    if (!text.trim()) return;

    // Stop any existing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <PageWrapper 
      title="Text to Audio" 
      description="Turn your written words into speech instantly. Use the 'Say Aloud' feature to listen to your text."
    >
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select 
          className="flex-grow md:flex-none md:w-64 p-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
        >
          {voices.map(v => (
            <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>
          ))}
        </select>
        
        <div className="flex gap-2 flex-grow">
          <button
            onClick={handleSpeak}
            disabled={!text}
            className="flex-grow py-3 px-6 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Say Aloud
          </button>

          {isSpeaking && (
            <button
              onClick={handleStop}
              className="py-3 px-6 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl font-bold hover:bg-rose-100 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Stop
            </button>
          )}
        </div>
      </div>

      <textarea
        className="w-full h-80 p-6 bg-zinc-50 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 transition-all text-lg leading-relaxed placeholder:text-zinc-300 resize-none outline-none shadow-inner"
        placeholder="Type something amazing and click 'Say Aloud' to hear it spoken..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
          <h4 className="font-bold text-zinc-900 mb-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            Instant Feedback
          </h4>
          <p className="text-sm text-zinc-500">No generation delay. The browser reads your text the moment you click speak.</p>
        </div>
        <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
          <h4 className="font-bold text-zinc-900 mb-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            System Voices
          </h4>
          <p className="text-sm text-zinc-500">Access all high-quality voices installed on your operating system automatically.</p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default TTSPage;
