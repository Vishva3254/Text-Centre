
/**
 * Speech Service using browser-native Web Speech API.
 * This provides local text-to-speech without server overhead.
 */

export const speakText = (text: string, voiceIndex?: number) => {
  if (!('speechSynthesis' in window)) {
    alert("Sorry, your browser doesn't support text to speech!");
    return;
  }

  // Cancel any ongoing speech to avoid queuing
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Apply selected voice if available
  const voices = window.speechSynthesis.getVoices();
  if (voiceIndex !== undefined && voices[voiceIndex]) {
    utterance.voice = voices[voiceIndex];
  }

  window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

export const getAvailableVoices = (): SpeechSynthesisVoice[] => {
  if ('speechSynthesis' in window) {
    return window.speechSynthesis.getVoices();
  }
  return [];
};
