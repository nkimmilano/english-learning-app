import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Drill } from '../../types';

interface Props {
  drill: Drill;
  onAnswer: (correct: boolean) => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface Tile { id: number; letter: string }

export default function WordScramble({ drill, onAnswer }: Props) {
  const word = drill.correctAnswer.toUpperCase();
  const [pool, setPool] = useState<Tile[]>([]);
  const [picked, setPicked] = useState<Tile[]>([]);
  const [done, setDone] = useState(false);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    let tiles = word.split('').map((letter, i) => ({ id: i, letter }));
    // Ensure shuffle is different from solution
    let shuffled = shuffle(tiles);
    while (shuffled.map(t => t.letter).join('') === word) {
      shuffled = shuffle(tiles);
    }
    setPool(shuffled);
  }, [word]);

  function pick(tile: Tile) {
    if (done) return;
    setPool(p => p.filter(t => t.id !== tile.id));
    setPicked(p => [...p, tile]);
  }

  function unpick(tile: Tile) {
    if (done) return;
    setPicked(p => p.filter(t => t.id !== tile.id));
    setPool(p => [...p, tile]);
  }

  function check() {
    if (picked.length !== word.length) return;
    const attempt = picked.map(t => t.letter).join('');
    const correct = attempt === word;
    setDone(true);
    setTimeout(() => onAnswer(correct), 1000);
  }

  useEffect(() => {
    if (picked.length === word.length && !done) {
      check();
    }
  }, [picked]);

  const elapsed = Math.floor((Date.now() - startTime) / 1000);

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Clue */}
      <div className="flex flex-col items-center gap-1">
        {drill.imageEmoji && <span className="text-8xl">{drill.imageEmoji}</span>}
        <p className="text-xl text-gray-500 font-medium text-center">{drill.question}</p>
        {drill.hint && <p className="text-sm text-indigo-400">Hint: starts with <strong>{drill.hint}</strong></p>}
      </div>

      {/* Picked slots */}
      <div className="flex gap-2 min-h-[60px] flex-wrap justify-center items-center bg-indigo-50 rounded-2xl px-4 py-3 w-full max-w-md">
        {picked.length === 0 && <span className="text-gray-400 text-lg">Tap letters below...</span>}
        {picked.map(tile => (
          <motion.button
            key={tile.id}
            layout
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.85 }}
            onClick={() => unpick(tile)}
            className="w-12 h-12 bg-indigo-500 text-white rounded-xl text-xl font-bold shadow"
          >
            {tile.letter}
          </motion.button>
        ))}
      </div>

      {/* Pool */}
      <div className="flex gap-2 flex-wrap justify-center min-h-[60px]">
        {pool.map(tile => (
          <motion.button
            key={tile.id}
            layout
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.85 }}
            onClick={() => pick(tile)}
            className="w-12 h-12 bg-white border-2 border-purple-300 text-purple-700 rounded-xl text-xl font-bold shadow-sm"
          >
            {tile.letter}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`text-2xl font-bold ${picked.map(t => t.letter).join('') === word ? 'text-green-500' : 'text-red-500'}`}
          >
            {picked.map(t => t.letter).join('') === word ? `🎉 "${word}" is correct!` : `The answer was "${word}"`}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
