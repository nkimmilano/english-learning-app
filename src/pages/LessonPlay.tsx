import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LESSONS } from '../data/lessons';
import { useGame } from '../contexts/GameContext';
import { Drill } from '../types';
import FillBlank from '../components/drills/FillBlank';
import WordImageMatch from '../components/drills/WordImageMatch';
import Hangman from '../components/drills/Hangman';
import WordScramble from '../components/drills/WordScramble';
import SentenceBuilder from '../components/drills/SentenceBuilder';
import Listening from '../components/drills/Listening';
import QuickQuiz from '../components/drills/QuickQuiz';
import ClockDrill from '../components/drills/ClockDrill';
import ReadingComprehension from '../components/drills/ReadingComprehension';
import HomophoneDrill from '../components/drills/HomophoneDrill';
import ListeningStory from '../components/drills/ListeningStory';
import Confetti from '../components/layout/Confetti';
import LevelUpModal from '../components/ui/LevelUpModal';

function DrillRenderer({
  drill,
  onAnswer,
  idx,
  total,
}: {
  drill: Drill;
  onAnswer: (correct: boolean) => void;
  idx: number;
  total: number;
}) {
  const handleQuiz = (correct: boolean, _time: number) => onAnswer(correct);

  switch (drill.type) {
    case 'fill-blank':     return <FillBlank drill={drill} onAnswer={onAnswer} />;
    case 'word-image':     return <WordImageMatch drill={drill} onAnswer={onAnswer} />;
    case 'hangman':        return <Hangman drill={drill} onAnswer={onAnswer} />;
    case 'scramble':       return <WordScramble drill={drill} onAnswer={onAnswer} />;
    case 'sentence-builder': return <SentenceBuilder drill={drill} onAnswer={onAnswer} />;
    case 'listening':      return <Listening drill={drill} onAnswer={onAnswer} />;
    case 'quiz':           return <QuickQuiz drill={drill} onAnswer={handleQuiz} questionNumber={idx + 1} total={total} />;
    case 'clock':          return <ClockDrill drill={drill} onAnswer={onAnswer} />;
    case 'reading-comprehension': return <ReadingComprehension drill={drill} onAnswer={onAnswer} />;
    case 'homophone':      return <HomophoneDrill drill={drill} onAnswer={onAnswer} />;
    case 'listening-story': return <ListeningStory drill={drill} onAnswer={onAnswer} />;
    default:               return null;
  }
}

const DRILL_TYPE_NAMES: Record<string, string> = {
  'fill-blank':    'Fill in the Blank',
  'word-image':    'Word Match',
  'hangman':       'Rocket Spelling',
  'scramble':      'Word Scramble',
  'sentence-builder': 'Build a Sentence',
  'listening':     'Listening',
  'quiz':          'Quick Quiz',
  'clock':         'Tell the Time',
  'reading-comprehension': 'Reading',
  'homophone':     'Homophones',
  'listening-story': 'Listening Story',
};

// Zone → neon color map
const ZONE_NEON: Record<string, string> = {
  a1: '#00ff88', a1plus: '#00f5ff', a2: '#b400ff', b1: '#ff6b00', b2: '#ff0080',
};

