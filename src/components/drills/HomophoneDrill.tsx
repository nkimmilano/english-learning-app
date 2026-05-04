import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Drill } from '../../types';
import { shuffleOptions } from '../../utils/shuffle';

interface Props {
  drill: Drill;
  onAnswer: (correct: boolean) => void;
}

export default function HomophoneDrill({ drill, onAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  // Use options array for the homophone choices; shuffle once per drill
  const choices = useMemo(
    () => shuffleOptions(drill.options ?? []),
    [drill.id] // eslint-disable-line react-hooks/exhaustive-deps
  );

  function choose(opt: string) {
    if (revealed) return;
    setSelected(opt);
    setRevealed(true);
    setTimeout(() => onAnswer(opt === drill.correctAnswer), 900);
  }

  const correct = selected === drill.correctAnswer;

  // Split question on ___ for the blank
  const parts = drill.question.split('___');

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Badge */}
      <div className="px-3 py-1 rounded-full text-sm font-bold font-orbitron"
        style={{ background: 'rgba(180,0,255,0.12)', color: '#b400ff', border: '1px solid rgba(180,0,255,0.35)' }}>
        🔊 Homophones
      </div>

      {/* Question card with blank */}
      <div className="rounded-3xl p-6 w-full text-center"
        style={{ background: '#12121a', border: '1px solid rgba(180,0,255,0.25)' }}>
        <p className="text-2xl font-bold leading-relaxed" style={{ color: '#e0e0ff' }}>
          {parts[0] ?? drill.question}
          {parts.length > 1 && (
            <span
              className="inline-block mx-2 px-4 rounded-lg font-orbitron transition-all duration-300"
              style={!revealed ? {
                background: 'rgba(180,0,255,0.1)',
                border: '2px solid rgba(180,0,255,0.5)',
                color: 'transparent',
                minWidth: '6rem',
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
              {revealed ? selected : '???'}
            </span>
          )}
          {parts[1]}
        </p>
      </div>

      {/* Homophone choice buttons */}
      <div className="flex gap-4 flex-wrap justify-center w-full max-w-lg">
        {choices.map(opt => {
          let btnStyle: React.CSSProperties = {
            background: 'rgba(180,0,255,0.1)',
            border: '2px solid rgba(180,0,255,0.4)',
            color: '#b400ff',
          };
          if (revealed && opt === drill.correctAnswer)
            btnStyle = { background: 'rgba(0,255,136,0.12)', border: '2px solid #00ff88', color: '#00ff88', boxShadow: '0 0 16px rgba(0,255,136,0.4)' };
          else if (revealed && opt === selected)
            btnStyle = { background: 'rgba(255,0,128,0.12)', border: '2px solid #ff0080', color: '#ff0080', boxShadow: '0 0 16px rgba(255,0,128,0.4)' };

          return (
            <motion.button
              key={opt}
              whileTap={{ scale: 0.93 }}
              onClick={() => choose(opt)}
              className="flex-1 min-w-[120px] rounded-2xl py-4 px-5 text-2xl font-black font-orbitron text-center transition-all"
              style={btnStyle}
            >
              {opt}
            </motion.button>
          );
        })}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-lg flex flex-col gap-3"
          >
            <div className="rounded-2xl p-4 text-base"
              style={correct ? {
                background: 'rgba(0,255,136,0.08)',
                border: '1px solid rgba(0,255,136,0.3)',
              } : {
                background: 'rgba(255,0,128,0.08)',
                border: '1px solid rgba(255,0,128,0.3)',
              }}>
              <p className="font-bold font-orbitron mb-1"
                style={{ color: correct ? '#00ff88' : '#ff0080' }}>
                {correct ? '✓ Correct!' : `✗ The answer is "${drill.correctAnswer}"`}
              </p>
              {drill.homophoneExplanation && (
                <p className="text-sm" style={{ color: '#b0b0d0' }}>
                  💡 {drill.homophoneExplanation}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
