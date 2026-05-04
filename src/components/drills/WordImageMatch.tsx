import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Drill } from '../../types';
import { shuffleOptions } from '../../utils/shuffle';

interface Props {
  drill: Drill;
  onAnswer: (correct: boolean) => void;
}

const EMOJI_MAP: Record<string, string> = {
  cat: '🐱', dog: '🐶', bird: '🐦', fish: '🐠', rabbit: '🐰', horse: '🐴',
  elephant: '🐘', tiger: '🐯', lion: '🦁', monkey: '🐵', bear: '🐻', frog: '🐸',
  red: '🔴', blue: '🔵', green: '🟢', yellow: '🟡', orange: '🟠', purple: '🟣',
  circle: '⭕', triangle: '🔺', square: '🟥', rectangle: '📐',
  apple: '🍎', pizza: '🍕', bread: '🍞', milk: '🥛', egg: '🥚', banana: '🍌',
  mother: '👩', father: '👨', sister: '👧', brother: '👦',
  pencil: '✏️', book: '📚', ruler: '📏', eraser: '🧼', bag: '🎒',
  smile: '😊', wave: '👋', run: '🏃', sleep: '😴',
  eat: '🍽️', read: '📖', write: '✍️', draw: '🎨', sing: '🎤',
  tall: '📏', short: '📐', in: '📦', on: '🔝', under: '⬇️', behind: '👀',
  sunny: '☀️', rainy: '🌧️', cloudy: '☁️', snowy: '❄️',
};

export function emojiFor(word: string): string {
  return EMOJI_MAP[word.toLowerCase()] ?? '🎯';
}

export default function WordImageMatch({ drill, onAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  // Shuffle once per drill
  const options = useMemo(
    () => shuffleOptions(drill.options ?? []),
    [drill.id] // eslint-disable-line react-hooks/exhaustive-deps
  );

  function choose(opt: string) {
    if (revealed) return;
    setSelected(opt);
    setRevealed(true);
    setTimeout(() => onAnswer(opt === drill.correctAnswer), 1000);
  }

  const mainEmoji = drill.imageEmoji ?? emojiFor(drill.correctAnswer);

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Image prompt — big and central */}
      <motion.div
        animate={{ rotate: [0, -5, 5, -3, 3, 0] }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-9xl select-none"
      >
        {mainEmoji}
      </motion.div>

      <p className="text-2xl font-bold text-center" style={{ color: '#e0e0ff' }}>{drill.question}</p>

      {/* Text-only shuffled answer buttons */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
        {options.map(opt => {
          let btnStyle: React.CSSProperties = { background: '#1a1a2e', border: '1px solid rgba(180,0,255,0.3)', color: '#e0e0ff' };
          if (revealed && opt === drill.correctAnswer)
            btnStyle = { background: 'rgba(0,255,136,0.12)', border: '2px solid #00ff88', color: '#00ff88', boxShadow: '0 0 12px rgba(0,255,136,0.3)' };
          else if (revealed && opt === selected)
            btnStyle = { background: 'rgba(255,0,128,0.12)', border: '2px solid #ff0080', color: '#ff0080', boxShadow: '0 0 12px rgba(255,0,128,0.3)' };

          return (
            <motion.button
              key={opt}
              whileTap={{ scale: 0.93 }}
              onClick={() => choose(opt)}
              className="rounded-2xl p-4 text-xl font-bold transition-all duration-200 text-center"
              style={btnStyle}
            >
              {revealed && opt === drill.correctAnswer && '✓ '}
              {revealed && opt === selected && opt !== drill.correctAnswer && '✗ '}
              {opt}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold font-orbitron"
            style={{ color: selected === drill.correctAnswer ? '#00ff88' : '#ff0080' }}
          >
            {selected === drill.correctAnswer
              ? '✓ Correct!'
              : `Answer: "${drill.correctAnswer}"`}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
