import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Drill } from '../../types';
import ClockFace from '../ui/ClockFace';
import { shuffleOptions } from '../../utils/shuffle';

interface Props {
  drill: Drill;
  onAnswer: (correct: boolean) => void;
}

export default function ClockDrill({ drill, onAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const hours   = drill.hours   ?? 3;
  const minutes = drill.minutes ?? 0;

  // Shuffle once per drill
  const options = useMemo(
    () => shuffleOptions(drill.options ?? []),
    [drill.id] // eslint-disable-line react-hooks/exhaustive-deps
  );

  function choose(opt: string) {
    if (revealed) return;
    setSelected(opt);
    setRevealed(true);
    setTimeout(() => onAnswer(opt === drill.correctAnswer), 950);
  }

  const correct = selected === drill.correctAnswer;

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <p className="text-2xl font-bold text-gray-600 text-center">{drill.question}</p>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="bg-white rounded-full shadow-xl p-3"
      >
        <ClockFace hours={hours} minutes={minutes} size={200} />
      </motion.div>

      {/* Shuffled text-only buttons */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
        {options.map(opt => {
          let bg = 'bg-white border-2 border-indigo-200 text-indigo-700';
          if (revealed && opt === drill.correctAnswer)
            bg = 'bg-green-100 border-2 border-green-400 text-green-700';
          else if (revealed && opt === selected)
            bg = 'bg-red-100 border-2 border-red-400 text-red-700';

          return (
            <motion.button
              key={opt}
              whileTap={{ scale: 0.95 }}
              onClick={() => choose(opt)}
              className={`${bg} rounded-2xl p-4 text-lg font-bold shadow-sm transition-all text-center`}
            >
              {revealed && opt === drill.correctAnswer && '✅ '}
              {revealed && opt === selected && opt !== drill.correctAnswer && '❌ '}
              {opt}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-2xl font-bold ${correct ? 'text-green-500' : 'text-red-500'}`}
          >
            {correct ? '🎉 Correct!' : `It's "${drill.correctAnswer}"`}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
