export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  name: string;
  icon: string; // Dynamic icon descriptor or SVG path if needed, we'll use simple identifiers
  items: FAQItem[];
}

export const faqCategories: FAQCategory[] = [
  {
    id: "architecture",
    name: "I. Architecture & Tech Stack",
    icon: "Layers",
    items: [
      {
        id: "arch-1",
        question: "What is the core architecture of the Task Manager application?",
        answer: "The Task Manager is built using a modern Next.js App Router architecture. It utilizes React Server Components (RSC) by default for static rendering, search engine optimization, and fast initial page loads, while integrating interactive client components at the leaf level for interactive state management.",
      },
      {
        id: "arch-2",
        question: "Which state management approach is utilized for the tasks?",
        answer: "Tasks are managed using a custom hooks layer (specifically useLocalStorage) that persists the state in the browser. This allows for instant CRUD operations without a database round-trip during development and provides offline capability for users out-of-the-box.",
      },
      {
        id: "arch-3",
        question: "How does the application leverage Tailwind CSS v4?",
        answer: "Tailwind CSS v4 is integrated as the primary styling framework. It uses modern features like CSS-variables-based theming, native light/dark mode transitions, and direct CSS custom property configuration. This eliminates the need for complex tailwind.config.js files while providing optimized, lightweight build assets.",
      },
    ],
  },
  {
    id: "code-design",
    name: "II. Code Design & Performance",
    icon: "Code",
    items: [
      {
        id: "code-1",
        question: "How are task search queries optimized for performance?",
        answer: "Search queries are optimized using a debounced search input with the custom useDebounce hook. Instead of triggering a re-render or re-filter on every single keystroke, search actions are delayed by 300ms. This significantly reduces computation overhead and improves typing responsiveness.",
      },
      {
        id: "code-2",
        question: "How does the codebase ensure strict type safety?",
        answer: "The project is written in 100% strict TypeScript. All components, hooks, and data models are strongly typed without resorting to 'any' types. Generics are used in reusable hooks like useLocalStorage to ensure that JSON serialization and deserialization maintain robust type safety.",
      },
      {
        id: "code-3",
        question: "What are the key performance optimizations in the rendering layer?",
        answer: "React 19 features are fully leveraged, including compiler-ready rendering optimization, useMemo-free dependency tracking where applicable, and selective component lazy-loading. We also ensure that state updates are localized to prevent unnecessary parent tree re-renders.",
      },
    ],
  },
  {
    id: "cloud-migration",
    name: "III. Cloud Migration (AWS)",
    icon: "Cloud",
    items: [
      {
        id: "cloud-1",
        question: "What is the roadmap for migrating the local state to the cloud?",
        answer: "The AWS Cloud Migration roadmap splits the transition into three progressive phases: Phase 1 replaces LocalStorage with an AWS API Gateway + DynamoDB setup; Phase 2 implements AWS Cognito for secure, multi-tenant user authentication; Phase 3 utilizes AWS S3 and CloudFront for high-availability frontend hosting.",
      },
      {
        id: "cloud-2",
        question: "Why was Amazon DynamoDB chosen as the target database?",
        answer: "DynamoDB was chosen for its single-digit millisecond latency, fully serverless operational model, and seamless scalability. Its document-store structure naturally maps to our JSON-based Task schema, eliminating the need for an expensive relational database or complex ORM configurations.",
      },
      {
        id: "cloud-3",
        question: "How is security handled during the cloud migration?",
        answer: "Security measures conform to the Principle of Least Privilege. AWS IAM roles are defined strictly for each service. All API Gateway endpoints are guarded with AWS Cognito authorizers, ensuring only authenticated users can perform mutations on their task objects.",
      },
    ],
  },
  {
    id: "advanced-db",
    name: "IV. Advanced Cloud DB & Logic",
    icon: "Database",
    items: [
      {
        id: "db-1",
        question: "How are complex querying patterns handled in a serverless NoSQL DB?",
        answer: "To handle queries like searching by status, priority, or tags, DynamoDB Global Secondary Indexes (GSIs) will be provisioned. This allows efficient, cost-effective indexing and querying of attributes beyond the primary partition key.",
      },
      {
        id: "db-2",
        question: "What cache strategies will be implemented for read-heavy operations?",
        answer: "For high-traffic environments, DynamoDB Accelerator (DAX) or an Amazon ElastiCache (Redis) cluster will be introduced. This caches popular queries and drops read latency to microseconds, shielding the primary DB from spikes.",
      },
      {
        id: "db-3",
        question: "How is real-time task collaboration implemented in the architecture?",
        answer: "Real-time sync will be implemented using AWS AppSync (GraphQL Subscriptions) or AWS API Gateway WebSockets connected to AWS Lambda. When a task is modified, a lightweight event message is broadcast to all active clients instantly.",
      },
    ],
  },
];
