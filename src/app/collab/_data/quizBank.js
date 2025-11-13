'use client';

export const QUIZ_BANK = [
  // MCQ
  { id: 'q1', type: 'mcq', question: 'Which hook is used for side-effects in React?', options: ['useState', 'useEffect', 'useMemo', 'useRef'], answer: 'useEffect', explain: 'useEffect runs after render to handle side-effects.' },
  { id: 'q2', type: 'mcq', question: 'Which HTTP status means Not Found?', options: ['200', '301', '404', '500'], answer: '404', explain: '404 indicates resource not found.' },
  // True/False
  { id: 'q3', type: 'tf', question: 'CSS Flexbox can be combined with Grid.', options: ['True', 'False'], answer: 'True', explain: 'They can be used together to build complex layouts.' },
  { id: 'q4', type: 'tf', question: 'In JavaScript, null === undefined is true.', options: ['True', 'False'], answer: 'False', explain: 'They are different types; === compares type & value.' },
  // Coding (free text, simple keyword check)
  { id: 'q5', type: 'code', question: 'Write a JS snippet to create an array of length 3 filled with 0s.', answer: 'Array(3).fill(0)', keyword: 'fill(0)', explain: 'One way: Array(3).fill(0)' },
  { id: 'q6', type: 'code', question: 'How do you convert a string to a number in JS? Give any one-liner.', answer: 'Number(str)', keyword: 'Number(', explain: 'Common ways: Number(str), +str, parseInt/parseFloat.' },
];
