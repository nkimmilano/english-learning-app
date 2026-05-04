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

  const rocketStage = Math.min(wrongCount, 6);

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      {/* Hint */}
      <div className="flex flex-col items-center gap-1">
        {drill.imageEmoji && <span className="text-7xl">{drill.imageEmoji}</span>}
        <p className="text-lg font-medium text-center" style={{ color: '#6b6b9a' }}>{drill.question}</p>
        {drill.hint && (
          <p className="text-sm" style={{ color: '#00f5ff' }}>
            Hint: starts with <strong style={{ fontFamily: 'Orbitron, sans-serif' }}>{drill.hint.toUpperCase()}</strong>
          </p>
        )}
      </div>

      {/* Rocket lives */}
      <div className="flex items-center gap-3 rounded-2xl px-6 py-3"
        style={{ background: '#12121a', border: '1px solid rgba(0,245,255,0.18)' }}>
        <span className="text-4xl">{ROCKET_STAGES[rocketStage]}</span>
        <div className="flex gap-1.5">
          {Array.from({ length: MAX_WRONG }).map((_, i) => (
            <div key={i} className="w-4 h-4 rounded-full transition-all"
              style={{
                background: i < wrongCount ? '#ff0080' : '#00ff88',
                boxShadow: i < wrongCount ? '0 0 6px rgba(255,0,128,0.6)' : '0 0 6px rgba(0,255,136,0.6)',
              }} />
          ))}
        </div>
        <span className="text-sm font-mono" style={{ color: '#6b6b9a' }}>{MAX_WRONG - wrongCount} left</span>
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
                  className="text-3xl font-bold w-10 text-center font-orbitron"
                  style={{ color: '#00f5ff' }}
                >
                  {letter}
                </motion.span>
              ) : (
                <span className="text-3xl font-bold w-10 text-center" style={{ color: 'transparent' }}>_</span>
              )}
            </AnimatePresence>
            <div className="w-10 h-0.5 rounded-full mt-1"
              style={{
                background: lostGame && !guessed.has(letter) ? '#ff0080' : 'rgba(0,245,255,0.4)',
              }} />
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
                className="w-10 h-10 rounded-xl font-bold text-lg transition-all font-orbitron"
                style={
                  isWrong ? { background: 'rgba(255,0,128,0.15)', color: '#ff006688', border: '1px solid rgba(255,0,128,0.3)' } :
                  isCorrect ? { background: 'rgba(0,255,136,0.15)', color: '#00ff88', border: '1px solid rgba(0,255,136,0.4)' } :
                  { background: 'rgba(0,245,255,0.08)', color: '#00f5ff', border: '1px solid rgba(0,245,255,0.25)' }
                }
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
            className="text-2xl font-bold font-orbitron"
            style={{ color: wonGame ? '#00ff88' : '#ff0080' }}
          >
            {wonGame ? `🚀 "${word}" — correct!` : `💥 The word was "${word}"`}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
