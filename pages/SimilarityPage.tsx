
import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import { checkSimilarity, SimilarityResult } from '../services/similarityService';

const SimilarityPage: React.FC = () => {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SimilarityResult | null>(null);

  const handleCompare = async () => {
    if (!textA.trim() || !textB.trim()) return;
    setLoading(true);
    try {
      const data = await checkSimilarity(textA, textB);
      setResult(data);
    } catch (err) {
      console.error(err);
      alert('Failed to calculate similarity. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper 
      title="Text Similarity" 
      description="Compare two texts to see how similar they are. We analyze both vocabulary (Lexical) and meaning (Semantic)."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Text A</label>
          <textarea
            className="w-full h-64 p-5 bg-zinc-50 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 transition-all text-base leading-relaxed placeholder:text-zinc-300 resize-none outline-none shadow-inner"
            placeholder="Enter the first text..."
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Text B</label>
          <textarea
            className="w-full h-64 p-5 bg-zinc-50 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 transition-all text-base leading-relaxed placeholder:text-zinc-300 resize-none outline-none shadow-inner"
            placeholder="Enter the second text to compare..."
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={handleCompare}
        disabled={loading || !textA || !textB}
        className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:bg-zinc-200 transition-all flex items-center justify-center gap-2 mb-10 shadow-lg shadow-indigo-200"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing Meaning...
          </>
        ) : 'Compare Texts'}
      </button>

      {result && (
        <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100 flex flex-col items-center">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Lexical Similarity</span>
              <div className="text-4xl font-black text-blue-600">{result.lexicalScore}%</div>
              <p className="text-[10px] text-zinc-400 mt-2 text-center uppercase">Word-for-word overlap</p>
            </div>
            <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100 flex flex-col items-center">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Semantic Similarity</span>
              <div className="text-4xl font-black text-indigo-600">{result.semanticScore}%</div>
              <p className="text-[10px] text-zinc-400 mt-2 text-center uppercase">AI-driven meaning analysis</p>
            </div>
          </div>
          
          <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
            <h4 className="text-sm font-bold text-indigo-900 mb-2">AI Insights</h4>
            <p className="text-indigo-800 leading-relaxed">{result.explanation}</p>
          </div>
        </div>
      )}
    </PageWrapper>
  );
};

export default SimilarityPage;
