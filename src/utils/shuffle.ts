/**
 * Fisher-Yates shuffle — returns a new array in random order.
 * Call this inside a useMemo keyed on drill.id so the order is stable
 * within a render but fresh every time a new drill is shown.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Shuffle the options for a multiple-choice question.
 * The correctAnswer is identified by value, never by position index.
 */
export function shuffleOptions(options: string[]): string[] {
  return shuffleArray(options);
}
