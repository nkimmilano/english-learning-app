import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Drill, RCQuestion } from '../../types';
import { shuffleOptions } from '../../utils/shuffle';

interface Props {
  drill: Drill;
  onAnswer: (correct: boolean) => void;
}

const TYPE_LABEL: Record<RCQuestion['questionType'], string> = {
  literal: '👁 Watch',
  vocabulary: '📝 Vocabulary',
  inference: '🧠 Think!',
  'true-false-not-given': '✅ True / False',
};

function QuestionPanel({
  q, index, total, onDone,
}: {
  q: RCQuestion; index: number; total: number; onDone: (c: boolean) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const shuffled = useMemo(() => shuffleOptions(q.options), []); // eslint-disable-line

  function choose(opt: string) {
    if (revealed) return;
    setSelected(opt);
    setRevealed(true);
  }

  const correct = selected === q.correctAnswer;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between">
        <span
          className="px-3 py-1 rounded-full text-sm font-bold font-orbitron"
          style={{ background: 'rgba(255,100,0,0.12)', color: '#ff6400', border: '1px solid rgba(255,100,0,0.35)' }}
        >
          {TYPE_LABEL[q.questionType]}
        </span>
        <span className="font-mono text-sm" style={{ color: '#6b6b9a' }}>
          {index + 1} / {total}
        </span>
      </div>

      <p className="text-xl font-bold leading-snug" style={{ color: '#e0e0ff' }}>
        {q.question}
      </p>

      <div className="grid grid-cols-1 gap-2">
        {shuffled.map((opt, i) => {
          const labels = ['A', 'B', 'C', 'D'];
          let s: React.CSSProperties = {
            background: '#1a1a2e',
            border: '1px solid rgba(255,100,0,0.18)',
            color: '#e0e0ff',
          };
          if (revealed && opt === q.correctAnswer)
            s = { background: 'rgba(0,255,136,0.12)', border: '2px solid #00ff88', color: '#00ff88', boxShadow: '0 0 14px rgba(0,255,136,0.3)' };
          else if (revealed && opt === selected)
            s = { background: 'rgba(255,0,128,0.12)', border: '2px solid #ff0080', color: '#ff0080', boxShadow: '0 0 14px rgba(255,0,128,0.3)' };

          return (
            <motion.button
              key={opt}
              whileTap={{ scale: 0.98 }}
              onClick={() => choose(opt)}
              className="rounded-2xl p-3 text-base font-semibold transition-all flex items-start gap-3 text-left"
              style={s}
            >
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold font-orbitron shrink-0 mt-0.5"
                style={{ background: 'rgba(255,100,0,0.1)', color: '#ff6400' }}
              >
                {labels[i]}
              </span>
              <span className="leading-snug">{opt}</span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {revealed && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-3">
            <div
              className="rounded-2xl p-4 text-base font-medium"
              style={
                correct
                  ? { background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.3)', color: '#00ff88' }
                  : { background: 'rgba(255,0,128,0.08)', border: '1px solid rgba(255,0,128,0.3)', color: '#ff8080' }
              }
            >
              <span className="font-bold">{correct ? '✓ Correct! ' : '✗ Not quite. '}</span>
              <span style={{ color: '#b0b0d0' }}>{q.explanation}</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => onDone(correct)}
              className="py-3 rounded-2xl font-bold text-lg cyber-btn"
            >
              {index + 1 < total ? 'Next Question →' : 'Finish ✓'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function VideoComprehension({ drill, onAnswer }: Props) {
  const questions = drill.rcQuestions ?? [];
  const [phase, setPhase] = useState<'watch' | 'questions' | 'done'>('watch');
  const [qIndex, setQIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [hasWatched, setHasWatched] = useState(false);

  const videoId = drill.videoId ?? '';
  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;

  function handleSubAnswer(isCorrect: boolean) {
    const newCorrect = isCorrect ? correct + 1 : correct;
    if (isCorrect) setCorrect((c) => c + 1);
    if (qIndex + 1 >= questions.length) {
      setPhase('done');
      setTimeout(() => onAnswer(newCorrect === questions.length), 1200);
    } else {
      setQIndex((i) => i + 1);
    }
  }

  if (phase === 'done') {
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
        <span className="text-7xl">{score === 100 ? '🌟' : score >= 75 ? '🎬' : '💪'}</span>
        <h2 className="text-2xl font-black font-orbitron" style={{ color: '#00f5ff' }}>
          Video Complete!
        </h2>
        <p className="text-5xl font-black font-orbitron" style={{ color: score >= 75 ? '#00ff88' : '#ff6b00' }}>
          {score}%
        </p>
        <p style={{ color: '#6b6b9a' }}>
          {correct}/{questions.length} correct
        </p>
      </motion.div>
    );
  }

  if (phase === 'questions') {
    return (
      <div className="flex flex-col gap-4 w-full max-w-xl">
        {/* Compact replay strip */}
        <button
          onClick={() => setPhase('watch')}
          className="flex items-center gap-2 self-start rounded-xl px-4 py-2 text-sm font-bold transition-all"
          style={{ background: '#12121a', border: '1px solid rgba(255,100,0,0.3)', color: '#ff6400' }}
        >
          🎬 Rewatch Video
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={qIndex}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.2 }}
          >
            <QuestionPanel
              q={questions[qIndex]}
              index={qIndex}
              total={questions.length}
              onDone={handleSubAnswer}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // phase === 'watch'
  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-xl">
      {/* Header badge */}
      <div
        className="px-3 py-1 rounded-full text-sm font-bold font-orbitron"
        style={{ background: 'rgba(255,100,0,0.12)', color: '#ff6400', border: '1px solid rgba(255,100,0,0.35)' }}
      >
        🎬 Video Comprehension
      </div>

      {/* Title + meta */}
      <div className="text-center flex flex-col gap-1">
        <h2 className="text-2xl font-black font-orbitron" style={{ color: '#e0e0ff' }}>
          {drill.question}
        </h2>
        <div
          className="flex items-center justify-center gap-2 text-sm rounded-full px-4 py-1 self-center"
          style={{ background: 'rgba(255,100,0,0.08)', border: '1px solid rgba(255,100,0,0.2)' }}
        >
          <span className="font-bold font-orbitron uppercase tracking-wide" style={{ color: '#ff6400' }}>
            {drill.readingLevel?.toUpperCase()} Level
          </span>
          {drill.videoDuration && (
            <>
              <span style={{ color: '#6b6b9a' }}>·</span>
              <span style={{ color: '#6b6b9a' }}>⏱ {drill.videoDuration}</span>
            </>
          )}
          <span style={{ color: '#6b6b9a' }}>·</span>
          <span style={{ color: '#6b6b9a' }}>{questions.length} questions</span>
        </div>
      </div>

      {/* YouTube embed — 16:9, works on iOS/Android/Desktop */}
      <div
        className="w-full rounded-3xl overflow-hidden"
        style={{ aspectRatio: '16/9', border: '2px solid rgba(255,100,0,0.3)', boxShadow: '0 0 30px rgba(255,100,0,0.15)' }}
      >
        <iframe
          src={embedUrl}
          title={drill.question}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        />
      </div>

      <p className="text-sm text-center" style={{ color: '#6b6b9a' }}>
        Watch the full video, then answer the questions below.
      </p>

      {/* CTA buttons */}
      <div className="flex flex-col gap-3 w-full">
        {!hasWatched ? (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => { setHasWatched(true); setPhase('questions'); }}
            className="py-4 rounded-2xl font-black text-xl w-full"
            style={{
              background: 'rgba(255,100,0,0.12)',
              border: '2px solid #ff6400',
              color: '#ff6400',
              boxShadow: '0 0 20px rgba(255,100,0,0.2)',
            }}
          >
            I&apos;ve watched — Answer Questions 📝
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setPhase('questions')}
            className="py-4 rounded-2xl font-black text-xl w-full cyber-btn"
          >
            Answer Questions 📝
          </motion.button>
        )}
      </div>
    </div>
  );
}
