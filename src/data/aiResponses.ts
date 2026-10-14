// Pre-baked AI responses for the Aayush-Bot terminal
// Each entry matches a preset prompt or keyword trigger

export interface AiResponse {
  prompt: string;
  keywords: string[];
  response: string;
  links?: string[];
}

export const aiResponses: AiResponse[] = [
  {
    prompt: "What is Aayush's experience with Gemini & Groq?",
    keywords: ["gemini", "groq", "llama", "experience", "llm"],
    response:
      "Aayush has hands-on production experience integrating **Google Gemini API** and **Groq LLaMA** into a real campus application — the AI-Based Smart Room Booking System.\n\n" +
      "**Gemini API**: Used for entity extraction and natural language understanding. The model parses freeform queries and extracts structured slots, e.g., `{ room_type: \"lab\", capacity: 40, facilities: [\"ac\", \"projector\"], time: \"14:00\" }`.\n\n" +
      "**Groq LLaMA**: Handles response synthesis — once the backend returns available rooms, Groq generates a natural, human-readable summary explaining *why* each room was recommended.\n\n" +
      "Both are called via REST APIs (Python `requests`) from the Flask backend. Aayush implements retry logic, token budgeting, and graceful fallback when either API is unavailable.",
    links: ["#projects"],
  },
  {
    prompt: "Explain the snapshot design pattern in his booking system.",
    keywords: ["snapshot", "design pattern", "audit", "data integrity", "booking system"],
    response:
      "The **Snapshot Design Pattern** in the Room Booking System freezes the state of room facility attributes at the exact moment a booking is made.\n\n" +
      "**Why it matters**: Rooms get updated (renovations, capacity changes, new equipment). If a user books a room based on today's facilities and the room is downgraded tomorrow, you need an audit trail of *what was actually available when the booking was made*.\n\n" +
      "**Implementation**:\n" +
      "```\n" +
      "class RoomSnapshot:\n" +
      "    room_id: int\n" +
      "    facilities: dict          # frozen copy at booking time\n" +
      "    capacity_snapshot: int\n" +
      "    booked_at: timestamp\n" +
      "    booked_by: str\n" +
      "```\n\n" +
      "Instead of just storing `room_id` in the booking record, the system stores a full serialized snapshot of the room's state. Future queries against `bookings` always reflect what the user *saw and agreed to*, not a modified room record.\n\n" +
      "This pattern is critical for dispute resolution, billing accuracy, and compliance audits on campus infrastructure platforms.",
    links: ["#projects"],
  },
  {
    prompt: "Show me his backend & database skills.",
    keywords: ["backend", "database", "skills", "db", "server"],
    response:
      "Aayush's backend stack spans **Python Flask**, **Node.js (Express)**, and **PHP (PDO/MySQLi)**:\n\n" +
      "**Python Flask** — his go-to for AI-integrated projects. Handles routing, request parsing, and orchestrates calls to Gemini/Groq APIs. Jinja2 templates for server-rendered pages.\n\n" +
      "**Node.js / Express** — REST API development with middleware chains, JWT-ready auth patterns, and MongoDB/PostgreSQL integration.\n\n" +
      "**PHP (PDO)** — used in his secure CRUD project. Every query is a prepared statement. No raw string concatenation ever touches SQL.\n\n" +
      "**Databases**: SQLite (embedded, portable), MySQL (relational production), PostgreSQL (advanced queries, constraints). He understands indexing, foreign keys, joins, aggregations, and transaction isolation levels.\n\n" +
      "**Key principle**: Data integrity first. Snapshot patterns, foreign key constraints, and atomic transactions are non-negotiable in his designs.",
    links: ["#skills"],
  },
  {
    prompt: "Why should we hire Aayush for an internship or full-time role?",
    keywords: ["hire", "why", "reasons", "internship", "full-time", "full stack", "benefits"],
    response:
      "**5 reasons to bring Aayush on board:**\n\n" +
      "**1. Applied AI in production code**: Most junior developers have completed tutorials. Aayush has shipped a system that calls two different LLM APIs (Gemini + Groq) in a single user flow, handles token budgets, retries on failure, and degrades gracefully. That's a real-world AI integration pattern.\n\n" +
      "**2. Security-first mindset**: His CRUD project doesn't just *claim* to be secure — it has 100% prepared statements, CSRF tokens on every mutation, and Bcrypt hashing. He understands *why* each layer exists.\n\n" +
      "**3. Full-stack fluency**: From database schema design → REST API → React frontend → Chart.js telemetry dashboard. He can own a feature end-to-end.\n\n" +
      "**4. Engineering fundamentals**: Solid OOP knowledge (Java masterclass certified), data structures, DBMS, and OS concepts — not just framework magic.\n\n" +
      "**5. Proactive learner**: Udemy full-stack bootcamp + Java masterclass + self-taught NLP integration = someone who upskills without being asked.\n\n" +
      "**Bottom line**: He's a Semester VI student who has already solved the \"connect AI to a real product\" problem. That's rare at this stage.",
    links: ["#projects", "#skills", "#education"],
  },
  {
    prompt: "What projects has Aayush built?",
    keywords: ["projects", "built", "work", "portfolio", "show"],
    response:
      "Three featured projects, each showcasing a different dimension of full-stack engineering:\n\n" +
      "**1. AI-Based Smart Room Booking System** (Python Flask + Gemini + Groq)\n" +
      "Conversational NLP interface for campus room discovery. Natural language → structured intent → ranked results. Includes Chart.js telemetry dashboard for admins tracking room utilization.\n\n" +
      "**2. Advanced CRUD & Secure Record System** (PHP + MySQLi + DataTables)\n" +
      "Enterprise record management with defense-in-depth security: prepared statements, CSRF protection, Bcrypt hashing, and FileReader pre-upload validation. DataTables with server-side pagination handling 10,000+ records.\n\n" +
      "**3. Responsive Admin Dashboard** (CSS3 + JavaScript)\n" +
      "No framework — pure CSS Custom Properties architecture. Global theming, stateful sidebar collapse with localStorage, zero layout shift on theme toggle. Cross-browser performance optimized.\n\n" +
      "All three projects are on GitHub with README documentation covering architecture decisions, setup instructions, and design rationale.",
    links: ["#projects"],
  },
  {
    prompt: "Tell me about his education.",
    keywords: ["education", "college", "degree", "semester", "pillai", "university"],
    response:
      "Aayush is currently in **Semester VI** of a 4-year **Bachelor of Engineering in Computer Science** at **Pillai College of Engineering**.\n\n" +
      "**Academic standing**: SGPI 7.02 / 10\n\n" +
      "**Relevant coursework**: Object-Oriented Programming, Database Management Systems, Operating Systems, Web Technologies, Software Engineering, Data Structures & Algorithms.\n\n" +
      "He supplements formal education with active self-study — completing two comprehensive Udemy certifications (Full-Stack Bootcamp + Java Masterclass) covering technologies not yet taught in college, like React, Node.js, PostgreSQL, and Web3.\n\n" +
      "The combination of a structured engineering curriculum + demonstrated self-directed learning makes him well-prepared for real-world software engineering challenges.",
    links: ["#education"],
  },
  {
    prompt: "What is his TypeScript or React experience?",
    keywords: ["react", "typescript", "frontend", "hooks", "component"],
    response:
      "Aayush has hands-on React experience with modern patterns:\n\n" +
      "**Core React**: Functional components, React Hooks (useState, useEffect, useRef, custom hooks), prop typing with TypeScript interfaces, conditional rendering, and list mapping.\n\n" +
      "**TypeScript**: Strong understanding of generic types, interfaces, union types, and type narrowing. Uses `as` casting sparingly and prefers explicit type annotations.\n\n" +
      "**State management**: Context API for global state (theme, auth state), local useState for component-level state, and custom hooks for reusable logic.\n\n" +
      "**Build tooling**: Vite for fast HMR during development, Tailwind CSS for utility-first styling, and Framer Motion for declarative animations.\n\n" +
      "**Component patterns**: Container/presentational split, custom hooks for data fetching, and optimistic UI updates for form submissions.\n\n" +
      "This portfolio *itself* is built with React 18 + TypeScript + Vite + Tailwind + Framer Motion — so the evidence is right here!",
    links: ["#skills"],
  },
  {
    prompt: "Is Aayush available for opportunities?",
    keywords: ["available", "hiring", "opportunity", "contact", "hire", "open"],
    response:
      "**Yes — Aayush is actively seeking opportunities.**\n\n" +
      "He is currently in Semester VI, giving him availability for internships, part-time roles, and full-time positions starting mid-2026.\n\n" +
      "**What he is looking for**:\n" +
      "- AI/ML integration roles (Gemini, Groq, or similar LLM platforms)\n" +
      "- Full-stack development (React + Node.js/Python Flask)\n" +
      "- Backend engineering (Python, PHP, or Node.js with secure DB practices)\n" +
      "- Any role where he can work on production systems at the intersection of AI and web development\n\n" +
      "**How to reach him**:\n" +
      "- Email: aayushkadam695@gmail.com\n" +
      "- LinkedIn: linkedin.com/in/aayushkadam\n" +
      "- GitHub: github.com/aayushkadam\n\n" +
      "The green status pill at the top of this page reflects his real-time availability. Drop him a message — he responds within 24 hours.",
    links: ["#contact"],
  },
];

export const presetPrompts = [
  "What is Aayush's experience with Gemini & Groq?",
  "Explain the snapshot design pattern in his booking system.",
  "Show me his backend & database skills.",
  "Why should we hire Aayush for an internship or full-time role?",
  "What projects has Aayush built?",
  "Tell me about his education.",
  "Is Aayush available for opportunities?",
];
