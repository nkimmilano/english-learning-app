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
      <div className="rounded-3xl p-6 w-full text-center"
        style={{ background: '#12121a', border: '1px solid rgba(0,245,255,0.18)' }}>
        <p className="text-2xl font-bold leading-relaxed" style={{ color: '#e0e0ff' }}>
          {parts[0]}
          <span
            className="inline-block min-w-[130px] mx-2 px-2 rounded-lg transition-all duration-300 font-orbitron"
            style={!revealed ? {
              background: 'rgba(0,245,255,0.08)',
              border: '2px solid rgba(0,245,255,0.4)',
              color: 'transparent',
            } : correct ? {
              background: 'rgba(0,255,136,0.12)',
              border: '2px solid #00ff88',
              color: '#00ff88',
            } : {
              background: 'rgba(255,0,128,0.12)',
              border: '2px solid #ff0080',
              color: '#ff0080',
            }}
          >
            {revealed ? selected : '?'}
          </span>
          {parts[1]}
        </p>
      </div>

      {/* Shuffled options */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
        {options.map(opt => {
          let btnStyle: React.CSSProperties = { background: '#1a1a2e', border: '1px solid rgba(0,245,255,0.2)', color: '#e0e0ff' };
          if (revealed && opt === drill.correctAnswer)
            btnStyle = { background: 'rgba(0,255,136,0.12)', border: '2px solid #00ff88', color: '#00ff88', boxShadow: '0 0 12px rgba(0,255,136,0.3)' };
          else if (revealed && opt === selected)
            btnStyle = { background: 'rgba(255,0,128,0.12)', border: '2px solid #ff0080', color: '#ff0080', boxShadow: '0 0 12px rgba(255,0,128,0.3)' };

          return (
            <motion.button
              key={opt}
              whileTap={{ scale: 0.95 }}
              onClick={() => choose(opt)}
              className="rounded-2xl p-4 text-xl font-bold transition-all duration-200"
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold font-orbitron"
            style={{ color: correct ? '#00ff88' : '#ff0080' }}
          >
            {correct ? '✓ Correct!' : `Answer: "${drill.correctAnswer}"`}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
