
import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import { SUPPORTED_LANGUAGES, GrammarResult } from '../types';
import { checkGrammar } from '../services/geminiService';

const GrammarPage: React.FC = () => {
  const [text, setText] = useState('');
  const [lang, setLang] = useState('English');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GrammarResult | null>(null);

  const handleCheck = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const data = await checkGrammar(text, lang);
      setResult(data);
    } catch (err) {
      console.error(err);
      alert('Failed to check grammar. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper 
      title="Grammar Checker" 
      description="Refine your writing with professional AI proofreading. Supports multiple languages."
    >
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select 
          className="flex-grow md:flex-none md:w-48 p-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
        >
          {SUPPORTED_LANGUAGES.map(l => (
            <option key={l.code} value={l.name}>{l.name}</option>
          ))}
        </select>
        <button
          onClick={handleCheck}
          disabled={loading || !text}
          className="flex-grow py-3 px-6 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:bg-zinc-200 transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Checking...
            </>
          ) : 'Check Grammar'}
        </button>
      </div>

      <textarea
        className="w-full h-64 p-6 bg-zinc-50 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 transition-all text-lg leading-relaxed placeholder:text-zinc-300 resize-none outline-none mb-6"
        placeholder="Enter your text to proofread..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {result && (
        <div className="mt-8 border-t border-zinc-100 pt-8 animate-in slide-in-from-bottom-4 duration-500">
          <div className="mb-8">
            <h3 className="text-lg font-bold text-zinc-900 mb-4">Corrected Text</h3>
            <div className="p-6 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-100 text-lg">
              {result.correctedText}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-zinc-900 mb-4">Specific Improvements</h3>
            <div className="space-y-3">
              {result.corrections.map((c, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-white border border-zinc-200 rounded-xl shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="line-through text-zinc-400 text-sm">{c.original}</span>
                      <svg className="w-4 h-4 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                      <span className="font-bold text-indigo-600">{c.replacement}</span>
                    </div>
                    <p className="text-sm text-zinc-500">{c.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
};

export default GrammarPage;
