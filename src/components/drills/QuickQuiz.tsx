import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Drill } from '../../types';
import { shuffleOptions } from '../../utils/shuffle';

interface Props {
  drill: Drill;
  onAnswer: (correct: boolean, timeMs: number) => void;
  questionNumber: number;
  total: number;
}

const TIME_LIMIT = 20; // 20 seconds for B1/B2 level reading time

export default function QuickQuiz({ drill, onAnswer, questionNumber, total }: Props) {
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [startTime] = useState(Date.now());

  // Shuffle once per drill — correctAnswer identified by value, never position
  const options = useMemo(
    () => shuffleOptions(drill.options ?? []),
    [drill.id] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    if (revealed) return;
    if (timeLeft <= 0) { handleTimeout(); return; }
    const t = setTimeout(() => setTimeLeft(p => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, revealed]);

  function handleTimeout() {
    setRevealed(true);
    setTimeout(() => onAnswer(false, TIME_LIMIT * 1000), 700);
  }

  function choose(opt: string) {
    if (revealed) return;
    const elapsed = Date.now() - startTime;
    setSelected(opt);
    setRevealed(true);
    setTimeout(() => onAnswer(opt === drill.correctAnswer, elapsed), 600);
  }

  const percent   = (timeLeft / TIME_LIMIT) * 100;
  const barColor  = percent > 50 ? 'bg-green-400' : percent > 25 ? 'bg-yellow-400' : 'bg-red-400';
  const urgentTimer = timeLeft <= 5;

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-lg">
        <span className="text-lg font-bold text-gray-500">{questionNumber}/{total}</span>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{urgentTimer ? '⏰' : '⏱️'}</span>
          <span className={`text-2xl font-bold ${urgentTimer ? 'text-red-500' : 'text-gray-700'}`}>
            {timeLeft}s
          </span>
        </div>
      </div>

      {/* Timer bar */}
      <div className="w-full max-w-lg h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${barColor} rounded-full`}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Question */}
      <div className="bg-white rounded-3xl p-6 shadow-lg w-full max-w-lg text-center">
        <p className="text-xl font-bold text-gray-700 leading-relaxed">{drill.question}</p>
      </div>

      {/* Shuffled options — labelled A B C D by position */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
        {options.map((opt, i) => {
          const labels = ['A', 'B', 'C', 'D'];
          let bg = 'bg-white border-2 border-orange-200 text-gray-700';
          if (revealed && opt === drill.correctAnswer)
            bg = 'bg-green-100 border-2 border-green-400 text-green-700';
          else if (revealed && opt === selected)
            bg = 'bg-red-100 border-2 border-red-400 text-red-700';

          return (
            <motion.button
              key={opt}
              whileTap={{ scale: 0.95 }}
              onClick={() => choose(opt)}
              className={`${bg} rounded-2xl p-3 text-base font-bold shadow-sm transition-all flex items-start gap-2`}
            >
              <span className="bg-orange-100 text-orange-600 w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                {labels[i]}
              </span>
              <span className="text-left leading-snug">{opt}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
