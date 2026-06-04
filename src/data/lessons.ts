import { Lesson } from '../types';

export const LESSONS: Lesson[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // ZONE A2 — Explorer
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'a2-past-simple',
    zone: 'a2',
    category: 'Grammar',
    title: 'Past Simple',
    icon: '⏰',
    color: 'from-rose-500 to-red-600',
    requiredXP: 0,
    drills: [
      { id: 'd1', type: 'fill-blank', question: 'Yesterday I ___ to school by bus.', correctAnswer: 'went', options: ['went', 'go', 'goes', 'going'] },
      { id: 'd2', type: 'fill-blank', question: 'She ___ a sandwich for lunch.', correctAnswer: 'ate', options: ['ate', 'eat', 'eats', 'eating'] },
      { id: 'd3', type: 'sentence-builder', question: 'Build the sentence:', correctAnswer: 'We played football yesterday.', words: ['We', 'played', 'football', 'yesterday.'] },
      { id: 'd4', type: 'fill-blank', question: 'He ___ his homework last night.', correctAnswer: 'finished', options: ['finished', 'finish', 'finishes', 'finishing'] },
      { id: 'd5', type: 'quiz', question: 'Past tense of "see" is...', correctAnswer: 'saw', options: ['saw', 'seed', 'seen', 'sawed'] },
      { id: 'd6', type: 'fill-blank', question: 'They ___ happy when they won.', correctAnswer: 'were', options: ['were', 'are', 'was', 'be'] },
      { id: 'd7', type: 'scramble', question: 'Unscramble the past tense verb!', correctAnswer: 'PLAYED', imageEmoji: '⚽', hint: 'P' },
      { id: 'd8', type: 'sentence-builder', question: 'Build the sentence:', correctAnswer: 'I saw a big dog.', words: ['I', 'saw', 'a', 'big', 'dog.'] },
      { id: 'd9', type: 'fill-blank', question: 'She ___ a beautiful picture.', correctAnswer: 'drew', options: ['drew', 'draw', 'draws', 'drawing'] },
      { id: 'd10', type: 'quiz', question: 'Past tense of "go" is...', correctAnswer: 'went', options: ['went', 'goed', 'gone', 'going'] },
    ],
  },

  {
    id: 'a2-present-continuous',
    zone: 'a2',
    category: 'Grammar',
    title: 'Right Now!',
    icon: '▶️',
    color: 'from-emerald-500 to-teal-600',
    requiredXP: 0,
    drills: [
      { id: 'd1', type: 'fill-blank', question: 'She ___ reading a book now.', correctAnswer: 'is', options: ['is', 'are', 'am', 'was'] },
      { id: 'd2', type: 'fill-blank', question: 'They ___ playing in the garden.', correctAnswer: 'are', options: ['are', 'is', 'am', 'be'] },
      { id: 'd3', type: 'sentence-builder', question: 'Build the sentence:', correctAnswer: 'I am eating lunch now.', words: ['I', 'am', 'eating', 'lunch', 'now.'] },
      { id: 'd4', type: 'fill-blank', question: 'He is ___ (run) in the park.', correctAnswer: 'running', options: ['running', 'run', 'runs', 'ran'] },
      { id: 'd5', type: 'quiz', question: 'Which sentence uses Present Continuous?', correctAnswer: 'She is dancing.', options: ['She is dancing.', 'She dances.', 'She danced.', 'She will dance.'] },
      { id: 'd6', type: 'fill-blank', question: 'I am ___ (swim) in the pool.', correctAnswer: 'swimming', options: ['swimming', 'swim', 'swims', 'swam'] },
      { id: 'd7', type: 'scramble', question: 'Unscramble!', correctAnswer: 'SWIMMING', imageEmoji: '🏊', hint: 'S' },
      { id: 'd8', type: 'sentence-builder', question: 'Build the sentence:', correctAnswer: 'We are watching a movie.', words: ['We', 'are', 'watching', 'a', 'movie.'] },
      { id: 'd9', type: 'fill-blank', question: 'Look! The dog ___ chasing the cat.', correctAnswer: 'is', options: ['is', 'are', 'am', 'were'] },
      { id: 'd10', type: 'listening', question: 'Listen and choose.', correctAnswer: 'jumping', options: ['jumping', 'jump', 'jumped', 'jumps'], imageEmoji: '🦘' },
    ],
  },

  {
    id: 'a2-comparatives',
    zone: 'a2',
    category: 'Grammar',
    title: 'Bigger & Biggest!',
    icon: '📊',
    color: 'from-blue-500 to-sky-600',
    requiredXP: 0,
    drills: [
      { id: 'd1', type: 'fill-blank', question: 'An elephant is ___ than a cat. (big)', correctAnswer: 'bigger', options: ['bigger', 'big', 'biggest', 'more big'] },
      { id: 'd2', type: 'fill-blank', question: 'She is the ___ girl in the class. (tall)', correctAnswer: 'tallest', options: ['tallest', 'taller', 'tall', 'most tall'] },
      { id: 'd3', type: 'sentence-builder', question: 'Build the sentence:', correctAnswer: 'My dog is faster than yours.', words: ['My', 'dog', 'is', 'faster', 'than', 'yours.'] },
      { id: 'd4', type: 'fill-blank', question: 'This film is ___ than that one. (funny)', correctAnswer: 'funnier', options: ['funnier', 'funniest', 'more funny', 'funny'] },
      { id: 'd5', type: 'quiz', question: 'Superlative of "good" is...', correctAnswer: 'best', options: ['best', 'better', 'gooder', 'goodest'] },
      { id: 'd6', type: 'fill-blank', question: 'Mount Everest is the ___ mountain. (high)', correctAnswer: 'highest', options: ['highest', 'higher', 'high', 'more high'] },
      { id: 'd7', type: 'scramble', question: 'Unscramble!', correctAnswer: 'BIGGER', imageEmoji: '📏', hint: 'B' },
      { id: 'd8', type: 'sentence-builder', question: 'Build the sentence:', correctAnswer: 'This is the best pizza!', words: ['This', 'is', 'the', 'best', 'pizza!'] },
      { id: 'd9', type: 'fill-blank', question: 'He is ___ than his brother. (old)', correctAnswer: 'older', options: ['older', 'oldest', 'old', 'more old'] },
      { id: 'd10', type: 'quiz', question: 'Comparative of "bad" is...', correctAnswer: 'worse', options: ['worse', 'worst', 'badder', 'baddest'] },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ZONE B1 — Challenger
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'b1-present-perfect',
    zone: 'b1',
    category: 'Grammar',
    title: 'Have You Ever?',
    icon: '🏆',
    color: 'from-purple-600 to-indigo-700',
    requiredXP: 0,
    drills: [
      { id: 'd1', type: 'fill-blank', question: 'I ___ eaten sushi before.', correctAnswer: 'have', options: ['have', 'has', 'had', 'did'] },
      { id: 'd2', type: 'fill-blank', question: 'She ___ never been to Paris.', correctAnswer: 'has', options: ['has', 'have', 'had', 'did'] },
      { id: 'd3', type: 'sentence-builder', question: 'Build the sentence:', correctAnswer: 'Have you ever seen a whale?', words: ['Have', 'you', 'ever', 'seen', 'a', 'whale?'] },
      { id: 'd4', type: 'fill-blank', question: 'We ___ just arrived at school.', correctAnswer: 'have', options: ['have', 'has', 'are', 'did'] },
      { id: 'd5', type: 'quiz', question: 'Past participle of "go" is...', correctAnswer: 'gone', options: ['gone', 'went', 'goed', 'going'] },
      { id: 'd6', type: 'fill-blank', question: 'He ___ already done his homework.', correctAnswer: 'has', options: ['has', 'have', 'is', 'was'] },
      { id: 'd7', type: 'scramble', question: 'Unscramble!', correctAnswer: 'VISITED', imageEmoji: '✈️', hint: 'V' },
      { id: 'd8', type: 'sentence-builder', question: 'Build the sentence:', correctAnswer: 'I have never eaten snails.', words: ['I', 'have', 'never', 'eaten', 'snails.'] },
      { id: 'd9', type: 'fill-blank', question: 'They ___ lived here for five years.', correctAnswer: 'have', options: ['have', 'has', 'had', 'are'] },
      { id: 'd10', type: 'quiz', question: 'Which uses Present Perfect?', correctAnswer: 'She has read that book.', options: ['She has read that book.', 'She read that book.', 'She reads that book.', 'She is reading that book.'] },
    ],
  },

  {
    id: 'b1-future',
    zone: 'b1',
    category: 'Grammar',
    title: 'Future Plans!',
    icon: '🚀',
    color: 'from-orange-500 to-red-600',
    requiredXP: 0,
    drills: [
      { id: 'd1', type: 'fill-blank', question: 'I ___ go to the park tomorrow.', correctAnswer: 'will', options: ['will', 'am', 'do', 'have'] },
      { id: 'd2', type: 'fill-blank', question: 'She is ___ to study medicine.', correctAnswer: 'going', options: ['going', 'go', 'gone', 'went'] },
      { id: 'd3', type: 'sentence-builder', question: 'Build the sentence:', correctAnswer: 'It will be sunny tomorrow.', words: ['It', 'will', 'be', 'sunny', 'tomorrow.'] },
      { id: 'd4', type: 'fill-blank', question: 'I ___ going to visit my grandma this weekend.', correctAnswer: 'am', options: ['am', 'is', 'are', 'will'] },
      { id: 'd5', type: 'quiz', question: 'Which is a future sentence?', correctAnswer: 'He will play tennis.', options: ['He will play tennis.', 'He played tennis.', 'He plays tennis.', 'He is playing tennis.'] },
      { id: 'd6', type: 'fill-blank', question: 'Don\'t worry, I ___ help you!', correctAnswer: 'will', options: ['will', 'am', 'do', 'have'] },
      { id: 'd7', type: 'scramble', question: 'Unscramble!', correctAnswer: 'TOMORROW', imageEmoji: '📅', hint: 'T' },
      { id: 'd8', type: 'sentence-builder', question: 'Build the sentence:', correctAnswer: 'We are going to the beach.', words: ['We', 'are', 'going', 'to', 'the', 'beach.'] },
      { id: 'd9', type: 'fill-blank', question: 'Look at those clouds! It ___ rain.', correctAnswer: 'will', options: ['will', 'is', 'was', 'has'] },
      { id: 'd10', type: 'fill-blank', question: 'I ___ going to be a doctor when I grow up.', correctAnswer: 'am', options: ['am', 'is', 'are', 'will'] },
    ],
  },

  {
    id: 'b1-modal-verbs',
    zone: 'b1',
    category: 'Grammar',
    title: 'Modal Verbs',
    icon: '🎯',
    color: 'from-indigo-500 to-blue-600',
    requiredXP: 0,
    drills: [
      { id: 'd1', type: 'fill-blank', question: 'You ___ eat vegetables. They are good for you.', correctAnswer: 'should', options: ['should', 'might', 'could', 'would'] },
      { id: 'd2', type: 'fill-blank', question: 'You ___ wear a seatbelt. It\'s the law!', correctAnswer: 'must', options: ['must', 'should', 'might', 'could'] },
      { id: 'd3', type: 'quiz', question: 'Which modal verb expresses possibility?', correctAnswer: 'might', options: ['might', 'must', 'should', 'will'] },
      { id: 'd4', type: 'fill-blank', question: 'It looks cloudy. It ___ rain later.', correctAnswer: 'might', options: ['might', 'must', 'should', 'would'] },
      { id: 'd5', type: 'fill-blank', question: 'In her dream, she ___ fly like a bird.', correctAnswer: 'could', options: ['could', 'must', 'should', 'might'] },
      { id: 'd6', type: 'sentence-builder', question: 'Build the sentence:', correctAnswer: 'You should drink more water.', words: ['You', 'should', 'drink', 'more', 'water.'] },
      { id: 'd7', type: 'quiz', question: '"Must" shows...', correctAnswer: 'obligation', options: ['obligation', 'possibility', 'wish', 'habit'] },
      { id: 'd8', type: 'fill-blank', question: 'If I were rich, I ___ travel the world.', correctAnswer: 'would', options: ['would', 'will', 'should', 'must'] },
      { id: 'd9', type: 'scramble', question: 'Unscramble the modal verb!', correctAnswer: 'SHOULD', imageEmoji: '🤔', hint: 'S' },
      { id: 'd10', type: 'quiz', question: 'Which sentence uses a modal verb?', correctAnswer: 'She might come tomorrow.', options: ['She might come tomorrow.', 'She comes tomorrow.', 'She came yesterday.', 'She is coming now.'] },
    ],
  },

  {
    id: 'b1-spelling',
    zone: 'b1',
    category: 'Spelling',
    title: 'Tricky Spelling! 🔤',
    icon: '🔤',
    color: 'from-pink-500 to-rose-600',
    requiredXP: 0,
    drills: [
      { id: 'd1', type: 'hangman', question: 'Spell it: something you need before you have enough', correctAnswer: 'necessary', hint: 'n' },
      { id: 'd2', type: 'hangman', question: 'Spell it: a strong beat or pattern in music', correctAnswer: 'rhythm', hint: 'r' },
      { id: 'd3', type: 'scramble', question: 'Unscramble the tricky word!', correctAnswer: 'NECESSARY', imageEmoji: '📋', hint: 'N' },
      { id: 'd4', type: 'hangman', question: 'Spell it: the building where elected leaders meet', correctAnswer: 'parliament', hint: 'p' },
      { id: 'd5', type: 'quiz', question: 'Which is spelled correctly?', correctAnswer: 'necessary', options: ['necessary', 'neccessary', 'nessecary', 'necesary'] },
      { id: 'd6', type: 'hangman', question: 'Spell it: to describe something as much bigger than it really is', correctAnswer: 'exaggerate', hint: 'e' },
      { id: 'd7', type: 'quiz', question: 'Which is spelled correctly?', correctAnswer: 'rhythm', options: ['rhythm', 'rythm', 'rhythem', 'rithm'] },
      { id: 'd8', type: 'scramble', question: 'Unscramble!', correctAnswer: 'PARLIAMENT', imageEmoji: '🏛️', hint: 'P' },
      { id: 'd9', type: 'hangman', question: 'Spell it: badly behaved in a playful, naughty way', correctAnswer: 'mischievous', hint: 'm' },
      { id: 'd10', type: 'quiz', question: 'Which is spelled correctly?', correctAnswer: 'mischievous', options: ['mischievous', 'mischevious', 'mischievious', 'mischeivous'] },
    ],
  },

  {
    id: 'b1-conditional',
    zone: 'b1',
    category: 'Grammar',
    title: 'First Conditional',
    icon: '🌦️',
    color: 'from-cyan-500 to-blue-600',
    requiredXP: 0,
    drills: [
      { id: 'd1', type: 'fill-blank', question: 'If it ___, we will stay inside.', correctAnswer: 'rains', options: ['rains', 'rain', 'will rain', 'rained'] },
      { id: 'd2', type: 'fill-blank', question: 'If you study hard, you ___ pass the test.', correctAnswer: 'will', options: ['will', 'would', 'might', 'can'] },
      { id: 'd3', type: 'sentence-builder', question: 'Build the conditional:', correctAnswer: 'If it is sunny we will go outside.', words: ['If', 'it', 'is', 'sunny', 'we', 'will', 'go', 'outside.'] },
      { id: 'd4', type: 'quiz', question: 'Which is a correct First Conditional?', correctAnswer: 'If she runs fast, she will win.', options: ['If she runs fast, she will win.', 'If she would run, she wins.', 'If she ran fast, she wins.', 'If she runs, she won.'] },
      { id: 'd5', type: 'fill-blank', question: 'If we miss the bus, we ___ be late.', correctAnswer: 'will', options: ['will', 'would', 'might', 'should'] },
      { id: 'd6', type: 'fill-blank', question: 'What ___ you do if it snows tomorrow?', correctAnswer: 'will', options: ['will', 'would', 'do', 'are'] },
      { id: 'd7', type: 'quiz', question: 'In the First Conditional the IF clause uses...', correctAnswer: 'present simple', options: ['present simple', 'will + verb', 'past simple', 'present perfect'] },
      { id: 'd8', type: 'fill-blank', question: 'If he ___ his vegetables, he will grow strong.', correctAnswer: 'eats', options: ['eats', 'will eat', 'ate', 'eat'] },
      { id: 'd9', type: 'sentence-builder', question: 'Build the conditional:', correctAnswer: 'If you are kind people will like you.', words: ['If', 'you', 'are', 'kind', 'people', 'will', 'like', 'you.'] },
      { id: 'd10', type: 'fill-blank', question: 'If you touch that cactus, it ___ hurt!', correctAnswer: 'will', options: ['will', 'would', 'shall', 'must'] },
    ],
  },

  {
    id: 'b1-passive',
    zone: 'b1',
    category: 'Grammar',
    title: 'Passive Voice',
    icon: '🔄',
    color: 'from-violet-500 to-purple-600',
    requiredXP: 0,
    drills: [
      { id: 'd1', type: 'fill-blank', question: 'The car ___ built in Germany.', correctAnswer: 'was', options: ['was', 'is', 'were', 'be'] },
      { id: 'd2', type: 'fill-blank', question: 'English ___ spoken all over the world.', correctAnswer: 'is', options: ['is', 'are', 'was', 'be'] },
      { id: 'd3', type: 'quiz', question: 'Which sentence is in the passive voice?', correctAnswer: 'The cake was eaten by Tom.', options: ['The cake was eaten by Tom.', 'Tom ate the cake.', 'Tom is eating the cake.', 'Tom will eat the cake.'] },
      { id: 'd4', type: 'fill-blank', question: 'The windows ___ cleaned yesterday.', correctAnswer: 'were', options: ['were', 'was', 'are', 'be'] },
      { id: 'd5', type: 'sentence-builder', question: 'Build the passive sentence:', correctAnswer: 'The letter was written by Sam.', words: ['The', 'letter', 'was', 'written', 'by', 'Sam.'] },
      { id: 'd6', type: 'fill-blank', question: 'The homework ___ not done properly.', correctAnswer: 'was', options: ['was', 'is', 'were', 'been'] },
      { id: 'd7', type: 'quiz', question: 'Passive = Subject + ___ + past participle', correctAnswer: 'to be', options: ['to be', 'to have', 'to do', 'will'] },
      { id: 'd8', type: 'fill-blank', question: 'Three goals ___ scored in the match.', correctAnswer: 'were', options: ['were', 'was', 'are', 'have'] },
      { id: 'd9', type: 'scramble', question: 'Unscramble the past participle!', correctAnswer: 'WRITTEN', imageEmoji: '✍️', hint: 'W' },
      { id: 'd10', type: 'fill-blank', question: 'The new school ___ opened next year.', correctAnswer: 'will be', options: ['will be', 'was', 'is', 'were'] },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ZONE B2 — Advanced
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'b2-phrasal-verbs',
    zone: 'b2',
    category: 'Vocabulary',
    title: 'Phrasal Verbs',
    icon: '💬',
    color: 'from-teal-500 to-cyan-600',
    requiredXP: 0,
    drills: [
      { id: 'd1', type: 'fill-blank', question: 'I need to ___ up early for school tomorrow.', correctAnswer: 'get', options: ['get', 'take', 'put', 'give'] },
      { id: 'd2', type: 'quiz', question: '"Give up" means...', correctAnswer: 'stop trying', options: ['stop trying', 'hand something over', 'go faster', 'start again'] },
      { id: 'd3', type: 'fill-blank', question: 'Please ___ off your phone during the lesson.', correctAnswer: 'turn', options: ['turn', 'put', 'take', 'bring'] },
      { id: 'd4', type: 'sentence-builder', question: 'Build the sentence:', correctAnswer: 'She gave up eating chocolate.', words: ['She', 'gave', 'up', 'eating', 'chocolate.'] },
      { id: 'd5', type: 'quiz', question: '"Look up" a word means...', correctAnswer: 'find it in a dictionary', options: ['find it in a dictionary', 'shout the word loudly', 'forget the word', 'write it down'] },
      { id: 'd6', type: 'fill-blank', question: 'Could you ___ after my cat while I\'m on holiday?', correctAnswer: 'look', options: ['look', 'take', 'keep', 'carry'] },
      { id: 'd7', type: 'quiz', question: '"Run out of" means...', correctAnswer: 'have no more of something', options: ['have no more of something', 'run very fast', 'escape from something', 'do too much exercise'] },
      { id: 'd8', type: 'fill-blank', question: 'Don\'t ___ down on people who are different from you.', correctAnswer: 'look', options: ['look', 'turn', 'get', 'give'] },
      { id: 'd9', type: 'scramble', question: 'Unscramble!', correctAnswer: 'LOOKOUT', imageEmoji: '👀', hint: 'L' },
      { id: 'd10', type: 'fill-blank', question: 'I need to ___ up with the rest of the class. They\'re ahead.', correctAnswer: 'catch', options: ['catch', 'make', 'bring', 'keep'] },
    ],
  },

  {
    id: 'b2-complex-grammar',
    zone: 'b2',
    category: 'Grammar',
    title: 'Second Conditional',
    icon: '🧩',
    color: 'from-purple-600 to-pink-700',
    requiredXP: 0,
    drills: [
      { id: 'd1', type: 'fill-blank', question: 'If I ___ a superhero, I would fly everywhere.', correctAnswer: 'were', options: ['were', 'was', 'am', 'will be'] },
      { id: 'd2', type: 'fill-blank', question: 'If she had more time, she ___ learn the piano.', correctAnswer: 'would', options: ['would', 'will', 'could', 'should'] },
      { id: 'd3', type: 'quiz', question: 'The Second Conditional talks about...', correctAnswer: 'imaginary or unlikely situations', options: ['imaginary or unlikely situations', 'real future events', 'past events', 'definite plans'] },
      { id: 'd4', type: 'sentence-builder', question: 'Build the conditional:', correctAnswer: 'If I won the lottery I would buy a spaceship.', words: ['If', 'I', 'won', 'the', 'lottery', 'I', 'would', 'buy', 'a', 'spaceship.'] },
      { id: 'd5', type: 'fill-blank', question: 'What ___ you do if you found a million pounds?', correctAnswer: 'would', options: ['would', 'will', 'do', 'could'] },
      { id: 'd6', type: 'quiz', question: 'Which is a correct Second Conditional?', correctAnswer: 'If he tried harder, he would succeed.', options: ['If he tried harder, he would succeed.', 'If he tries harder, he will succeed.', 'If he tries harder, he would succeed.', 'If he tried harder, he will succeed.'] },
      { id: 'd7', type: 'fill-blank', question: 'If animals ___ talk, what would your dog say?', correctAnswer: 'could', options: ['could', 'can', 'will', 'would'] },
      { id: 'd8', type: 'fill-blank', question: 'She ___ travel the world if she had enough money.', correctAnswer: 'would', options: ['would', 'will', 'is', 'was'] },
      { id: 'd9', type: 'scramble', question: 'Unscramble the key word!', correctAnswer: 'IMAGINARY', imageEmoji: '💭', hint: 'I' },
      { id: 'd10', type: 'quiz', question: 'Second Conditional = If + ___ + would + verb', correctAnswer: 'past simple', options: ['past simple', 'present simple', 'present perfect', 'future simple'] },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // NEW: READING COMPREHENSION — A2
  // ═══════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════
  // NEW: SPELLING — A2
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'a2-spelling-silent',
    zone: 'a2',
    category: 'Spelling',
    title: 'Silent Letters 🤫',
    icon: '🤫',
    color: 'from-indigo-400 to-violet-500',
    requiredXP: 0,
    drills: [
      { id: 'd1', type: 'quiz', question: 'Which word has a silent "k"?', correctAnswer: 'knight', options: ['knight', 'kite', 'king', 'kitchen'] },
      { id: 'd2', type: 'scramble', question: 'Unscramble! (has a silent letter)', correctAnswer: 'KNIFE', imageEmoji: '🔪', hint: 'K' },
      { id: 'd3', type: 'quiz', question: 'The "b" is silent in...', correctAnswer: 'lamb', options: ['lamb', 'barn', 'brush', 'bird'] },
      { id: 'd4', type: 'hangman', question: 'Spell it: you do this with a pen (silent "w")', correctAnswer: 'write', hint: 'w' },
      { id: 'd5', type: 'quiz', question: 'Which word has a silent "w"?', correctAnswer: 'wrong', options: ['wrong', 'wind', 'went', 'word'] },
      { id: 'd6', type: 'scramble', question: 'Unscramble! (has a silent "k")', correctAnswer: 'KNOCK', imageEmoji: '👊', hint: 'K' },
      { id: 'd7', type: 'quiz', question: 'The "h" is silent in...', correctAnswer: 'honest', options: ['honest', 'happy', 'huge', 'hero'] },
      { id: 'd8', type: 'hangman', question: 'Spell it: to go down on one knee (silent "k")', correctAnswer: 'kneel', hint: 'k' },
      { id: 'd9', type: 'quiz', question: 'Which word has a silent "g"?', correctAnswer: 'gnome', options: ['gnome', 'girl', 'great', 'grow'] },
      { id: 'd10', type: 'fill-blank', question: 'The silent "k" appears in "k___ght". What letters fill the gap?', correctAnswer: 'ni', options: ['ni', 'ai', 'oo', 'ei'] },
    ],
  },

  {
    id: 'a2-spelling-common',
    zone: 'a2',
    category: 'Spelling',
    title: 'Spell It Right! ✅',
    icon: '✅',
    color: 'from-emerald-400 to-green-500',
    requiredXP: 0,
    drills: [
      { id: 'd1', type: 'quiz', question: 'Which is spelled correctly?', correctAnswer: 'friend', options: ['friend', 'freind', 'frend', 'friand'] },
      { id: 'd2', type: 'hangman', question: 'Spell it: the day after today', correctAnswer: 'tomorrow', hint: 't' },
      { id: 'd3', type: 'quiz', question: 'Which is spelled correctly?', correctAnswer: 'because', options: ['because', 'becuase', 'becose', 'beccause'] },
      { id: 'd4', type: 'scramble', question: 'Unscramble this common word!', correctAnswer: 'PEOPLE', imageEmoji: '👥', hint: 'P' },
      { id: 'd5', type: 'quiz', question: 'Which is spelled correctly?', correctAnswer: 'beautiful', options: ['beautiful', 'beautifull', 'beutiful', 'beautful'] },
      { id: 'd6', type: 'hangman', question: 'Spell it: truly / very much', correctAnswer: 'really', hint: 'r' },
      { id: 'd7', type: 'quiz', question: 'Which is spelled correctly?', correctAnswer: 'different', options: ['different', 'diferent', 'diffrent', 'diferrent'] },
      { id: 'd8', type: 'scramble', question: 'Unscramble!', correctAnswer: 'ALWAYS', imageEmoji: '♾️', hint: 'A' },
      { id: 'd9', type: 'quiz', question: 'Which is spelled correctly?', correctAnswer: 'surprise', options: ['surprise', 'suprise', 'surprize', 'surprize'] },
      { id: 'd10', type: 'hangman', question: 'Spell it: twelve months make one of these', correctAnswer: 'year', hint: 'y' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // NEW: READING COMPREHENSION — B1
  // ═══════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════
  // NEW: SPELLING — B1
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'b1-spelling-advanced',
    zone: 'b1',
    category: 'Spelling',
    title: 'Spelling Challenge 💪',
    icon: '💪',
    color: 'from-rose-500 to-red-600',
    requiredXP: 0,
    drills: [
      { id: 'd1', type: 'hangman', question: 'Spell it: more than ordinary — truly remarkable', correctAnswer: 'extraordinary', hint: 'e' },
      { id: 'd2', type: 'quiz', question: 'Which is spelled correctly?', correctAnswer: 'accommodation', options: ['accommodation', 'accomodation', 'acommodation', 'accommodaton'] },
      { id: 'd3', type: 'hangman', question: 'Spell it: the act of convincing someone', correctAnswer: 'persuasion', hint: 'p' },
      { id: 'd4', type: 'quiz', question: 'Which is spelled correctly?', correctAnswer: 'environment', options: ['environment', 'enviornment', 'enviroment', 'envioronment'] },
      { id: 'd5', type: 'scramble', question: 'Unscramble this tricky word!', correctAnswer: 'SEPARATE', imageEmoji: '✂️', hint: 'S' },
      { id: 'd6', type: 'hangman', question: 'Spell it: happening at the same time', correctAnswer: 'simultaneous', hint: 's' },
      { id: 'd7', type: 'quiz', question: 'Which is spelled correctly?', correctAnswer: 'definite', options: ['definite', 'definate', 'definitly', 'defenite'] },
      { id: 'd8', type: 'scramble', question: 'Unscramble!', correctAnswer: 'COMMITTEE', imageEmoji: '🏛️', hint: 'C' },
      { id: 'd9', type: 'hangman', question: 'Spell it: something that happened by chance with no plan', correctAnswer: 'coincidence', hint: 'c' },
      { id: 'd10', type: 'quiz', question: 'Which is spelled correctly?', correctAnswer: 'occurrence', options: ['occurrence', 'occurence', 'ocurrence', 'occurrance'] },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // READING COMPREHENSION — B1/B2
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'rc-american-history-civil-rights',
    zone: 'b1',
    category: 'Reading',
    title: 'The Civil Rights Movement 🕊️',
    icon: '🕊️',
    color: 'from-amber-500 to-orange-600',
    requiredXP: 0,
    drills: [
      {
        id: 'd1',
        type: 'reading-comprehension',
        question: 'The American Civil Rights Movement',
        passage: 'In the 1950s and 1960s, millions of Black Americans faced unfair laws and discrimination across the United States. These laws, known as segregation laws, kept Black and white Americans in separate schools, restaurants, and public places.\n\nA powerful movement grew to challenge these laws peacefully. One of its greatest leaders was Dr. Martin Luther King Jr., a minister from Atlanta, Georgia. He believed that non-violent protest was the strongest tool for change. In 1963, he led a peaceful march on Washington D.C. where he delivered his famous "I Have a Dream" speech, calling for equality and justice for all Americans.\n\nAnother key figure was Rosa Parks, who in 1955 refused to give up her bus seat to a white passenger — an act of quiet courage that sparked the Montgomery Bus Boycott, where Black citizens refused to ride city buses for over a year.\n\nThe Civil Rights Movement led to landmark laws including the Civil Rights Act of 1964, which made racial discrimination illegal. Dr. Martin Luther King Jr. is now remembered as a national hero, and his birthday is honoured as a public holiday every January.',
        topic: 'science',
        readingLevel: 'b1',
        wordCount: 172,
        correctAnswer: '',
        options: [],
        rcQuestions: [
          {
            question: 'What were segregation laws?',
            correctAnswer: 'Laws that kept Black and white Americans separated in public places',
            options: ['Laws that kept Black and white Americans separated in public places', 'Laws that protected Black Americans from discrimination', 'Laws created by Martin Luther King Jr.', 'Laws that banned peaceful protests'],
            explanation: 'The passage says segregation laws kept Black and white Americans in separate schools, restaurants, and public places.',
            questionType: 'literal',
          },
          {
            question: 'What does "boycott" most likely mean in this passage?',
            correctAnswer: 'Refusing to use or buy something as a form of protest',
            options: ['Refusing to use or buy something as a form of protest', 'A type of peaceful march through the streets', 'A legal case brought to court', 'A speech given to a large crowd'],
            explanation: 'In the Montgomery Bus Boycott, Black citizens refused to ride city buses — refusing to use a service to protest unfair treatment.',
            questionType: 'vocabulary',
          },
          {
            question: 'What did the Civil Rights Act of 1964 do?',
            correctAnswer: 'Made racial discrimination illegal',
            options: ['Made racial discrimination illegal', 'Created a new national holiday', 'Gave Martin Luther King Jr. a prize', 'Started the Montgomery Bus Boycott'],
            explanation: 'The passage clearly states the Civil Rights Act of 1964 "made racial discrimination illegal."',
            questionType: 'literal',
          },
          {
            question: 'Why do you think Dr. King believed non-violent protest was more powerful than violence?',
            correctAnswer: 'Peaceful protest wins public support and forces change without causing harm',
            options: ['Peaceful protest wins public support and forces change without causing harm', 'Violence was against the law so they had no choice', 'Non-violent protest was faster than going to court', 'King was not physically strong enough to fight'],
            explanation: 'Non-violent protest showed the moral strength of the movement, gaining national and international sympathy that violent actions would have undermined.',
            questionType: 'inference',
          },
        ],
      },
    ],
  },

  {
    id: 'rc-culture-halloween',
    zone: 'b2',
    category: 'Reading',
    title: 'Halloween: An American Tradition 🎃',
    icon: '🎃',
    color: 'from-orange-500 to-amber-600',
    requiredXP: 0,
    drills: [
      {
        id: 'd1',
        type: 'reading-comprehension',
        question: 'Halloween: An American Tradition',
        passage: "Halloween is celebrated on the 31st of October, primarily in the United States, Canada, and Ireland. Its origins date back over 2,000 years to an ancient Celtic festival called Samhain, when people believed the boundary between the living and the dead became thin, allowing spirits to roam the Earth.\n\nWhen Irish and Scottish immigrants brought their Halloween traditions to America in the 19th century, the holiday gradually transformed into the community celebration it is today. The Jack-o'-lantern — a carved pumpkin with a candle inside — became an American symbol of Halloween after immigrants switched from carving turnips (a tradition from their homeland) to the larger, more readily available American pumpkin.\n\nToday, Halloween is the second-biggest commercial holiday in the United States after Christmas. Children dress in costumes and go trick-or-treating, knocking on neighbours' doors to collect sweets. Adults celebrate with themed parties, haunted houses, and horror film marathons.\n\nSpending on Halloween in the U.S. now exceeds 10 billion dollars annually — a remarkable figure that reflects how deeply a 2,000-year-old Celtic festival has been woven into modern American identity.",
        topic: 'science',
        readingLevel: 'b2',
        wordCount: 170,
        correctAnswer: '',
        options: [],
        rcQuestions: [
          {
            question: 'What was the name of the ancient Celtic festival that Halloween originated from?',
            correctAnswer: 'Samhain',
            options: ['Samhain', 'Beltane', 'Lughnasadh', 'Imbolc'],
            explanation: "The passage says Halloween's origins come from an ancient Celtic festival called Samhain.",
            questionType: 'literal',
          },
          {
            question: 'Why did Irish immigrants start using pumpkins instead of turnips for Jack-o\'-lanterns?',
            correctAnswer: 'Pumpkins were larger and more easily available in America',
            options: ['Pumpkins were larger and more easily available in America', 'Turnips were illegal to carve in America', 'Pumpkins are brighter orange and look scarier', 'American children preferred pumpkins'],
            explanation: 'The passage says immigrants switched to pumpkins because they were "larger and more readily available" in America.',
            questionType: 'literal',
          },
          {
            question: 'What does "annually" mean in the final paragraph?',
            correctAnswer: 'Every year',
            options: ['Every year', 'Every decade', 'Every October', 'In total, over all time'],
            explanation: '"Annually" means once per year or on a yearly basis.',
            questionType: 'vocabulary',
          },
          {
            question: 'True, False, or Not Given: Halloween spending in the U.S. is higher than Christmas spending.',
            correctAnswer: 'False',
            options: ['False', 'True', 'Not Given'],
            explanation: 'The passage says Halloween is the second-biggest commercial holiday after Christmas — meaning Christmas spending is higher.',
            questionType: 'true-false-not-given',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RC — THE WORLD CUP (B1)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'rc-world-cup',
    zone: 'b1',
    category: 'Reading',
    title: 'The World Cup ⚽',
    icon: '⚽',
    color: 'from-green-500 to-emerald-600',
    requiredXP: 0,
    drills: [
      {
        id: 'd1',
        type: 'reading-comprehension',
        question: 'The World Cup: History of Football\'s Greatest Tournament',
        passage: 'The FIFA World Cup is the biggest football competition in the world. It takes place every four years and brings together 32 national teams from across the globe. The tournament began in 1930, when Uruguay hosted and won the very first World Cup. Over 3 billion people watch the final match on television, making it one of the most-watched events in human history.\n\nBrazil is the most successful nation in World Cup history, winning the trophy five times. Germany and Italy have each won it four times. The competition is held in a different country each time, and hosting the World Cup is considered a great honour. In 2026, the United States, Canada, and Mexico will jointly host the tournament — the first time three countries have shared the responsibility.\n\nThe golden trophy awarded to the winners is called the FIFA World Cup Trophy. It stands 36 centimetres tall and is made of solid gold. Winning it is the dream of every footballer on the planet.',
        topic: 'world-cup',
        readingLevel: 'b1',
        wordCount: 160,
        correctAnswer: '',
        options: [],
        rcQuestions: [
          {
            question: 'In which year was the first World Cup held?',
            correctAnswer: '1930',
            options: ['1920', '1930', '1950', '1945'],
            explanation: 'The passage states "The tournament began in 1930, when Uruguay hosted and won the very first World Cup."',
            questionType: 'literal',
          },
          {
            question: 'Which country has won the World Cup the most times?',
            correctAnswer: 'Brazil',
            options: ['Germany', 'Italy', 'Brazil', 'Argentina'],
            explanation: 'The passage clearly states "Brazil is the most successful nation in World Cup history, winning the trophy five times."',
            questionType: 'literal',
          },
          {
            question: 'What does the word "honour" mean in this context?',
            correctAnswer: 'A great privilege or distinction',
            options: ['A great privilege or distinction', 'A difficult challenge', 'A financial reward', 'A legal requirement'],
            explanation: '"Honour" here means a great privilege — hosting the World Cup is rare and brings global recognition to the host nation.',
            questionType: 'vocabulary',
          },
          {
            question: 'How many countries will host the 2026 World Cup?',
            correctAnswer: 'Three',
            options: ['One', 'Two', 'Three', 'Four'],
            explanation: 'The passage says "the United States, Canada, and Mexico will jointly host the tournament" — that is three countries.',
            questionType: 'literal',
          },
          {
            question: 'Why is the 2026 World Cup described as historic?',
            correctAnswer: 'It is the first time three countries have shared hosting duties',
            options: ['It is the largest World Cup ever held', 'It is the first time three countries have shared hosting duties', 'It will have 64 teams competing', 'It will be held in four different countries'],
            explanation: 'The passage notes it is "the first time three countries have shared the responsibility" of hosting.',
            questionType: 'inference',
          },
          {
            question: 'What material is the World Cup trophy made from?',
            correctAnswer: 'Solid gold',
            options: ['Silver', 'Bronze', 'Solid gold', 'Platinum'],
            explanation: 'The passage states the trophy "is made of solid gold."',
            questionType: 'literal',
          },
          {
            question: 'True, False, or Not Given: The World Cup trophy is hollow inside.',
            correctAnswer: 'False',
            options: ['True', 'False', 'Not Given'],
            explanation: 'The passage says the trophy is made of "solid gold," meaning it is not hollow.',
            questionType: 'true-false-not-given',
          },
          {
            question: 'What can we infer about the importance of the World Cup from the television viewing figures?',
            correctAnswer: 'It is one of the most important shared events in the world',
            options: ['Most people prefer watching it on their phone', 'It is one of the most important shared events in the world', 'Television is the only way to watch it', 'Most viewers are from South America'],
            explanation: '3 billion viewers shows that the World Cup transcends sport — it is a global cultural moment shared by nearly half the world\'s population.',
            questionType: 'inference',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RC — HISTORY OF COMPUTERS (B1)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'rc-history-computers',
    zone: 'b1',
    category: 'Reading',
    title: 'History of Computers 💻',
    icon: '💻',
    color: 'from-slate-500 to-blue-700',
    requiredXP: 0,
    drills: [
      {
        id: 'd1',
        type: 'reading-comprehension',
        question: 'History of Computers: From Room-Sized Machines to Your Pocket',
        passage: 'The history of computers stretches back much further than most people realise. In the 1830s, a British mathematician named Charles Babbage designed a machine called the Analytical Engine. Although it was never fully built, it contained many of the basic ideas behind modern computers. Ada Lovelace, who worked with Babbage, wrote instructions for his machine and is often called the world\'s first computer programmer.\n\nThe first electronic computers appeared in the 1940s. They were enormous — some filled entire rooms — and were used mainly by governments and universities. Over the following decades, computers became smaller and more powerful. In 1971, Intel introduced the first microprocessor, a tiny chip that could perform complex calculations. This breakthrough led to the personal computer revolution of the 1980s, when companies like Apple and IBM began selling computers for home use.\n\nToday, a smartphone in your pocket is millions of times more powerful than the computers that sent astronauts to the Moon in 1969. Computers now control cars, manage hospital records, and connect billions of people through the internet.',
        topic: 'computers',
        readingLevel: 'b1',
        wordCount: 162,
        correctAnswer: '',
        options: [],
        rcQuestions: [
          {
            question: 'What was the name of Babbage\'s machine?',
            correctAnswer: 'The Analytical Engine',
            options: ['The Computing Machine', 'The Analytical Engine', 'The Electronic Brain', 'The Difference Engine'],
            explanation: 'The passage clearly names it "the Analytical Engine."',
            questionType: 'literal',
          },
          {
            question: 'What does the word "enormous" mean?',
            correctAnswer: 'Very large',
            options: ['Very expensive', 'Very fast', 'Very large', 'Very old'],
            explanation: '"Enormous" means very large. The passage says some early computers "filled entire rooms."',
            questionType: 'vocabulary',
          },
          {
            question: 'When did Intel introduce the first microprocessor?',
            correctAnswer: '1971',
            options: ['1945', '1960', '1971', '1985'],
            explanation: 'The passage states "In 1971, Intel introduced the first microprocessor."',
            questionType: 'literal',
          },
          {
            question: 'Why were early computers mainly used by governments and universities?',
            correctAnswer: 'Because they were too large and expensive for personal use',
            options: ['Because they were secret', 'Because they were too large and expensive for personal use', 'Because they were only for writing', 'Because they were not reliable'],
            explanation: 'Early computers filled entire rooms — they were clearly not practical or affordable for individuals.',
            questionType: 'inference',
          },
          {
            question: 'Which companies began selling computers for home use in the 1980s?',
            correctAnswer: 'Apple and IBM',
            options: ['Microsoft and Google', 'Apple and IBM', 'Intel and Samsung', 'Sony and Dell'],
            explanation: 'The passage names "Apple and IBM" as the companies that began selling home computers.',
            questionType: 'literal',
          },
          {
            question: 'True, False, or Not Given: Charles Babbage\'s Analytical Engine was fully built during his lifetime.',
            correctAnswer: 'False',
            options: ['True', 'False', 'Not Given'],
            explanation: 'The passage says it "was never fully built."',
            questionType: 'true-false-not-given',
          },
          {
            question: 'A modern smartphone is compared to the computers used for which achievement?',
            correctAnswer: 'Sending astronauts to the Moon',
            options: ['Winning World War II', 'Sending astronauts to the Moon', 'Building the internet', 'Inventing the microchip'],
            explanation: 'The passage states "a smartphone in your pocket is millions of times more powerful than the computers that sent astronauts to the Moon in 1969."',
            questionType: 'literal',
          },
          {
            question: 'What was the significance of the microprocessor?',
            correctAnswer: 'It made computers smaller and helped start the personal computer revolution',
            options: ['It made computers faster but larger', 'It was the first computer ever made', 'It made computers smaller and helped start the personal computer revolution', 'It connected computers to the internet'],
            explanation: 'The microprocessor was a "breakthrough" that led to the personal computer revolution — it made computers small enough for home use.',
            questionType: 'inference',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RC — WHAT IS AI? (B2)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'rc-what-is-ai',
    zone: 'b2',
    category: 'Reading',
    title: 'What Is Artificial Intelligence? 🤖',
    icon: '🤖',
    color: 'from-violet-500 to-purple-700',
    requiredXP: 0,
    drills: [
      {
        id: 'd1',
        type: 'reading-comprehension',
        question: 'Artificial Intelligence: How Machines Learned to Think',
        passage: 'Artificial Intelligence, or AI, refers to computer systems that can perform tasks which normally require human intelligence. These tasks include understanding language, recognising images, making decisions, and solving complex problems. The term was first used in 1956 at a conference at Dartmouth College in the United States, where scientists began to seriously explore whether machines could think.\n\nModern AI is largely based on a technique called machine learning, where computers learn from large amounts of data rather than following fixed instructions. For example, an AI can study millions of photographs to learn how to identify a dog, just as a child learns by looking at many examples. A more advanced form, called deep learning, uses layers of artificial neurons inspired by the structure of the human brain.\n\nAI is already part of everyday life. It powers voice assistants like Siri and Alexa, recommends videos on YouTube, filters spam emails, and helps doctors detect diseases in medical scans. However, AI also raises important questions about privacy, fairness, and employment. As AI becomes more capable, society will need to decide how to use this powerful technology responsibly.',
        topic: 'ai',
        readingLevel: 'b2',
        wordCount: 165,
        correctAnswer: '',
        options: [],
        rcQuestions: [
          {
            question: 'When was the term "Artificial Intelligence" first used?',
            correctAnswer: '1956',
            options: ['1945', '1956', '1969', '1980'],
            explanation: 'The passage states the term "was first used in 1956 at a conference at Dartmouth College."',
            questionType: 'literal',
          },
          {
            question: 'What does machine learning involve?',
            correctAnswer: 'Computers learning from large amounts of data',
            options: ['Programmers writing all the rules by hand', 'Computers learning from large amounts of data', 'Machines that build other machines', 'Programming a robot to walk'],
            explanation: 'The passage defines machine learning as computers learning "from large amounts of data rather than following fixed instructions."',
            questionType: 'literal',
          },
          {
            question: 'What does the word "detect" mean as used in the passage?',
            correctAnswer: 'To discover or identify something',
            options: ['To treat or cure', 'To discover or identify something', 'To predict the future', 'To remove or destroy'],
            explanation: '"Detect diseases" means to discover or identify them — doctors use AI to find diseases in medical scans.',
            questionType: 'vocabulary',
          },
          {
            question: 'What is deep learning inspired by?',
            correctAnswer: 'The structure of the human brain',
            options: ['The structure of the human brain', 'The way children learn to read', 'The design of early computers', 'The rules of mathematics'],
            explanation: 'The passage says deep learning "uses layers of artificial neurons inspired by the structure of the human brain."',
            questionType: 'literal',
          },
          {
            question: 'Why does the author mention spam email filters as an example?',
            correctAnswer: 'To show that AI is already used in daily life',
            options: ['To warn people about internet dangers', 'To show that AI is already used in daily life', 'To explain how email works', 'To compare AI to humans'],
            explanation: 'The author lists everyday examples (voice assistants, YouTube, spam filters, medical scans) to demonstrate that AI is already woven into daily life.',
            questionType: 'inference',
          },
          {
            question: 'True, False, or Not Given: The passage argues that AI should be banned from healthcare.',
            correctAnswer: 'Not Given',
            options: ['True', 'False', 'Not Given'],
            explanation: 'The passage mentions AI helping doctors detect disease but does not argue for or against using AI in healthcare.',
            questionType: 'true-false-not-given',
          },
          {
            question: 'What concern does the passage NOT explicitly mention about AI?',
            correctAnswer: 'The cost of developing AI systems',
            options: ['Privacy', 'Fairness', 'Employment', 'The cost of developing AI systems'],
            explanation: 'The passage mentions privacy, fairness, and employment as concerns, but never mentions cost.',
            questionType: 'true-false-not-given',
          },
          {
            question: 'What is the author\'s main message in the final paragraph?',
            correctAnswer: 'AI is powerful and society must use it responsibly',
            options: ['AI is too dangerous and must be stopped', 'AI is only for scientists and doctors', 'AI is powerful and society must use it responsibly', 'AI will soon replace all human workers'],
            explanation: 'The final paragraph acknowledges AI\'s benefits but warns it raises important questions, concluding that society must "use this powerful technology responsibly."',
            questionType: 'inference',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RC — HISTORY OF PASTA (B2)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'rc-history-pasta',
    zone: 'b2',
    category: 'Reading',
    title: 'The History of Pasta 🍝',
    icon: '🍝',
    color: 'from-yellow-500 to-orange-500',
    requiredXP: 0,
    drills: [
      {
        id: 'd1',
        type: 'reading-comprehension',
        question: 'The History of Pasta: From Ancient Noodles to Global Icon',
        passage: 'Pasta is one of the most popular foods in the world, but its origins are surprisingly complicated and debated by historians. Many people believe that Marco Polo brought pasta to Italy from China in the 13th century, but this story is almost certainly a myth. There is evidence of pasta-like dishes being eaten in Italy well before Marco Polo\'s travels.\n\nThe word "pasta" simply means "dough" or "paste" in Italian, and similar noodle-based dishes have appeared independently in many cultures, including ancient China, the Arab world, and the Mediterranean region. Arab traders likely introduced dried pasta to Sicily during the 11th century, which helped spread it across the Italian peninsula, as dried pasta could be stored for long periods — essential for trade and travel.\n\nOver the centuries, Italian regions developed hundreds of distinct pasta shapes, each designed for a specific type of sauce. The ridges on penne help thick sauces cling to the surface. Long, thin spaghetti pairs well with lighter oil-based sauces. Today, Italy produces over 3 million tonnes of pasta every year, and it is eaten in virtually every country on Earth.',
        topic: 'pasta',
        readingLevel: 'b2',
        wordCount: 166,
        correctAnswer: '',
        options: [],
        rcQuestions: [
          {
            question: 'What does the word "pasta" mean in Italian?',
            correctAnswer: 'Dough or paste',
            options: ['Noodle', 'Flour', 'Dough or paste', 'Sauce'],
            explanation: 'The passage states: the word pasta simply means dough or paste in Italian.',
            questionType: 'literal',
          },
          {
            question: 'Why does the author call the Marco Polo story a "myth"?',
            correctAnswer: 'Because evidence shows pasta existed in Italy before Marco Polo\'s travels',
            options: ['Because Marco Polo never went to China', 'Because evidence shows pasta existed in Italy before Marco Polo\'s travels', 'Because pasta was invented in France', 'Because Marco Polo only brought rice to Italy'],
            explanation: 'The passage says the Marco Polo story "is almost certainly a myth" because "there is evidence of pasta-like dishes being eaten in Italy well before Marco Polo\'s travels."',
            questionType: 'literal',
          },
          {
            question: 'What does "debated" mean in the first paragraph?',
            correctAnswer: 'Argued about or disputed',
            options: ['Fully agreed upon', 'Argued about or disputed', 'Completely unknown', 'Recently discovered'],
            explanation: '"Debated by historians" means historians argue or disagree about the origins of pasta.',
            questionType: 'vocabulary',
          },
          {
            question: 'Why was dried pasta important for Arab traders?',
            correctAnswer: 'Because it could be stored for a long time',
            options: ['Because it was very cheap', 'Because it tasted better when dried', 'Because it could be stored for a long time', 'Because it was easier to cook'],
            explanation: 'The passage says dried pasta "could be stored for long periods — essential for trade and travel."',
            questionType: 'literal',
          },
          {
            question: 'Why does penne have ridges on its surface?',
            correctAnswer: 'To help thick sauces stick to it',
            options: ['To make it look more attractive', 'To help thick sauces stick to it', 'To help it cook faster', 'To make it easier to eat with a fork'],
            explanation: 'The passage states "the ridges on penne help thick sauces cling to the surface."',
            questionType: 'literal',
          },
          {
            question: 'What can we infer about the relationship between pasta shape and sauce?',
            correctAnswer: 'Different shapes are deliberately designed to work with specific sauces',
            options: ['Any shape can be used with any sauce', 'Shape only affects cooking time', 'Different shapes are deliberately designed to work with specific sauces', 'Italians choose shapes randomly'],
            explanation: 'The passage says each shape is "designed for a specific type of sauce" and gives two examples — this shows design intent, not coincidence.',
            questionType: 'inference',
          },
          {
            question: 'True, False, or Not Given: Italy is the only country in the world that produces pasta commercially.',
            correctAnswer: 'Not Given',
            options: ['True', 'False', 'Not Given'],
            explanation: 'The passage only states how much pasta Italy produces. It does not say whether other countries also produce pasta commercially.',
            questionType: 'true-false-not-given',
          },
          {
            question: 'What is the main idea of the final paragraph?',
            correctAnswer: 'Italian regions created many pasta shapes to match different sauces, and pasta is now eaten worldwide',
            options: ['Pasta is only popular in Italy and Europe', 'Italian regions created many pasta shapes to match different sauces, and pasta is now eaten worldwide', 'Pasta production has declined in recent years', 'Spaghetti is the most popular pasta shape globally'],
            explanation: 'The final paragraph covers the variety of pasta shapes designed for specific sauces, and ends by noting pasta is now eaten in "virtually every country on Earth."',
            questionType: 'inference',
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SPELLING — TOP 30 MOST COMMON ENGLISH WORDS
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'spelling-top-words-1',
    zone: 'b1',
    category: 'Spelling',
    title: 'Common Words: Set 1 📝',
    icon: '📝',
    color: 'from-teal-500 to-cyan-600',
    requiredXP: 0,
    drills: [
      { id: 'd1', type: 'hangman', question: 'Spell it: the reason why something happens (very common word)', correctAnswer: 'because', hint: 'b' },
      { id: 'd2', type: 'quiz', question: 'Which is spelled correctly?', correctAnswer: 'friend', options: ['friend', 'freind', 'frend', 'friand'] },
      { id: 'd3', type: 'hangman', question: 'Spell it: more than one person together (a common noun)', correctAnswer: 'people', hint: 'p' },
      { id: 'd4', type: 'quiz', question: 'Which is spelled correctly?', correctAnswer: 'said', options: ['said', 'sayd', 'sed', 'saied'] },
      { id: 'd5', type: 'scramble', question: 'Unscramble this common word!', correctAnswer: 'AGAIN', imageEmoji: '🔁', hint: 'A' },
      { id: 'd6', type: 'quiz', question: 'Which is spelled correctly?', correctAnswer: 'really', options: ['really', 'realy', 'reelly', 'relly'] },
      { id: 'd7', type: 'hangman', question: 'Spell it: each one without exception', correctAnswer: 'every', hint: 'e' },
      { id: 'd8', type: 'quiz', question: 'Which is spelled correctly?', correctAnswer: 'which', options: ['which', 'wich', 'whitch', 'wicth'] },
      { id: 'd9', type: 'scramble', question: 'Unscramble!', correctAnswer: 'COULD', imageEmoji: '🤔', hint: 'C' },
      { id: 'd10', type: 'quiz', question: 'Which is spelled correctly?', correctAnswer: 'should', options: ['should', 'shold', 'shuld', 'shoud'] },
    ],
  },

  {
    id: 'spelling-top-words-2',
    zone: 'b1',
    category: 'Spelling',
    title: 'Common Words: Set 2 📝',
    icon: '📋',
    color: 'from-indigo-500 to-blue-600',
    requiredXP: 0,
    drills: [
      { id: 'd1', type: 'quiz', question: 'Which is spelled correctly?', correctAnswer: 'would', options: ['would', 'woud', 'wuld', 'whould'] },
      { id: 'd2', type: 'hangman', question: 'Spell it: going from one side to the middle and out the other', correctAnswer: 'through', hint: 't' },
      { id: 'd3', type: 'quiz', question: 'Which is spelled correctly?', correctAnswer: 'thought', options: ['thought', 'thout', 'thougt', 'thohgt'] },
      { id: 'd4', type: 'scramble', question: 'Unscramble!', correctAnswer: 'ALWAYS', imageEmoji: '♾️', hint: 'A' },
      { id: 'd5', type: 'hangman', question: 'Spell it: not apart — in the same place', correctAnswer: 'together', hint: 't' },
      { id: 'd6', type: 'quiz', question: 'Which is spelled correctly?', correctAnswer: 'probably', options: ['probably', 'probly', 'probbably', 'probabely'] },
      { id: 'd7', type: 'hangman', question: 'Spell it: not the same as something else', correctAnswer: 'different', hint: 'd' },
      { id: 'd8', type: 'quiz', question: 'Which is spelled correctly?', correctAnswer: 'although', options: ['although', 'althogh', 'allthough', 'altough'] },
      { id: 'd9', type: 'scramble', question: 'Unscramble!', correctAnswer: 'ANOTHER', imageEmoji: '➕', hint: 'A' },
      { id: 'd10', type: 'hangman', question: 'Spell it: not this one but a second option', correctAnswer: 'whether', hint: 'w' },
    ],
  },

  {
    id: 'spelling-top-words-3',
    zone: 'b1',
    category: 'Spelling',
    title: 'Common Words: Set 3 📝',
    icon: '🔡',
    color: 'from-violet-500 to-indigo-600',
    requiredXP: 0,
    drills: [
      { id: 'd1', type: 'quiz', question: 'Which is spelled correctly?', correctAnswer: 'something', options: ['something', 'somthing', 'somethng', 'somthin'] },
      { id: 'd2', type: 'hangman', question: 'Spell it: a sufficient amount — "that\'s ___!"', correctAnswer: 'enough', hint: 'e' },
      { id: 'd3', type: 'quiz', question: 'Which is spelled correctly?', correctAnswer: 'between', options: ['between', 'beetween', 'betwen', 'betwean'] },
      { id: 'd4', type: 'scramble', question: 'Unscramble!', correctAnswer: 'BEFORE', imageEmoji: '⏮️', hint: 'B' },
      { id: 'd5', type: 'quiz', question: 'Which is spelled correctly?', correctAnswer: 'everything', options: ['everything', 'evrything', 'everythng', 'evreything'] },
      { id: 'd6', type: 'hangman', question: 'Spell it: of great importance — opposite of unimportant', correctAnswer: 'important', hint: 'i' },
      { id: 'd7', type: 'quiz', question: 'Which is spelled correctly?', correctAnswer: 'especially', options: ['especially', 'expecially', 'especialy', 'especiallly'] },
      { id: 'd8', type: 'scramble', question: 'Unscramble!', correctAnswer: 'NOTHING', imageEmoji: '0️⃣', hint: 'N' },
      { id: 'd9', type: 'quiz', question: 'Which is spelled correctly?', correctAnswer: 'usually', options: ['usually', 'usally', 'usualy', 'usualley'] },
      { id: 'd10', type: 'hangman', question: 'Spell it: happening in a very short time from now', correctAnswer: 'immediately', hint: 'i' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // VIDEO COMPREHENSION
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'video-dogs-amazing',
    zone: 'b1',
    category: 'Listening',
    title: 'Amazing Facts About Dogs 🐕',
    icon: '🐕',
    color: 'from-amber-400 to-yellow-500',
    requiredXP: 0,
    drills: [
      {
        id: 'd1',
        type: 'video-comprehension',
        question: 'Amazing Facts About Dogs',
        videoId: 'pjVkNsVKMgw',
        videoDuration: '3:00',
        topic: 'dog',
        readingLevel: 'b1',
        correctAnswer: '',
        options: [],
        rcQuestions: [
          {
            question: 'How many breeds of dog are there in the world, according to the video?',
            correctAnswer: 'More than 300',
            options: ['Around 50', 'More than 300', 'Exactly 100', 'About 200'],
            explanation: 'The video explains there are over 300 recognised dog breeds worldwide.',
            questionType: 'literal',
          },
          {
            question: 'What does a dog\'s nose print have in common with a human fingerprint?',
            correctAnswer: 'It is completely unique to each individual',
            options: ['It is completely unique to each individual', 'It can be used to smell food', 'It changes as the dog gets older', 'It looks the same for all dogs of the same breed'],
            explanation: 'Just like human fingerprints, every dog\'s nose print is unique — no two are the same.',
            questionType: 'literal',
          },
          {
            question: 'What does the word "domesticated" most likely mean in this context?',
            correctAnswer: 'Tamed and bred to live with humans',
            options: ['Tamed and bred to live with humans', 'Living in the wild', 'Trained to perform tricks', 'Born in a kennel'],
            explanation: '"Domesticated" means an animal has been tamed over generations to live alongside humans.',
            questionType: 'vocabulary',
          },
          {
            question: 'Why do dogs tilt their heads when you speak to them?',
            correctAnswer: 'To hear sounds better and understand your emotions',
            options: ['Because they are bored', 'To hear sounds better and understand your emotions', 'Because they are about to bark', 'To show they are hungry'],
            explanation: 'Dogs tilt their heads to adjust their ears and pick up on the tone of your voice to better understand what you are feeling.',
            questionType: 'literal',
          },
          {
            question: 'What can you infer about the relationship between dogs and humans from the video?',
            correctAnswer: 'It is one of the longest and closest bonds between an animal and a human',
            options: ['Dogs prefer the company of other animals', 'It is one of the longest and closest bonds between an animal and a human', 'Dogs were only recently domesticated', 'Humans trained dogs mainly for racing'],
            explanation: 'The video presents dogs as uniquely adapted to human companionship over thousands of years — suggesting a deep, ancient bond.',
            questionType: 'inference',
          },
        ],
      },
    ],
  },

  {
    id: 'video-bear-and-bee',
    zone: 'b1',
    category: 'Listening',
    title: 'The Bear and the Bee 🐻',
    icon: '🐻',
    color: 'from-blue-500 to-indigo-600',
    requiredXP: 0,
    drills: [
      {
        id: 'd1',
        type: 'video-comprehension',
        question: 'The Bear and the Bee',
        videoId: 'jKi2SvWOCXc',
        videoDuration: '2:30',
        topic: 'story',
        readingLevel: 'b1',
        correctAnswer: '',
        options: [],
        rcQuestions: [
          {
            question: 'What does the bear want at the beginning of the story?',
            correctAnswer: 'Honey from the bees',
            options: ['Honey from the bees', 'A place to sleep', 'Fish from the river', 'Berries from a bush'],
            explanation: 'The bear is hungry and wants honey — he tries to negotiate with the bees to get it.',
            questionType: 'literal',
          },
          {
            question: 'What mistake does the bear make when talking to the bees?',
            correctAnswer: 'He loses his temper',
            options: ['He eats too much honey', 'He loses his temper', 'He falls asleep', 'He runs away without asking'],
            explanation: 'The story is about the danger of losing your temper — the bear gets angry instead of staying calm, which makes things worse.',
            questionType: 'literal',
          },
          {
            question: 'What does the word "negotiate" mean in this story?',
            correctAnswer: 'To try to reach an agreement by talking',
            options: ['To fight for something', 'To steal something quietly', 'To try to reach an agreement by talking', 'To give something away for free'],
            explanation: 'Negotiate means to discuss and try to find a deal that works for both sides — the bear has no talent for this.',
            questionType: 'vocabulary',
          },
          {
            question: 'What lesson does this story teach?',
            correctAnswer: 'Losing your temper makes problems worse, not better',
            options: ['Bears and bees can never be friends', 'Honey is the most valuable food in the forest', 'Losing your temper makes problems worse, not better', 'It is always wrong to ask for help'],
            explanation: 'This is an Aesop fable — the moral is that getting angry and losing control leads to bad outcomes. Staying calm is always wiser.',
            questionType: 'inference',
          },
        ],
      },
    ],
  },

  {
    id: 'video-how-internet-works',
    zone: 'b1',
    category: 'Listening',
    title: 'How Does the Internet Work? 🌐',
    icon: '🌐',
    color: 'from-green-500 to-teal-600',
    requiredXP: 0,
    drills: [
      {
        id: 'd1',
        type: 'video-comprehension',
        question: 'How Does the Internet Work?',
        videoId: 'x3c1ih2NJEg',
        videoDuration: '3:44',
        topic: 'technology',
        readingLevel: 'b1',
        correctAnswer: '',
        options: [],
        rcQuestions: [
          {
            question: 'What are the cables that carry internet data under the ocean called?',
            correctAnswer: 'Submarine cables',
            options: ['Satellite wires', 'Submarine cables', 'Fibre tunnels', 'Ocean lines'],
            explanation: 'The video explains that submarine (undersea) cables carry the vast majority of international internet traffic across the world\'s oceans.',
            questionType: 'literal',
          },
          {
            question: 'What does a "server" do?',
            correctAnswer: 'It stores and delivers information to other computers',
            options: ['It sends emails for you', 'It stores and delivers information to other computers', 'It creates new websites', 'It connects your phone to a Wi-Fi network'],
            explanation: 'A server is a powerful computer that stores data (like websites) and delivers it to other computers when they make a request.',
            questionType: 'literal',
          },
          {
            question: 'What does the word "bandwidth" most likely mean?',
            correctAnswer: 'The amount of data that can be sent through a connection at one time',
            options: ['The speed of a Wi-Fi password', 'The amount of data that can be sent through a connection at one time', 'The number of websites on the internet', 'The physical size of an internet cable'],
            explanation: '"Bandwidth" refers to the capacity of a connection — higher bandwidth means more data can travel through it at once, resulting in faster speeds.',
            questionType: 'vocabulary',
          },
          {
            question: 'Why is the internet described as a "network of networks"?',
            correctAnswer: 'Because it connects millions of smaller networks together',
            options: ['Because it was built by many different countries at the same time', 'Because it connects millions of smaller networks together', 'Because you need a network cable to access it', 'Because it uses more than one type of signal'],
            explanation: 'The internet is not a single system — it is made up of millions of individual networks (home, school, business) all connected together.',
            questionType: 'inference',
          },
          {
            question: 'True, False, or Not Given: All internet traffic travels through satellites in space.',
            correctAnswer: 'False',
            options: ['True', 'False', 'Not Given'],
            explanation: 'The video explains that most internet traffic travels through physical cables, including submarine cables under the ocean, not primarily through satellites.',
            questionType: 'true-false-not-given',
          },
        ],
      },
    ],
  },
];

export const DAILY_CHALLENGE_DRILLS = [
  { id: 'dc1', type: 'fill-blank' as const, question: 'The cat is ___ the mat.', correctAnswer: 'on', options: ['on', 'in', 'under', 'above'] },
  { id: 'dc2', type: 'fill-blank' as const, question: 'She ___ to music every evening.', correctAnswer: 'listens', options: ['listens', 'listen', 'listening', 'listened'] },
  { id: 'dc3', type: 'scramble' as const, question: 'Unscramble!', correctAnswer: 'SCHOOL', imageEmoji: '🏫', hint: 'S' },
  { id: 'dc4', type: 'quiz' as const, question: 'Past tense of "run" is...', correctAnswer: 'ran', options: ['ran', 'runned', 'running', 'runs'] },
  { id: 'dc5', type: 'quiz' as const, question: 'What is fifteen plus twenty-seven?', correctAnswer: '42', options: ['40', '41', '42', '43'] },
  { id: 'dc6', type: 'quiz' as const, question: 'Which day comes after Thursday?', correctAnswer: 'Friday', options: ['Friday', 'Wednesday', 'Saturday', 'Monday'] },
  { id: 'dc7', type: 'fill-blank' as const, question: 'I have ___ eaten breakfast.', correctAnswer: 'already', options: ['already', 'yet', 'never', 'ever'] },
  { id: 'dc8', type: 'quiz' as const, question: 'What is eight times six?', correctAnswer: '48', options: ['42', '46', '48', '54'] },
  { id: 'dc9', type: 'fill-blank' as const, question: 'There ___ three apples on the table.', correctAnswer: 'are', options: ['are', 'is', 'was', 'be'] },
  { id: 'dc10', type: 'clock' as const, question: 'What time does the clock show?', correctAnswer: 'half past ten', options: ['half past ten', 'ten o\'clock', 'quarter past ten', 'quarter to eleven'], hours: 10, minutes: 30 },
];
