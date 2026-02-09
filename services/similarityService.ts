
// @ts-ignore
import { pipeline, env } from '@xenova/transformers';

export interface SimilarityResult {
  lexicalScore: number;
  semanticScore: number;
  explanation: string;
}

/**
 * Cache for the transformer pipeline to avoid re-loading the model on every call.
 */
let extractor: any = null;

/**
 * Calculates Lexical Similarity using Jaccard Index (word-based overlap).
 * Measures the intersection of words over the union of words.
 */
const calculateJaccardIndex = (textA: string, textB: string): number => {
  const wordsA = new Set(textA.toLowerCase().match(/[\p{L}\p{N}]+/gu) || []);
  const wordsB = new Set(textB.toLowerCase().match(/[\p{L}\p{N}]+/gu) || []);
  
  if (wordsA.size === 0 && wordsB.size === 0) return 100;
  if (wordsA.size === 0 || wordsB.size === 0) return 0;

  const intersection = new Set([...wordsA].filter(x => wordsB.has(x)));
  const union = new Set([...wordsA, ...wordsB]);

  return Math.round((intersection.size / union.size) * 100);
};

/**
 * Calculates Cosine Similarity between two numeric vectors.
 */
function cosineSimilarity(vecA: Float32Array, vecB: Float32Array): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Compares two texts using Sentence Transformers for accurate semantic similarity analysis.
 */
export const checkSimilarity = async (textA: string, textB: string): Promise<SimilarityResult> => {
  const a = textA.trim();
  const b = textB.trim();

  // 1. Lexical Score (Standard Jaccard Word Overlap)
  const lexical = calculateJaccardIndex(a, b);

  // 2. Semantic Score using Sentence Transformers (all-MiniLM-L6-v2)
  let semantic = 0;
  try {
    if (!extractor) {
      // Configure transformers.js to ensure it loads from the remote CDN properly
      env.allowLocalModels = false;
      // Initialize the 'feature-extraction' pipeline with a common, lightweight sentence similarity model.
      extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    }

    // Generate embeddings for both texts. 
    const outputA = await extractor(a, { pooling: 'mean', normalize: true });
    const outputB = await extractor(b, { pooling: 'mean', normalize: true });

    // Extract the raw embedding data (Float32Array)
    const vecA = outputA.data as Float32Array;
    const vecB = outputB.data as Float32Array;

    // Calculate the cosine similarity between the two embeddings
    const sim = cosineSimilarity(vecA, vecB);
    
    // Convert to percentage (0-100)
    semantic = Math.max(0, Math.min(100, Math.round(sim * 100)));
  } catch (err) {
    console.error("Semantic similarity error:", err);
    // Fallback if model fails to load
    semantic = lexical;
  }

  let explanation = "";
  if (semantic > 90) {
    explanation = "The texts share nearly identical semantic meaning, despite any differences in wording.";
  } else if (semantic > 70) {
    explanation = "The texts convey very similar ideas and are likely discussing the same specific topic.";
  } else if (semantic > 40) {
    explanation = "The texts have some thematic connection but express different or conflicting ideas.";
  } else {
    explanation = "The texts have significantly different meanings and appear to discuss unrelated topics.";
  }

  return {
    lexicalScore: lexical,
    semanticScore: semantic,
    explanation: explanation
  };
};
