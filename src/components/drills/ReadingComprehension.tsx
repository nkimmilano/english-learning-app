import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Drill, RCQuestion } from '../../types';
import { shuffleOptions } from '../../utils/shuffle';

interface Props {
  drill: Drill;
  onAnswer: (correct: boolean) => void;
}

const TOPIC_EMOJI: Record<string, string> = {
  cars: '🏎️',
  superheroes: '🦸',
  space: '🚀',
  football: '⚽',
  science: '🔬',
  robots: '🤖',
  dinosaurs: '🦕',
  sharks: '🦈',
  volcanoes: '🌋',
  animals: '🐾',
};

const TYPE_LABEL: Record<RCQuestion['questionType'], string> = {
  literal: '📖 Reading',
  vocabulary: '📝 Vocabulary',
  inference: '🧠 Think!',
  'true-false-not-given': '✅ True / False',
};

function QuestionPanel({
  q,
  index,
  total,
  onDone,
}: {
  q: RCQuestion;
  index: number;
  total: number;
  onDone: (correct: boolean) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const shuffled = useMemo(() => shuffleOptions(q.options), []); // eslint-disable-line react-hooks/exhaustive-deps

  function choose(opt: string) {
    if (revealed) return;
    setSelected(opt);
    setRevealed(true);
  }

  const correct = selected === q.correctAnswer;

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Question header */}
      <div className="flex items-center justify-between">
        <span className="px-3 py-1 rounded-full text-sm font-bold font-orbitron"
          style={{ background: 'rgba(0,245,255,0.1)', color: '#00f5ff', border: '1px solid rgba(0,245,255,0.3)' }}>
          {TYPE_LABEL[q.questionType]}
        </span>
        <span className="font-mono text-sm" style={{ color: '#6b6b9a' }}>{index + 1} / {total}</span>
      </div>

      <p className="text-xl font-bold leading-snug" style={{ color: '#e0e0ff' }}>{q.question}</p>

      {/* Shuffled options */}
      <div className="grid grid-cols-1 gap-2">
        {shuffled.map((opt, i) => {
          const labels = ['A', 'B', 'C', 'D'];
          let btnStyle: React.CSSProperties = {
            background: '#1a1a2e',
            border: '1px solid rgba(0,245,255,0.18)',
            color: '#e0e0ff',
          };
          if (revealed && opt === q.correctAnswer)
            btnStyle = { background: 'rgba(0,255,136,0.12)', border: '2px solid #00ff88', color: '#00ff88', boxShadow: '0 0 14px rgba(0,255,136,0.3)' };
          else if (revealed && opt === selected)
            btnStyle = { background: 'rgba(255,0,128,0.12)', border: '2px solid #ff0080', color: '#ff0080', boxShadow: '0 0 14px rgba(255,0,128,0.3)' };

          return (
            <motion.button
              key={opt}
              whileTap={{ scale: 0.98 }}
              onClick={() => choose(opt)}
              className="rounded-2xl p-3 text-base font-semibold transition-all flex items-start gap-3 text-left"
              style={btnStyle}
            >
              <span className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold font-orbitron shrink-0 mt-0.5"
                style={{ background: 'rgba(0,245,255,0.1)', color: '#00f5ff' }}>
                {labels[i]}
              </span>
              <span className="leading-snug">{opt}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Explanation + continue */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-3"
          >
            <div className="rounded-2xl p-4 text-base font-medium"
              style={correct ? {
                background: 'rgba(0,255,136,0.08)',
                border: '1px solid rgba(0,255,136,0.3)',
                color: '#00ff88',
              } : {
                background: 'rgba(255,0,128,0.08)',
                border: '1px solid rgba(255,0,128,0.3)',
                color: '#ff8080',
              }}>
              <span className="font-bold">{correct ? '✓ Correct! ' : '✗ Not quite. '}</span>
              <span style={{ color: '#b0b0d0' }}>{q.explanation}</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => onDone(correct)}
              className="py-3 rounded-2xl font-bold text-lg cyber-btn"
            >
              {index + 1 < total ? 'Next Question →' : 'Finish Reading ✓'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ReadingComprehension({ drill, onAnswer }: Props) {
  const questions = drill.rcQuestions ?? [];
  const [qIndex, setQIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [showPassage, setShowPassage] = useState(true);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  const topicEmoji = TOPIC_EMOJI[drill.topic ?? ''] ?? '📚';

  function handleSubAnswer(isCorrect: boolean) {
    if (isCorrect) setCorrect(c => c + 1);
    if (qIndex + 1 >= questions.length) {
      setDone(true);
      const allCorrect = (isCorrect ? correct + 1 : correct) === questions.length;
      setTimeout(() => onAnswer(allCorrect), 1200);
    } else {
      setQIndex(i => i + 1);
    }
  }

  if (!started) {
    return (
      <div className="flex flex-col items-center gap-5 w-full max-w-xl">
        <span className="text-7xl">{topicEmoji}</span>
        <div className="flex items-center gap-2 rounded-2xl px-4 py-1"
          style={{ background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.2)' }}>
          <span className="font-bold text-sm uppercase tracking-wide font-orbitron" style={{ color: '#00f5ff' }}>
            {drill.readingLevel?.toUpperCase()} Level
          </span>
          <span style={{ color: '#6b6b9a' }}>·</span>
          <span className="text-sm" style={{ color: '#6b6b9a' }}>{drill.wordCount} words</span>
          <span style={{ color: '#6b6b9a' }}>·</span>
          <span className="text-sm" style={{ color: '#6b6b9a' }}>{questions.length} questions</span>
        </div>
        <h2 className="text-2xl font-black text-center font-orbitron" style={{ color: '#e0e0ff' }}>
          {drill.question}
        </h2>

        {/* Passage */}
        <div className="rounded-3xl p-5 w-full max-h-56 overflow-y-auto"
          style={{ background: '#12121a', border: '1px solid rgba(0,245,255,0.18)' }}>
          <p className="text-base leading-relaxed" style={{ color: '#b0b0d0' }}>{drill.passage}</p>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setStarted(true)}
          className="px-10 py-4 rounded-2xl font-black text-xl w-full cyber-btn"
        >
          Answer Questions 📝
        </motion.button>
      </div>
    );
  }

  if (done) {
    const score = Math.round((correct / questions.length) * 100);
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="flex flex-col items-center gap-4 rounded-3xl p-8 w-full max-w-md text-center"
        style={{
          background: '#12121a',
          border: `2px solid ${score >= 75 ? '#00ff88' : '#ff6b00'}`,
          boxShadow: `0 0 40px ${score >= 75 ? 'rgba(0,255,136,0.2)' : 'rgba(255,107,0,0.2)'}`,
        }}
      >
        <span className="text-7xl">{score === 100 ? '🌟' : score >= 75 ? '📚' : '💪'}</span>
        <h2 className="text-2xl font-black font-orbitron" style={{ color: '#00f5ff' }}>Reading Complete!</h2>
        <p className="text-5xl font-black font-orbitron" style={{ color: score >= 75 ? '#00ff88' : '#ff6b00' }}>
          {score}%
        </p>
        <p style={{ color: '#6b6b9a' }}>{correct}/{questions.length} correct</p>
      </motion.div>
    );
  }

  const currentQ = questions[qIndex];

  return (
    <div className="flex flex-col gap-4 w-full max-w-xl">
      {/* Collapsible passage */}
      <div className="rounded-3xl overflow-hidden"
        style={{ background: '#12121a', border: '1px solid rgba(0,245,255,0.18)' }}>
        <button
          onClick={() => setShowPassage(p => !p)}
          className="w-full flex items-center justify-between px-5 py-3 font-bold"
          style={{ color: '#00f5ff' }}
        >
          <span className="flex items-center gap-2">
            <span>{topicEmoji}</span>
            <span className="font-orbitron text-sm">Read the Passage</span>
          </span>
          <span className="text-xl">{showPassage ? '▲' : '▼'}</span>
        </button>
        <AnimatePresence initial={false}>
          {showPassage && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-4 max-h-44 overflow-y-auto"
                style={{ borderTop: '1px solid rgba(0,245,255,0.1)' }}>
                <p className="text-sm leading-relaxed mt-3" style={{ color: '#b0b0d0' }}>{drill.passage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={qIndex}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.2 }}
        >
          <QuestionPanel
            q={currentQ}
            index={qIndex}
            total={questions.length}
            onDone={handleSubAnswer}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
