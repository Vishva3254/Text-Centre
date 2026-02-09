
export interface GrammarCorrection {
  original: string;
  replacement: string;
  reason: string;
}

export interface GrammarResult {
  correctedText: string;
  corrections: GrammarCorrection[];
}

export enum ToolType {
  COUNTER = 'counter',
  GRAMMAR = 'grammar',
  TTS = 'tts',
  CAPITALIZE = 'capitalize',
  CALLIGRAPHY = 'calligraphy'
}

export interface Language {
  code: string;
  name: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ja', name: 'Japanese' },
  { code: 'zh', name: 'Chinese' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'it', name: 'Italian' }
];
