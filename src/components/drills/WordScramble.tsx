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

  useEffect(() => {
    const tiles = word.split('').map((letter, i) => ({ id: i, letter }));
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

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Clue */}
      <div className="flex flex-col items-center gap-1">
        {drill.imageEmoji && <span className="text-8xl">{drill.imageEmoji}</span>}
        <p className="text-xl font-medium text-center" style={{ color: '#6b6b9a' }}>{drill.question}</p>
        {drill.hint && (
          <p className="text-sm" style={{ color: '#00f5ff' }}>
            Hint: starts with <strong style={{ fontFamily: 'Orbitron, sans-serif' }}>{drill.hint.toUpperCase()}</strong>
          </p>
        )}
      </div>

      {/* Picked slots */}
      <div className="flex gap-2 min-h-[60px] flex-wrap justify-center items-center rounded-2xl px-4 py-3 w-full max-w-md"
        style={{ background: 'rgba(0,245,255,0.05)', border: '2px dashed rgba(0,245,255,0.25)' }}>
        {picked.length === 0 && (
          <span className="text-lg" style={{ color: '#6b6b9a' }}>Tap letters below...</span>
        )}
        {picked.map(tile => (
          <motion.button
            key={tile.id}
            layout
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.85 }}
            onClick={() => unpick(tile)}
            className="w-12 h-12 rounded-xl text-xl font-bold font-orbitron"
            style={{
              background: 'rgba(0,245,255,0.15)',
              color: '#00f5ff',
              border: '1px solid rgba(0,245,255,0.4)',
            }}
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
            className="w-12 h-12 rounded-xl text-xl font-bold font-orbitron"
            style={{
              background: 'rgba(180,0,255,0.12)',
              color: '#b400ff',
              border: '1px solid rgba(180,0,255,0.35)',
            }}
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
            className="text-2xl font-bold font-orbitron"
            style={{ color: picked.map(t => t.letter).join('') === word ? '#00ff88' : '#ff0080' }}
          >
            {picked.map(t => t.letter).join('') === word
              ? `✓ "${word}" — correct!`
              : `Answer: "${word}"`}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