export default function LessonPlay() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lesson = LESSONS.find(l => l.id === id);
  const { completeDrill, completeLesson } = useGame();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [leveledUp, setLeveledUp] = useState(false);
  const [newLevel, setNewLevel] = useState(0);
  const [finished, setFinished] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const [key, setKey] = useState(0);

  // suppress unused callback warning
  void useCallback;

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0f' }}>
        <p className="text-2xl" style={{ color: '#6b6b9a' }}>Lesson not found</p>
      </div>
    );
  }

  const drills = lesson.drills;
  const currentDrill = drills[currentIdx];
  const neon = ZONE_NEON[lesson.zone] ?? '#00f5ff';

  function handleAnswer(isCorrect: boolean) {
    completeDrill(lesson!.id, isCorrect, currentDrill.type);
    if (isCorrect) setCorrect(c => c + 1);

    setTimeout(() => {
      if (currentIdx + 1 >= drills.length) {
        const score = Math.round(((isCorrect ? correct + 1 : correct) / drills.length) * 100);
        const result = completeLesson(lesson!.id, score);
        setXpEarned(result.xpEarned);
        setNewBadges(result.newBadges);
        setFinished(true);
        setShowConfetti(true);
      } else {
        setCurrentIdx(i => i + 1);
        setKey(k => k + 1);
      }
    }, 800);
  }

  const finalScore = Math.round((correct / drills.length) * 100);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0a0f' }}>
      {showConfetti && <Confetti count={50} />}
      {leveledUp && <LevelUpModal level={newLevel} onClose={() => setLeveledUp(false)} />}

      {/* Header */}
      <div className="px-4 pt-safe-top pt-6 pb-4"
        style={{ background: 'rgba(10,10,15,0.95)', borderBottom: `1px solid ${neon}33` }}>
        <div className="flex items-center gap-3 mb-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="rounded-xl p-2 text-xl"
            style={{ background: '#1a1a2e', color: '#e0e0ff' }}
          >
            ←
          </motion.button>
          <span className="text-2xl">{lesson.icon}</span>
          <div className="flex-1">
            <p className="font-black text-lg" style={{ color: '#e0e0ff' }}>{lesson.title}</p>
            <p className="text-sm font-orbitron" style={{ color: neon }}>{lesson.zone.toUpperCase()} · {lesson.category}</p>
          </div>
          {!finished && (
            <span className="font-mono text-sm" style={{ color: '#6b6b9a' }}>
              {currentIdx + 1}/{drills.length}
            </span>
          )}
        </div>

        {!finished && (
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,245,255,0.08)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, #00f5ff, ${neon})` }}
              animate={{ width: `${((currentIdx + 1) / drills.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 gap-4">
        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-xl flex flex-col items-center gap-4"
            >
              <div className="px-3 py-1 rounded-full text-sm font-bold font-orbitron"
                style={{ background: `${neon}18`, color: neon, border: `1px solid ${neon}44` }}>
                {DRILL_TYPE_NAMES[currentDrill.type] ?? currentDrill.type}
              </div>
              <DrillRenderer
                drill={currentDrill}
                onAnswer={handleAnswer}
                idx={currentIdx}
                total={drills.length}
              />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 250 }}
              className="rounded-3xl p-8 w-full max-w-md flex flex-col items-center gap-5 text-center"
              style={{
                background: '#12121a',
                border: `2px solid ${finalScore >= 70 ? '#00ff88' : '#ff6b00'}`,
                boxShadow: `0 0 40px ${finalScore >= 70 ? 'rgba(0,255,136,0.2)' : 'rgba(255,107,0,0.2)'}`,
              }}
            >
              <span className="text-8xl">
                {finalScore === 100 ? '🌟' : finalScore >= 70 ? '😄' : '💪'}
              </span>
              <h2 className="text-3xl font-black font-orbitron" style={{ color: finalScore >= 70 ? '#00ff88' : '#ff6b00' }}>
                {finalScore === 100 ? 'Perfect!' : finalScore >= 70 ? 'Great job!' : 'Keep trying!'}
              </h2>
              <p className="text-5xl font-black font-orbitron" style={{ color: '#00f5ff' }}>{finalScore}%</p>
              <p style={{ color: '#6b6b9a' }}>{correct} out of {drills.length} correct</p>

              <div className="rounded-2xl px-6 py-3 w-full"
                style={{ background: 'rgba(0,245,255,0.06)', border: '1px solid rgba(0,245,255,0.2)' }}>
                <p className="text-lg font-bold font-mono" style={{ color: '#00f5ff' }}>
                  +{xpEarned} XP earned! ⚡
                </p>
              </div>

              {newBadges.length > 0 && (
                <div className="rounded-2xl px-4 py-3 w-full"
                  style={{ background: 'rgba(180,0,255,0.08)', border: '1px solid rgba(180,0,255,0.3)' }}>
                  <p className="font-bold mb-2" style={{ color: '#b400ff' }}>New badges! 🏅</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {newBadges.map(b => <span key={b} className="text-2xl">🏅</span>)}
                  </div>
                </div>
              )}

              <div className="flex gap-3 w-full">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentIdx(0);
                    setCorrect(0);
                    setFinished(false);
                    setShowConfetti(false);
                    setKey(k => k + 100);
                  }}
                  className="flex-1 py-3 rounded-2xl font-bold text-lg"
                  style={{ background: '#1a1a2e', color: '#6b6b9a', border: '1px solid rgba(107,107,154,0.3)' }}
                >
                  Try again 🔄
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/map')}
                  className="flex-1 py-3 rounded-2xl font-bold text-lg cyber-btn"
                >
                  Back to Map 🗺️
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
