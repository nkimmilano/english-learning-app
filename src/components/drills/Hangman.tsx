import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Drill } from '../../types';

interface Props {
  drill: Drill;
  onAnswer: (correct: boolean) => void;
}

const MAX_WRONG = 6;
const ROCKET_STAGES = ['🚀', '🛸', '🌙', '⭐', '🌍', '💥', '💀'];

export default function Hangman({ drill, onAnswer }: Props) {
  const word = drill.correctAnswer.toUpperCase();
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [done, setDone] = useState(false);

  const wrongGuesses = [...guessed].filter(l => !word.includes(l));
  const wrongCount = wrongGuesses.length;
  const wonGame = word.split('').every(l => guessed.has(l));
  const lostGame = wrongCount >= MAX_WRONG;

  function guess(letter: string) {
    if (done || guessed.has(letter)) return;
    const next = new Set(guessed);
    next.add(letter);
    setGuessed(next);

    const nowWrong = [...next].filter(l => !word.includes(l)).length;
    const nowWon = word.split('').every(l => next.has(l));

    if (nowWon || nowWrong >= MAX_WRONG) {
      setDone(true);
      setTimeout(() => onAnswer(nowWon), 1200);
    }
  }

  const progress = wrongCount / MAX_WRONG;
  const rocketStage = Math.min(wrongCount, 6);

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      {/* Hint */}
      <div className="flex flex-col items-center gap-1">
        {drill.imageEmoji && <span className="text-7xl">{drill.imageEmoji}</span>}
        <p className="text-lg text-gray-500 font-medium">{drill.question}</p>
        {drill.hint && <p className="text-sm text-indigo-400">Hint: starts with <strong>{drill.hint}</strong></p>}
      </div>

      {/* Rocket lives */}
      <div className="flex items-center gap-2 bg-white rounded-2xl px-6 py-3 shadow">
        <span className="text-4xl">{ROCKET_STAGES[rocketStage]}</span>
        <div className="flex gap-1">
          {Array.from({ length: MAX_WRONG }).map((_, i) => (
            <div key={i} className={`w-4 h-4 rounded-full ${i < wrongCount ? 'bg-red-400' : 'bg-green-300'}`} />
          ))}
        </div>
        <span className="text-sm text-gray-500">{MAX_WRONG - wrongCount} left</span>
      </div>

      {/* Word blanks */}
      <div className="flex gap-3 flex-wrap justify-center">
        {word.split('').map((letter, i) => (
          <div key={i} className="flex flex-col items-center">
            <AnimatePresence>
              {guessed.has(letter) ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-3xl font-bold text-indigo-700 w-10 text-center"
                >
                  {letter}
                </motion.span>
              ) : (
                <span className="text-3xl font-bold text-transparent w-10 text-center">_</span>
              )}
            </AnimatePresence>
            <div className={`w-10 h-1 rounded-full ${lostGame && !guessed.has(letter) ? 'bg-red-400' : 'bg-indigo-300'}`} />
          </div>
        ))}
      </div>

      {/* Keyboard */}
      {!done && (
        <div className="flex flex-wrap gap-2 justify-center max-w-lg">
          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => {
            const isGuessed = guessed.has(letter);
            const isWrong = isGuessed && !word.includes(letter);
            const isCorrect = isGuessed && word.includes(letter);
            return (
              <motion.button
                key={letter}
                whileTap={{ scale: 0.85 }}
                onClick={() => guess(letter)}
                disabled={isGuessed}
                className={`w-10 h-10 rounded-xl font-bold text-lg transition-all
                  ${isWrong ? 'bg-red-200 text-red-400 cursor-not-allowed' :
                    isCorrect ? 'bg-green-200 text-green-600 cursor-not-allowed' :
                    'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 active:scale-90'}`}
              >
                {letter}
              </motion.button>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`text-2xl font-bold ${wonGame ? 'text-green-500' : 'text-red-500'}`}
          >
            {wonGame ? `🚀 You got it! "${word}"` : `💥 The word was "${word}"`}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
