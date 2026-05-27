import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Drill, RCQuestion } from '../../types';
import { shuffleOptions } from '../../utils/shuffle';

interface Props {
  drill: Drill;
  onAnswer: (correct: boolean) => void;
}

const TOPIC_EMOJI: Record<string, string> = {
  dog: '🐕',
  'new-york': '🗽',
  science: '🔬',
  school: '🏫',
  nature: '🌿',
  story: '📖',
  adventure: '🗺️',
  city: '🌆',
  animals: '🐾',
  default: '🎧',
};

const TYPE_LABEL: Record<RCQuestion['questionType'], string> = {
  literal: '👂 Listening',
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
          style={{ background: 'rgba(0,200,255,0.12)', color: '#00c8ff', border: '1px solid rgba(0,200,255,0.35)' }}
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
          let btnStyle: React.CSSProperties = {
            background: '#1a1a2e',
            border: '1px solid rgba(0,245,255,0.18)',
            color: '#e0e0ff',
          };
          if (revealed && opt === q.correctAnswer)
            btnStyle = {
              background: 'rgba(0,255,136,0.12)',
              border: '2px solid #00ff88',
              color: '#00ff88',
              boxShadow: '0 0 14px rgba(0,255,136,0.3)',
            };
          else if (revealed && opt === selected)
            btnStyle = {
              background: 'rgba(255,0,128,0.12)',
              border: '2px solid #ff0080',
              color: '#ff0080',
              boxShadow: '0 0 14px rgba(255,0,128,0.3)',
            };

          return (
            <motion.button
              key={opt}
              whileTap={{ scale: 0.98 }}
              onClick={() => choose(opt)}
              className="rounded-2xl p-3 text-base font-semibold transition-all flex items-start gap-3 text-left"
              style={btnStyle}
            >
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold font-orbitron shrink-0 mt-0.5"
                style={{ background: 'rgba(0,200,255,0.1)', color: '#00c8ff' }}
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
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-3"
          >
            <div
              className="rounded-2xl p-4 text-base font-medium"
              style={
                correct
                  ? {
                      background: 'rgba(0,255,136,0.08)',
                      border: '1px solid rgba(0,255,136,0.3)',
                      color: '#00ff88',
                    }
                  : {
                      background: 'rgba(255,0,128,0.08)',
                      border: '1px solid rgba(255,0,128,0.3)',
                      color: '#ff8080',
                    }
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

export default function ListeningStory({ drill, onAnswer }: Props) {
  const questions = drill.rcQuestions ?? [];
  const [phase, setPhase] = useState<'intro' | 'questions' | 'done'>('intro');
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasListened, setHasListened] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [showScript, setShowScript] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const voicesLoadedRef = useRef(false);

  const topicEmoji = TOPIC_EMOJI[drill.topic ?? ''] ?? TOPIC_EMOJI.default;

  // Cancel speech on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  // Pre-load voices (some browsers load them async)
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const load = () => { voicesLoadedRef.current = true; };
      window.speechSynthesis.addEventListener('voiceschanged', load);
      if (window.speechSynthesis.getVoices().length > 0) voicesLoadedRef.current = true;
      return () => window.speechSynthesis.removeEventListener('voiceschanged', load);
    }
  }, []);

  function playStory() {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(drill.passage ?? '');
    utterance.rate = 0.82;
    utterance.pitch = 1.0;
    utterance.lang = 'en-US';

    const voices = window.speechSynthesis.getVoices();
    const enVoice =
      voices.find(v => v.lang === 'en-US' && v.localService) ??
      voices.find(v => v.lang.startsWith('en-') && v.localService) ??
      voices.find(v => v.lang.startsWith('en'));
    if (enVoice) utterance.voice = enVoice;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => {
      setIsPlaying(false);
      setHasListened(true);
    };
    utterance.onerror = () => {
      setIsPlaying(false);
      setHasListened(true);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }

  function stopStory() {
    window.speechSynthesis?.cancel();
    setIsPlaying(false);
    setHasListened(true);
  }

  function handleSubAnswer(isCorrect: boolean) {
    const newCorrect = isCorrect ? correct + 1 : correct;
    if (isCorrect) setCorrect(c => c + 1);
    if (qIndex + 1 >= questions.length) {
      setPhase('done');
      const allCorrect = newCorrect === questions.length;
      setTimeout(() => onAnswer(allCorrect), 1200);
    } else {
      setQIndex(i => i + 1);
    }
  }

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-xl">
        {/* Badge */}
        <div
          className="px-3 py-1 rounded-full text-sm font-bold font-orbitron"
          style={{ background: 'rgba(0,200,255,0.12)', color: '#00c8ff', border: '1px solid rgba(0,200,255,0.35)' }}
        >
          🎧 Listening Story
        </div>

        <span className="text-7xl">{topicEmoji}</span>

        <div
          className="flex items-center gap-2 rounded-2xl px-4 py-1"
          style={{ background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.2)' }}
        >
          <span className="font-bold text-sm uppercase tracking-wide font-orbitron" style={{ color: '#00f5ff' }}>
            {drill.readingLevel?.toUpperCase()} Level
          </span>
          <span style={{ color: '#6b6b9a' }}>·</span>
          <span className="text-sm" style={{ color: '#6b6b9a' }}>
            {questions.length} questions
          </span>
        </div>

        <h2 className="text-2xl font-black text-center font-orbitron" style={{ color: '#e0e0ff' }}>
          {drill.question}
        </h2>

        <p className="text-center text-base" style={{ color: '#6b6b9a' }}>
          Listen carefully to the story, then answer the comprehension questions.
        </p>

        {/* Big Play / Stop button */}
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={isPlaying ? stopStory : playStory}
          className="w-28 h-28 rounded-full flex flex-col items-center justify-center gap-1 font-bold transition-all"
          style={
            isPlaying
              ? {
                  background: 'rgba(255,0,128,0.15)',
                  border: '3px solid #ff0080',
                  color: '#ff0080',
                  boxShadow: '0 0 30px rgba(255,0,128,0.4)',
                }
              : {
                  background: 'rgba(0,200,255,0.12)',
                  border: '3px solid #00c8ff',
                  color: '#00c8ff',
                  boxShadow: '0 0 20px rgba(0,200,255,0.25)',
                }
          }
        >
          <span className="text-4xl">{isPlaying ? '⏹' : '▶'}</span>
          <span className="text-xs font-orbitron">{isPlaying ? 'STOP' : 'PLAY'}</span>
        </motion.button>

        {/* Audio wave animation */}
        {isPlaying && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-1 items-end h-6">
            {[1, 2, 3, 4, 5, 6, 7].map(i => (
              <motion.div
                key={i}
                className="w-1.5 rounded-full"
                style={{ background: '#00c8ff' }}
                animate={{ height: [4, 22, 4] }}
                transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.08, ease: 'easeInOut' }}
              />
            ))}
          </motion.div>
        )}

        {/* Post-listen actions */}
        {hasListened && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-3 w-full">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setPhase('questions')}
              className="py-4 rounded-2xl font-black text-xl w-full cyber-btn"
            >
              Answer Questions 📝
            </motion.button>
            <button
              onClick={() => setShowScript(s => !s)}
              className="text-sm font-medium underline"
              style={{ color: '#6b6b9a' }}
            >
              {showScript ? '▲ Hide script' : '▼ Show script'}
            </button>
            {showScript && (
              <div
                className="rounded-3xl p-5 w-full"
                style={{ background: '#12121a', border: '1px solid rgba(0,245,255,0.18)' }}
              >
                <p className="text-sm leading-relaxed" style={{ color: '#b0b0d0' }}>
                  {drill.passage}
                </p>
              </div>
            )}
          </motion.div>
        )}

        {!hasListened && !isPlaying && (
          <p className="text-sm" style={{ color: '#6b6b9a' }}>
            Press ▶ to hear the story
          </p>
        )}
      </div>
    );
  }

  // ── DONE ───────────────────────────────────────────────────────────────────
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
        <span className="text-7xl">{score === 100 ? '🌟' : score >= 75 ? '🎧' : '💪'}</span>
        <h2 className="text-2xl font-black font-orbitron" style={{ color: '#00f5ff' }}>
          Listening Complete!
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

  // ── QUESTIONS ──────────────────────────────────────────────────────────────
  const currentQ = questions[qIndex];

  return (
    <div className="flex flex-col gap-4 w-full max-w-xl">
      {/* Replay button */}
      <button
        onClick={isPlaying ? stopStory : playStory}
        className="flex items-center gap-2 self-start rounded-xl px-4 py-2 text-sm font-bold transition-all"
        style={{ background: '#12121a', border: '1px solid rgba(0,200,255,0.3)', color: '#00c8ff' }}
      >
        {isPlaying ? '⏹ Stop' : '🔄 Replay Story'}
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={qIndex}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.2 }}
        >
          <QuestionPanel q={currentQ} index={qIndex} total={questions.length} onDone={handleSubAnswer} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
