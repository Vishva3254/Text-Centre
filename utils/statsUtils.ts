
export const getStats = (text: string) => {
  const trimmed = text.trim();
  if (!trimmed) {
    return { words: 0, characters: 0, sentences: 0, paragraphs: 0 };
  }

  let words = 0;
  let sentences = 0;

  if (typeof Intl !== 'undefined' && (Intl as any).Segmenter) {
    try {
      const wordSegmenter = new (Intl as any).Segmenter(undefined, { granularity: 'word' });
      const wordSegments = wordSegmenter.segment(text);
      for (const segment of wordSegments) {
        if (segment.isWordLike) words++;
      }

      const sentenceSegmenter = new (Intl as any).Segmenter(undefined, { granularity: 'sentence' });
      const sentenceSegments = sentenceSegmenter.segment(text);
      for (const _ of sentenceSegments) {
        sentences++;
      }
    } catch (e) {
      words = trimmed.split(/\s+/).length;
      sentences = trimmed.split(/[.!?।॥。？！\n]+/).filter(s => s.trim().length > 0).length;
    }
  } else {
    words = (text.match(/[\p{L}\p{N}]+/gu) || []).length;
    sentences = trimmed.split(/[.!?।॥。？！\n]+/).filter(s => s.trim().length > 0).length;
  }

  const characters = text.length;
  const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;
  
  return { words, characters, sentences, paragraphs };
};
