// Centralized data source — single source of truth for all portfolio content

export const profile = {
  name: 'Aayush Kadam',
  initials: 'AK',
  role: 'Full-Stack Web Developer & AI Integration Enthusiast',
  tagline:
    'Architecting Intelligent Web Systems at the Intersection of Full-Stack Engineering and Applied AI.',
  description:
    "Specializing in Java (OOP), Python Flask, modern React, and LLM integrations (Gemini & Groq LLaMA). Proven track record in conversational campus platforms and secure MVC architectures.",
  email: 'aayushkadam695@gmail.com',
  github: 'https://github.com/kayush7',
  linkedin: 'https://www.linkedin.com/in/aayush-kadam-8b5211400/',
  semester: 'VI',
  college: 'Pillai College of Engineering',
  sgpi: '7.02',
  status: 'Available for Opportunities',
};

export const skills = [
  {
    category: 'Languages',
    items: [
      { name: 'Java (OOP)', note: 'Enterprise patterns, masterclass certified' },
      { name: 'Python', note: 'Flask, automation, NLP' },
      { name: 'PHP', note: 'PDO & MySQLi Prepared Statements' },
      { name: 'JavaScript (ES6+)', note: 'Modern async, DOM manipulation' },
      { name: 'TypeScript', note: 'Type-safe React & Node.js' },
      { name: 'SQL', note: 'Joins, aggregations, optimization' },
    ],
  },
  {
    category: 'Frontend & UI',
    items: [
      { name: 'React', note: 'Hooks, state, Vite ecosystem' },
      { name: 'HTML5 / CSS3', note: 'Semantic markup, Flexbox, Grid' },
      { name: 'Bootstrap 4', note: 'Responsive component library' },
      { name: 'Tailwind CSS', note: 'Utility-first modern styling' },
      { name: 'Responsive Design', note: 'Mobile-first, cross-browser' },
      { name: 'Chart.js', note: 'Data visualization & telemetry' },
    ],
  },
  {
    category: 'Backend & Architecture',
    items: [
      { name: 'Node.js', note: 'RESTful API endpoints' },
      { name: 'Flask Framework', note: 'Python micro-framework' },
      { name: 'PHP (PDO / MySQLi)', note: 'Secure DB access layer' },
      { name: 'MVC Pattern', note: 'Separation of concerns' },
      { name: 'RESTful APIs', note: 'CRUD, auth, versioning' },
      { name: 'Express.js', note: 'Middleware, routing' },
    ],
  },
  {
    category: 'AI & Applied NLP',
    items: [
      { name: 'Google Gemini API', note: 'Multimodal LLM integration' },
      { name: 'Groq LLaMA', note: 'Fast inference LLM queries' },
      { name: 'Prompt Engineering', note: 'Instruction crafting, few-shot' },
      { name: 'Intent Extraction', note: 'Entity recognition, slot-filling' },
      { name: 'NLP Pipeline', note: 'Text parsing, response generation' },
    ],
  },
  {
    category: 'Databases',
    items: [
      { name: 'PostgreSQL', note: 'Advanced queries, constraints' },
      { name: 'MySQL', note: 'Relational data modeling' },
      { name: 'SQLite', note: 'Lightweight embedded DB' },
      { name: 'Snapshot Design Pattern', note: 'Audit integrity, point-in-time' },
    ],
  },
  {
    category: 'Security & Hardening',
    items: [
      { name: 'Bcrypt Hashing', note: 'Password security' },
      { name: 'SQL Injection Prevention', note: 'Prepared statements everywhere' },
      { name: 'CSRF Protection', note: 'Token-based request validation' },
      { name: 'Session Management', note: 'Secure auth sessions' },
      { name: 'FileReader Validation', note: 'Client-side pre-upload inspection' },
    ],
  },
  {
    category: 'Specialized',
    items: [
      { name: 'Web3 & DApps', note: 'Udemy certified, blockchain basics' },
      { name: 'DataTables', note: 'Server-side pagination & sorting' },
      { name: 'Framer Motion', note: 'Declarative animations' },
      { name: 'Lucide React', note: 'Icon system' },
    ],
  },
];

