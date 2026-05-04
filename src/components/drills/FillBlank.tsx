import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Drill } from '../../types';
import { shuffleOptions } from '../../utils/shuffle';

interface Props {
  drill: Drill;
  onAnswer: (correct: boolean) => void;
}

export default function FillBlank({ drill, onAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  // Shuffle once per drill — stable across re-renders, fresh when drill changes
  const options = useMemo(
    () => shuffleOptions(drill.options ?? []),
    [drill.id] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const parts = drill.question.split('___');

  function choose(opt: string) {
    if (revealed) return;
    setSelected(opt);
    setRevealed(true);
    setTimeout(() => onAnswer(opt === drill.correctAnswer), 900);
  }

  const correct = selected === drill.correctAnswer;

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Question card */}
      <div className="bg-white rounded-3xl p-6 shadow-lg w-full text-center">
        <p className="text-2xl font-bold text-gray-700 leading-relaxed">
          {parts[0]}
          <span
            className={`inline-block min-w-[130px] border-b-4 mx-2 px-2 transition-all duration-300 ${
              !revealed
                ? 'border-indigo-400 text-transparent'
                : correct
                ? 'border-green-400 text-green-600'
                : 'border-red-400 text-red-600'
            }`}
          >
            {revealed ? selected : '?'}
          </span>
          {parts[1]}
        </p>
      </div>

      {/* Shuffled options */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
        {options.map(opt => {
          let bg = 'bg-white border-2 border-indigo-200 text-indigo-700 active:scale-95';
          if (revealed && opt === drill.correctAnswer)
            bg = 'bg-green-100 border-2 border-green-400 text-green-700';
          else if (revealed && opt === selected)
            bg = 'bg-red-100 border-2 border-red-400 text-red-700';

          return (
            <motion.button
              key={opt}
              whileTap={{ scale: 0.95 }}
              onClick={() => choose(opt)}
              className={`${bg} rounded-2xl p-4 text-xl font-bold shadow-sm transition-all duration-200`}
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
            {correct ? '🎉 Correct!' : `The answer is "${drill.correctAnswer}"`}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
