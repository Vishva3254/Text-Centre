
export const capitalizeSentences = (text: string) => {
  /**
   * Unicode-aware capitalization.
   * Matches start of string or sentence terminators followed by whitespace, then any lowercase Unicode letter.
   */
  return text.replace(/(^|[.!?।。]\s+)(\p{Ll})/gu, (match, separator, char) => {
    return separator + char.toUpperCase();
  });
};
