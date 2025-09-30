// qa/lib/dummy-data/questions.ts
import { Question, Tag } from '../types/question.types'
import { users } from './users'

export const tags: Tag[] = [
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'Questions about JavaScript programming',
    questionCount: 1247,
    followers: 892,
    color: 'yellow'
  },
  {
    id: 'react',
    name: 'React',
    description: 'React.js library questions',
    questionCount: 856,
    followers: 654,
    color: 'blue'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    description: 'TypeScript language questions',
    questionCount: 432,
    followers: 321,
    color: 'blue'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    description: 'Next.js framework questions',
    questionCount: 298,
    followers: 187,
    color: 'black'
  }
]

export const questions: Question[] = [
  {
    id: '1',
    title: 'How to implement authentication in Next.js 13 with App Router?',
    content: `I'm trying to implement authentication in my Next.js 13 application using the new App Router. I've looked at NextAuth.js but I'm not sure how to properly configure it with the new app directory structure.

What's the best approach for:
1. Setting up authentication providers
2. Protecting routes
3. Managing user sessions
4. Handling redirects

Any code examples would be greatly appreciated!`,
    author: users[0],
    tags: [tags[3], tags[2], tags[1]],
    votes: 23,
    views: 342,
    answers: 4,
    isAnswered: true,
    acceptedAnswerId: 'ans-1',
    createdAt: '2024-09-25T10:30:00Z',
    updatedAt: '2024-09-25T14:20:00Z',
    bookmarked: false,
    followed: true
  },
  {
    id: '2',
    title: 'TypeScript generic constraints with conditional types',
    content: `I'm working with TypeScript and trying to create a utility type that conditionally applies constraints based on input types. Here's what I'm trying to achieve:

\`\`\`typescript
type ConditionalType<T> = T extends string 
  ? { value: T; length: number }
  : T extends number 
  ? { value: T; isEven: boolean }
  : never
\`\`\`

The issue is that I need this to work with union types as well. How can I properly distribute over union types while maintaining type safety?`,
    author: users[1],
    tags: [tags[2], tags[0]],
    votes: 18,
    views: 156,
    answers: 2,
    isAnswered: false,
    createdAt: '2024-09-24T16:45:00Z',
    updatedAt: '2024-09-24T16:45:00Z',
    bookmarked: true,
    followed: false
  },
  {
    id: '3',
    title: 'React state management: Context vs Redux in 2024',
    content: `With the evolution of React hooks and Context API, I'm wondering about the current best practices for state management in large applications.

**My current situation:**
- Large e-commerce application
- Multiple user roles
- Real-time updates needed
- Complex state interactions

**Questions:**
1. Is Redux still worth it in 2024?
2. When should I use Context vs external libraries?
3. What about Zustand or Jotai?
4. Performance considerations?

Looking for practical advice based on recent project experience.`,
    author: users[2],
    tags: [tags[1], tags[0]],
    votes: 31,
    views: 489,
    answers: 7,
    isAnswered: true,
    acceptedAnswerId: 'ans-5',
    createdAt: '2024-09-23T09:15:00Z',
    updatedAt: '2024-09-25T11:30:00Z',
    bookmarked: false,
    followed: true
  },
  {
    id: '4',
    title: 'Optimizing Next.js 13 server components for SEO',
    content: `I’ve read that server components improve performance, but how do they affect SEO in a Next.js 13 project? Should I use static rendering, or server rendering for better indexing?`,
    author: users[3],
    tags: [tags[3], tags[1]],
    votes: 12,
    views: 221,
    answers: 3,
    isAnswered: false,
    createdAt: '2024-09-22T08:20:00Z',
    updatedAt: '2024-09-22T09:10:00Z',
    bookmarked: false,
    followed: false
  },
  {
    id: '5',
    title: 'Best practices for error boundaries in React 18',
    content: `How should I implement error boundaries in a React 18 application? Do Suspense boundaries also catch runtime errors or should I combine both?`,
    author: users[1],
    tags: [tags[0], tags[1]],
    votes: 20,
    views: 333,
    answers: 5,
    isAnswered: true,
    acceptedAnswerId: 'ans-7',
    createdAt: '2024-09-21T12:40:00Z',
    updatedAt: '2024-09-23T15:15:00Z',
    bookmarked: true,
    followed: true
  },
  {
    id: '6',
    title: 'Deploying Next.js app on Vercel with environment variables',
    content: `My Next.js app works locally but fails on Vercel because environment variables aren’t being read correctly. How should I configure \`.env\` files for production?`,
    author: users[2],
    tags: [tags[3], tags[2]],
    votes: 15,
    views: 190,
    answers: 2,
    isAnswered: true,
    acceptedAnswerId: 'ans-9',
    createdAt: '2024-09-20T18:55:00Z',
    updatedAt: '2024-09-20T20:10:00Z',
    bookmarked: false,
    followed: false
  },
  {
    id: '7',
    title: 'Efficient state updates in React lists',
    content: `I have a large list (10k+ items) and updates cause huge re-renders. Should I use virtualization libraries like react-window, or optimize state differently?`,
    author: users[0],
    tags: [tags[0], tags[1]],
    votes: 42,
    views: 789,
    answers: 6,
    isAnswered: true,
    acceptedAnswerId: 'ans-12',
    createdAt: '2024-09-20T09:10:00Z',
    updatedAt: '2024-09-22T12:40:00Z',
    bookmarked: false,
    followed: true
  },
  {
    id: '8',
    title: 'TypeScript: narrowing union types inside async functions',
    content: `Inside an async function, type narrowing seems lost after an await. How can I maintain type guards across async boundaries?`,
    author: users[3],
    tags: [tags[2]],
    votes: 8,
    views: 143,
    answers: 1,
    isAnswered: false,
    createdAt: '2024-09-19T15:25:00Z',
    updatedAt: '2024-09-19T15:25:00Z',
    bookmarked: false,
    followed: false
  },
  {
    id: '9',
    title: 'Server actions in Next.js 13 — when to use them?',
    content: `Server actions look powerful, but I’m unsure when to use them instead of API routes. Are there performance trade-offs?`,
    author: users[4],
    tags: [tags[3], tags[1]],
    votes: 25,
    views: 411,
    answers: 3,
    isAnswered: true,
    acceptedAnswerId: 'ans-14',
    createdAt: '2024-09-18T11:00:00Z',
    updatedAt: '2024-09-19T10:45:00Z',
    bookmarked: true,
    followed: true
  },
  {
    id: '10',
    title: 'React suspense with data fetching libraries',
    content: `I want to use React Suspense for data fetching but also rely on libraries like SWR/React Query. How do these work together in React 18?`,
    author: users[2],
    tags: [tags[0], tags[1]],
    votes: 19,
    views: 277,
    answers: 4,
    isAnswered: true,
    acceptedAnswerId: 'ans-16',
    createdAt: '2024-09-17T13:40:00Z',
    updatedAt: '2024-09-18T09:20:00Z',
    bookmarked: false,
    followed: true
  },
  {
    id: '11',
    title: 'Advanced generics with mapped types in TypeScript',
    content: `How can I create a utility type that transforms all properties of an object type into optional async functions returning those properties?`,
    author: users[0],
    tags: [tags[2]],
    votes: 14,
    views: 233,
    answers: 2,
    isAnswered: false,
    createdAt: '2024-09-16T16:50:00Z',
    updatedAt: '2024-09-16T16:50:00Z',
    bookmarked: false,
    followed: false
  },
  {
    id: '12',
    title: 'Static vs dynamic rendering in Next.js 13',
    content: `I’m confused when to use static generation vs dynamic rendering with the new Next.js App Router. Any rules of thumb?`,
    author: users[1],
    tags: [tags[3]],
    votes: 28,
    views: 401,
    answers: 5,
    isAnswered: true,
    acceptedAnswerId: 'ans-20',
    createdAt: '2024-09-15T10:20:00Z',
    updatedAt: '2024-09-16T09:05:00Z',
    bookmarked: true,
    followed: true
  },
  {
    id: '13',
    title: 'React performance profiling in production',
    content: `What tools are recommended for profiling React applications in production environments without too much overhead?`,
    author: users[4],
    tags: [tags[0], tags[1]],
    votes: 10,
    views: 188,
    answers: 1,
    isAnswered: false,
    createdAt: '2024-09-14T12:15:00Z',
    updatedAt: '2024-09-14T12:15:00Z',
    bookmarked: false,
    followed: false
  },
  {
    id: '14',
    title: 'Managing database connections in Next.js API routes',
    content: `I’m using Prisma + PostgreSQL in Next.js. What’s the best way to manage database connections across API routes without hitting connection limits?`,
    author: users[3],
    tags: [tags[3], tags[2]],
    votes: 22,
    views: 312,
    answers: 3,
    isAnswered: true,
    acceptedAnswerId: 'ans-22',
    createdAt: '2024-09-13T19:30:00Z',
    updatedAt: '2024-09-14T11:10:00Z',
    bookmarked: true,
    followed: true
  },
  {
    id: '15',
    title: 'TypeScript utility types for deeply nested objects',
    content: `How can I create a recursive utility type that makes all nested properties of an object optional, similar to DeepPartial?`,
    author: users[2],
    tags: [tags[2]],
    votes: 30,
    views: 422,
    answers: 4,
    isAnswered: true,
    acceptedAnswerId: 'ans-25',
    createdAt: '2024-09-12T08:25:00Z',
    updatedAt: '2024-09-13T14:40:00Z',
    bookmarked: false,
    followed: true
  },
  {
    id: '16',
    title: 'Client vs server components: best practices',
    content: `What criteria should I use to decide if a component belongs in the client or server in a Next.js 13 app?`,
    author: users[1],
    tags: [tags[3], tags[1]],
    votes: 17,
    views: 289,
    answers: 3,
    isAnswered: true,
    acceptedAnswerId: 'ans-27',
    createdAt: '2024-09-11T10:00:00Z',
    updatedAt: '2024-09-12T09:30:00Z',
    bookmarked: false,
    followed: false
  },
  {
    id: '17',
    title: 'React context performance pitfalls',
    content: `Using Context API for global state is causing unnecessary re-renders. What’s the best way to optimize context performance?`,
    author: users[0],
    tags: [tags[0], tags[1]],
    votes: 35,
    views: 512,
    answers: 5,
    isAnswered: true,
    acceptedAnswerId: 'ans-29',
    createdAt: '2024-09-10T09:40:00Z',
    updatedAt: '2024-09-11T11:20:00Z',
    bookmarked: false,
    followed: true
  },
  {
    id: '18',
    title: 'Next.js middleware for route protection',
    content: `How do I correctly implement authentication middleware in Next.js 13 so that it protects both server and client routes?`,
    author: users[4],
    tags: [tags[3]],
    votes: 24,
    views: 377,
    answers: 4,
    isAnswered: true,
    acceptedAnswerId: 'ans-31',
    createdAt: '2024-09-09T12:30:00Z',
    updatedAt: '2024-09-10T08:40:00Z',
    bookmarked: true,
    followed: true
  },
  {
    id: '19',
    title: 'TypeScript: strict null checks with optional chaining',
    content: `How does TypeScript handle strict null checks when optional chaining is used? Are there any edge cases I should be aware of?`,
    author: users[2],
    tags: [tags[2]],
    votes: 11,
    views: 150,
    answers: 2,
    isAnswered: false,
    createdAt: '2024-09-08T15:50:00Z',
    updatedAt: '2024-09-08T15:50:00Z',
    bookmarked: false,
    followed: false
  },
  {
    id: '20',
    title: 'Image optimization in Next.js 13',
    content: `What’s the difference between using the built-in Next.js Image component vs third-party solutions like Imgix or Cloudinary?`,
    author: users[3],
    tags: [tags[3], tags[1]],
    votes: 27,
    views: 430,
    answers: 3,
    isAnswered: true,
    acceptedAnswerId: 'ans-33',
    createdAt: '2024-09-07T11:10:00Z',
    updatedAt: '2024-09-08T09:00:00Z',
    bookmarked: true,
    followed: false
  },
  {
    id: '21',
    title: 'React 18 transitions and concurrent rendering',
    content: `When should I use startTransition in React 18? Can it help with expensive state updates in forms?`,
    author: users[1],
    tags: [tags[0], tags[1]],
    votes: 16,
    views: 280,
    answers: 2,
    isAnswered: false,
    createdAt: '2024-09-06T14:20:00Z',
    updatedAt: '2024-09-06T14:20:00Z',
    bookmarked: false,
    followed: true
  },
  {
    id: '22',
    title: 'Securing API routes in Next.js with JWT',
    content: `I want to secure my Next.js API routes with JWT tokens. How do I correctly verify tokens in middleware and API handlers?`,
    author: users[0],
    tags: [tags[3], tags[2]],
    votes: 21,
    views: 355,
    answers: 3,
    isAnswered: true,
    acceptedAnswerId: 'ans-35',
    createdAt: '2024-09-05T13:40:00Z',
    updatedAt: '2024-09-06T09:15:00Z',
    bookmarked: true,
    followed: true
  },
  {
    id: '23',
    title: 'TypeScript template literal types for string manipulation',
    content: `How can I use template literal types in TypeScript to transform strings, e.g., converting 'hello_world' into 'HelloWorld'?`,
    author: users[2],
    tags: [tags[2]],
    votes: 29,
    views: 410,
    answers: 4,
    isAnswered: true,
    acceptedAnswerId: 'ans-38',
    createdAt: '2024-09-04T09:25:00Z',
    updatedAt: '2024-09-05T10:50:00Z',
    bookmarked: false,
    followed: true
  }
]
