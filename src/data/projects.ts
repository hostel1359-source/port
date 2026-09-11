export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  accentColor: string;
  icon: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'devos',
    title: 'DevOS',
    description: 'AI-powered developer operating system',
    longDescription:
      'Local-first autonomous developer workstation. TypeScript monorepo with 13 packages, ReAct agent loop, 3-tier security gates, AST/git integration, and a React 19 UI. Not a chatbot — a full OS for code.',
    technologies: ['TypeScript', 'React 19', 'Fastify', 'Electron', 'WebSocket', 'Zod'],
    githubUrl: 'https://github.com/mnvvshu/DevOS',
    accentColor: '#4f9cf5',
    icon: '⚡',
  },
  {
    id: 'solana-scanner',
    title: 'Solana Memecoin Scanner',
    description: 'Autonomous on-chain alpha intelligence',
    longDescription:
      'Institutional-grade memecoin screener with 7-factor scoring engine, automated scam filtering, self-healing proxy rotation, and real-time Telegram signal dispatch with one-click execution.',
    technologies: ['Python', 'Solana RPC', 'DexScreener API', 'Telegram Bot', 'Axiom'],
    githubUrl: 'https://github.com/mnvvshu/solana-memecoin-scanner',
    accentColor: '#38bdf8',
    icon: '🔍',
  },
  {
    id: 'potato-boost',
    title: 'PotatoBoost',
    description: 'Low-level Windows performance optimizer',
    longDescription:
      'Windows Batch automation utility built to minimize system latencies, optimize thread scheduling, and strip background telemetry for legacy or low-spec machines. Deep OS-level tuning for maximum performance.',
    technologies: ['Batch', 'Windows API', 'PowerShell', 'Registry', 'Task Scheduler'],
    githubUrl: 'https://github.com/mnvvshu/PotatoBoost',
    accentColor: '#8b5cf6',
    icon: '⚡',
  },
  {
    id: 'ephemeral-chat',
    title: 'Ephemeral Chat',
    description: 'Self-destructing encrypted chat rooms',
    longDescription:
      'Database-free one-to-one chat rooms that self-destruct after 60 minutes. Zero persistence, in-memory only, real-time WebSocket communication. Every trace permanently wiped.',
    technologies: ['HTML5', 'JavaScript', 'WebSocket', 'Node.js', 'Encryption'],
    githubUrl: 'https://github.com/mnvvshu/ephemeral-chat',
    accentColor: '#ef4444',
    icon: '💬',
  },
];
