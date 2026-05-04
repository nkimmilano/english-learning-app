import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Drill } from '../../types';
import { shuffleOptions } from '../../utils/shuffle';

interface Props {
  drill: Drill;
  onAnswer: (correct: boolean) => void;
}

export default function Listening({ drill, onAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  // Shuffle once per drill
  const options = useMemo(
    () => shuffleOptions(drill.options ?? []),
    [drill.id] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    doSpeak();
    return () => window.speechSynthesis.cancel();
  }, []);

  function doSpeak() {
    setSpeaking(true);
    const utt = new SpeechSynthesisUtterance(drill.correctAnswer);
    utt.lang = 'en-US';
    utt.rate = 0.85;
    utt.onend = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utt);
  }

  function choose(opt: string) {
    if (revealed) return;
    setSelected(opt);
    setRevealed(true);
    setTimeout(() => onAnswer(opt === drill.correctAnswer), 900);
  }

  const correct = selected === drill.correctAnswer;

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="flex flex-col items-center gap-3">
        {drill.imageEmoji && <span className="text-7xl">{drill.imageEmoji}</span>}
        <p className="text-xl font-bold text-gray-600 text-center">{drill.question}</p>
        <motion.button
          animate={speaking ? { scale: [1, 1.15, 1] } : {}}
          transition={{ repeat: Infinity, duration: 0.6 }}
          onClick={doSpeak}
          className="bg-blue-500 text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-lg flex items-center gap-3"
        >
          <span className="text-3xl">🔊</span>
          {speaking ? 'Speaking...' : 'Listen Again'}
        </motion.button>
      </div>

      {/* Shuffled options */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
        {options.map(opt => {
          let bg = 'bg-white border-2 border-blue-200 text-blue-700';
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
