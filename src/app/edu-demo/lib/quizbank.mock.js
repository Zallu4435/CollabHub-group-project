'use client';

// Quiz bank organized by lesson and difficulty
export const QUIZ_BANK = {
  // React Course - Lesson 1-1: Introduction to React
  'lesson-1-1': {
    easy: [
      {
        id: 'q1-1-e1',
        type: 'mcq',
        question: 'What is React?',
        options: ['A JavaScript library for building user interfaces', 'A database', 'A web server', 'A CSS framework'],
        correct: 0,
        explanation: 'React is a JavaScript library developed by Facebook for building user interfaces, particularly web applications.',
        lessonSegment: '0:30 - Introduction to React'
      },
      {
        id: 'q1-1-e2',
        type: 'tf',
        question: 'React was created by Google.',
        correct: false,
        explanation: 'React was created by Facebook (now Meta), not Google.',
        lessonSegment: '1:15 - React History'
      },
      {
        id: 'q1-1-e3',
        type: 'mcq',
        question: 'What does JSX stand for?',
        options: ['JavaScript XML', 'Java Syntax Extension', 'JSON XML', 'JavaScript Extension'],
        correct: 0,
        explanation: 'JSX stands for JavaScript XML, allowing you to write HTML-like syntax in JavaScript.',
        lessonSegment: '5:20 - JSX Introduction'
      }
    ],
    medium: [
      {
        id: 'q1-1-m1',
        type: 'mcq',
        question: 'Which of the following is a key benefit of React\'s virtual DOM?',
        options: ['Faster rendering performance', 'Better SEO', 'Smaller bundle size', 'Built-in routing'],
        correct: 0,
        explanation: 'The virtual DOM allows React to efficiently update only the parts of the real DOM that have changed.',
        lessonSegment: '8:45 - Virtual DOM Concept'
      },
      {
        id: 'q1-1-m2',
        type: 'coding',
        question: 'Complete this basic React component:\n\n```jsx\nfunction Welcome() {\n  return ___;\n}\n```',
        answer: '<h1>Hello, World!</h1>',
        keywords: ['<h1>', 'Hello', 'World', '</h1>'],
        explanation: 'A React component should return JSX elements. The simplest example is returning an h1 element.',
        lessonSegment: '12:30 - First Component'
      }
    ],
    hard: [
      {
        id: 'q1-1-h1',
        type: 'mcq',
        question: 'What happens during React\'s reconciliation process?',
        options: [
          'React compares the virtual DOM with the previous virtual DOM',
          'React compiles JSX to JavaScript',
          'React validates prop types',
          'React handles event listeners'
        ],
        correct: 0,
        explanation: 'Reconciliation is React\'s process of comparing the current virtual DOM tree with the previous one to determine what changes need to be made to the real DOM.',
        lessonSegment: '15:10 - Reconciliation Deep Dive'
      },
      {
        id: 'q1-1-h2',
        type: 'coding',
        question: 'Write a React component that conditionally renders content based on a prop:\n\n```jsx\nfunction ConditionalComponent({ isVisible, children }) {\n  // Your code here\n}\n```',
        answer: 'return isVisible ? children : null;',
        keywords: ['isVisible', '?', 'children', ':', 'null'],
        explanation: 'Use the ternary operator to conditionally render children based on the isVisible prop.',
        lessonSegment: '18:45 - Conditional Rendering'
      }
    ]
  },
  
  // React Course - Lesson 1-2: JSX and Components
  'lesson-1-2': {
    easy: [
      {
        id: 'q1-2-e1',
        type: 'tf',
        question: 'JSX elements must be wrapped in a single parent element.',
        correct: true,
        explanation: 'JSX expressions must have one parent element, though you can use React.Fragment or <> </> as a wrapper.',
        lessonSegment: '2:15 - JSX Rules'
      },
      {
        id: 'q1-2-e2',
        type: 'mcq',
        question: 'How do you embed JavaScript expressions in JSX?',
        options: ['Using curly braces {}', 'Using square brackets []', 'Using parentheses ()', 'Using quotes ""'],
        correct: 0,
        explanation: 'JavaScript expressions are embedded in JSX using curly braces {}.',
        lessonSegment: '4:30 - JavaScript in JSX'
      }
    ],
    medium: [
      {
        id: 'q1-2-m1',
        type: 'coding',
        question: 'Create a component that displays a user\'s name and age:\n\n```jsx\nfunction UserCard({ name, age }) {\n  // Return JSX here\n}\n```',
        answer: 'return <div><h2>{name}</h2><p>Age: {age}</p></div>;',
        keywords: ['<div>', '{name}', '{age}', '</div>'],
        explanation: 'Use curly braces to embed the name and age props in JSX elements.',
        lessonSegment: '7:20 - Props in JSX'
      }
    ],
    hard: [
      {
        id: 'q1-2-h1',
        type: 'mcq',
        question: 'What is the difference between React.Fragment and <> </>?',
        options: [
          'No difference, they are equivalent',
          'Fragment can accept props, <> </> cannot',
          'Fragment is faster',
          '<> </> is deprecated'
        ],
        correct: 1,
        explanation: 'React.Fragment can accept a key prop, while the short syntax <> </> cannot accept any props.',
        lessonSegment: '12:45 - Fragment vs Short Syntax'
      }
    ]
  },

  // Node.js Course - Lesson 2-1-1: Node.js Introduction
  'lesson-2-1-1': {
    easy: [
      {
        id: 'q2-1-e1',
        type: 'mcq',
        question: 'What is Node.js?',
        options: ['A JavaScript runtime built on Chrome\'s V8 engine', 'A web browser', 'A database', 'A CSS framework'],
        correct: 0,
        explanation: 'Node.js is a JavaScript runtime that allows you to run JavaScript on the server side.',
        lessonSegment: '1:00 - What is Node.js'
      },
      {
        id: 'q2-1-e2',
        type: 'tf',
        question: 'Node.js is single-threaded.',
        correct: true,
        explanation: 'Node.js uses a single-threaded event loop, though it uses multiple threads for I/O operations behind the scenes.',
        lessonSegment: '3:30 - Node.js Architecture'
      }
    ],
    medium: [
      {
        id: 'q2-1-m1',
        type: 'coding',
        question: 'Write a simple Node.js script that logs "Hello, Node.js!" to the console:',
        answer: 'console.log("Hello, Node.js!");',
        keywords: ['console.log', 'Hello, Node.js!'],
        explanation: 'Use console.log() to output text to the console in Node.js.',
        lessonSegment: '5:15 - First Node.js Script'
      }
    ],
    hard: [
      {
        id: 'q2-1-h1',
        type: 'mcq',
        question: 'What is the event loop in Node.js responsible for?',
        options: [
          'Handling asynchronous operations and callbacks',
          'Compiling JavaScript code',
          'Managing memory allocation',
          'Handling HTTP requests only'
        ],
        correct: 0,
        explanation: 'The event loop is responsible for handling asynchronous operations, callbacks, and non-blocking I/O in Node.js.',
        lessonSegment: '8:20 - Event Loop Deep Dive'
      }
    ]
  }
};

// Adaptive difficulty rules
export const DIFFICULTY_RULES = {
  // Score ranges for difficulty adjustment
  easy: { min: 0, max: 60 },      // 0-60% → stay easy or move to medium
  medium: { min: 40, max: 85 },   // 40-85% → medium questions
  hard: { min: 70, max: 100 }     // 70%+ → hard questions
};

// Recommended revision based on wrong answers
export const REVISION_MAPPING = {
  'lesson-1-1': {
    'q1-1-e1': ['0:30 - Introduction to React', '2:00 - React Overview'],
    'q1-1-e2': ['1:15 - React History', '3:45 - React vs Other Libraries'],
    'q1-1-m1': ['8:45 - Virtual DOM Concept', '10:30 - DOM Manipulation'],
    'q1-1-h1': ['15:10 - Reconciliation Deep Dive', '17:20 - React Internals']
  },
  'lesson-1-2': {
    'q1-2-e1': ['2:15 - JSX Rules', '4:00 - JSX Best Practices'],
    'q1-2-m1': ['7:20 - Props in JSX', '9:10 - Component Props'],
    'q1-2-h1': ['12:45 - Fragment vs Short Syntax', '14:30 - Advanced JSX']
  }
};
