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

  // Shuffle this question's options once on mount
  const shuffled = useMemo(() => shuffleOptions(q.options), []); // eslint-disable-line react-hooks/exhaustive-deps

  function choose(opt: string) {
    if (revealed) return;
    setSelected(opt);
    setRevealed(true);
  }

  const correct = selected === q.correctAnswer;

  const typeLabel: Record<RCQuestion['questionType'], string> = {
    literal: '📖 Reading',
    vocabulary: '📝 Vocabulary',
    inference: '🧠 Think!',
    'true-false-not-given': '✅ True / False',
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Question header */}
      <div className="flex items-center justify-between">
        <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-bold">
          {typeLabel[q.questionType]}
        </span>
        <span className="text-gray-400 font-bold text-sm">
          {index + 1} / {total}
        </span>
      </div>

      <p className="text-xl font-bold text-gray-700 leading-snug">{q.question}</p>

      {/* Shuffled options */}
      <div className="grid grid-cols-1 gap-2">
        {shuffled.map((opt, i) => {
          const labels = ['A', 'B', 'C', 'D'];
          let bg = 'bg-white border-2 border-indigo-100 text-gray-700';
          if (revealed && opt === q.correctAnswer)
            bg = 'bg-green-100 border-2 border-green-400 text-green-700';
          else if (revealed && opt === selected)
            bg = 'bg-red-100 border-2 border-red-400 text-red-700';

          return (
            <motion.button
              key={opt}
              whileTap={{ scale: 0.98 }}
              onClick={() => choose(opt)}
              className={`${bg} rounded-2xl p-3 text-base font-semibold shadow-sm transition-all flex items-start gap-3 text-left`}
            >
              <span className="bg-indigo-50 text-indigo-500 w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
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
            <div
              className={`rounded-2xl p-4 text-base font-medium ${
                correct
                  ? 'bg-green-50 border border-green-200 text-green-800'
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}
            >
              <span className="font-bold">{correct ? '✅ Correct! ' : '❌ Not quite. '}</span>
              {q.explanation}
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => onDone(correct)}
              className="bg-indigo-500 text-white py-3 rounded-2xl font-bold text-lg shadow"
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
        <div className="bg-indigo-50 rounded-2xl px-4 py-1 flex items-center gap-2">
          <span className="text-indigo-500 font-bold text-sm uppercase tracking-wide">
            {drill.readingLevel?.toUpperCase()} Level
          </span>
          <span className="text-gray-400 text-sm">·</span>
          <span className="text-gray-500 text-sm">{drill.wordCount} words</span>
          <span className="text-gray-400 text-sm">·</span>
          <span className="text-gray-500 text-sm">{questions.length} questions</span>
        </div>
        <h2 className="text-2xl font-black text-gray-700 text-center">{drill.question}</h2>

        {/* Passage preview */}
        <div className="bg-white rounded-3xl p-5 shadow-lg w-full max-h-56 overflow-y-auto">
          <p className="text-base text-gray-600 leading-relaxed">{drill.passage}</p>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setStarted(true)}
          className="bg-indigo-500 text-white px-10 py-4 rounded-2xl font-black text-xl shadow-lg w-full"
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
        className="flex flex-col items-center gap-4 bg-white rounded-3xl p-8 shadow-xl w-full max-w-md text-center"
      >
        <span className="text-7xl">{score === 100 ? '🌟' : score >= 75 ? '📚' : '💪'}</span>
        <h2 className="text-2xl font-black text-indigo-600">Reading Complete!</h2>
        <p className="text-5xl font-black text-gray-700">{score}%</p>
        <p className="text-gray-400">{correct}/{questions.length} correct</p>
      </motion.div>
    );
  }

  const currentQ = questions[qIndex];

  return (
    <div className="flex flex-col gap-4 w-full max-w-xl">
      {/* Collapsible passage */}
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <button
          onClick={() => setShowPassage(p => !p)}
          className="w-full flex items-center justify-between px-5 py-3 font-bold text-indigo-600"
        >
          <span className="flex items-center gap-2">
            <span>{topicEmoji}</span>
            <span>Read the Passage</span>
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
              <div className="px-5 pb-4 max-h-48 overflow-y-auto">
                <p className="text-sm text-gray-600 leading-relaxed">{drill.passage}</p>
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