export const projects = [
  {
    id: 'room-booking',
    title: 'AI-Based Smart Room Booking System',
    tagline: 'Conversational campus infrastructure powered by Gemini & Groq LLaMA',
    description:
      'A full-stack platform enabling natural-language room discovery and booking across campus. Users type queries like "Find an AC lab for 40 students with projector at 2 PM" and the system extracts intent, queries available rooms, and returns ranked results — all powered by Google Gemini API for entity extraction and Groq LLaMA for response synthesis.',
    tags: ['Python Flask', 'Gemini API', 'Groq LLaMA', 'SQLite', 'Chart.js', 'NLP'],
    highlights: [
      'Intent extraction & entity slot-filling using Gemini + Groq LLaMA for natural queries',
      'Snapshot Design Pattern: freezes room facility attributes at exact execution timestamp for audit integrity',
      'Interactive admin telemetry dashboard with live Chart.js visualizations of campus room utilization',
      'Real-time availability engine with conflict detection and multi-floor support',
    ],
    hasChart: true,
    chartType: 'bar' as const,
    repoUrl: '#',
    liveUrl: '#',
  },
  {
    id: 'secure-crud',
    title: 'Advanced CRUD & Secure Record System',
    tagline: 'Enterprise-grade CRUD with defense-in-depth security',
    description:
      'A production-ready record management system engineered with multiple layers of security. Every database query uses prepared statements, forms are validated client and server-side, and file uploads are inspected via the browser FileReader API before transmission. Full DataTables integration provides server-side pagination, multi-column sorting, and instant search across thousands of records.',
    tags: ['PHP', 'MySQLi', 'JavaScript', 'DataTables', 'FileReader API', 'Security'],
    highlights: [
      '100% Prepared Statements — zero raw SQL concatenation, eliminating SQL injection',
      'DataTables with server-side pagination, dynamic multi-column sorting, and instant search',
      'Real-time client-side file upload inspection using browser FileReader API prior to server submission',
      'CSRF token validation on every state-changing request, plus Bcrypt password hashing',
    ],
    hasChart: false,
    chartType: 'bar' as const,
    repoUrl: '#',
    liveUrl: '#',
  },
  {
    id: 'admin-dashboard',
    title: 'Modern Responsive Admin Dashboard',
    tagline: 'CSS Variables–driven theming engine with stateful sidebar collapse',
    description:
      'A clean, high-throughput management UI built with pure CSS architecture — no frameworks, just native CSS Custom Properties. The global theme management engine allows instant dark/light switching without page reload. Stateful sidebar collapse remembers user preference in localStorage. Performance-optimized with minimal repaints and zero layout shift on theme change.',
    tags: ['CSS3', 'JavaScript', 'UI/UX', 'CSS Variables', 'Responsive', 'State Management'],
    highlights: [
      'Global theme management engine built on native CSS Custom Properties (var(--...))',
      'Stateful collapsible sidebar with localStorage persistence across sessions',
      'Zero layout shift on theme toggle — no reflow, pure CSS variable swap',
      'Modular CSS architecture with BEM naming and mobile-first responsive breakpoints',
    ],
    hasChart: false,
    chartType: 'bar' as const,
    repoUrl: '#',
    liveUrl: '#',
  },
  {
    id: 'archive-submitter',
    title: 'Archive Submitter',
    tagline: 'Automated archive submission tool',
    description:
      'A tool for automating the submission and management of archive files, handling format conversion, metadata tagging, and repository integration.',
    tags: ['Python', 'Automation', 'File Management'],
    highlights: [
      'Batch processing of archive files (ZIP, TAR, RAR)',
      'Metadata extraction and tagging for each archive',
      'Integration with GitHub releases for automated publishing',
      'Validation of archive integrity before submission',
    ],
    hasChart: false,
    chartType: 'bar' as const,
    repoUrl: 'https://github.com/kayush7/archive-submitter',
    liveUrl: '#',
  },
  {
    id: 'mindpulse',
    title: 'MindPulse',
    tagline: 'Real-time pulse monitoring dashboard',
    description:
      'A real-time monitoring dashboard that visualizes system metrics, alert thresholds, and health indicators with interactive charts and notifications.',
    tags: ['JavaScript', 'Real-time', 'Monitoring'],
    highlights: [
      'Live metric visualization with Chart.js integration',
      'Custom alert thresholds and notification system',
      'Historical trend tracking and reporting',
      'Deployable as a standalone static web app',
    ],
    hasChart: true,
    chartType: 'line' as const,
    repoUrl: 'https://github.com/kayush7/mindpulse',
    liveUrl: '#',
  },
];

export const education = [
  {
    type: 'education',
    title: 'Bachelor of Engineering in Computer Science',
    institution: 'Pillai College of Engineering',
    period: 'Semester VI · Current',
    sgpi: 'SGPI: 7.02 / 10',
    description:
      'Currently in the 6th semester of a 4-year engineering program. Coursework covers Object-Oriented Programming, Database Management Systems, Operating Systems, Web Technologies, and Software Engineering.',
    courses: [
      'Object-Oriented Programming',
      'Database Management Systems',
      'Operating Systems',
      'Web Technologies',
      'Software Engineering',
      'Data Structures & Algorithms',
    ],
  },
];

export const certifications = [
  {
    type: 'certification',
    title: 'The Complete Full-Stack Web Development Bootcamp',
    issuer: 'Udemy',
    year: '2024',
    description:
      'Comprehensive full-stack mastery covering Node.js, React, PostgreSQL, RESTful APIs, Web3, and Decentralized Applications (DApps).',
    skills: ['Node.js', 'React', 'PostgreSQL', 'Web3', 'DApps', 'RESTful APIs'],
  },
  {
    type: 'certification',
    title: 'Java Masterclass',
    issuer: 'Udemy',
    year: '2024',
    description:
      'Deep-dive into Object-Oriented Programming principles, design patterns, and enterprise Java architectures including collections, generics, and concurrency.',
    skills: ['Java', 'OOP', 'Design Patterns', 'Collections', 'Concurrency'],
  },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'AI Terminal', href: '#terminal' },
];