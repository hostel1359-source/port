export interface Skill {
  name: string;
  category: SkillCategory;
  level: number; // 0-1 proficiency indicator
  orbitRadius: number;
  orbitSpeed: number;
  orbitOffset: number;
  color: string;
}

export type SkillCategory =
  | 'languages'
  | 'frameworks'
  | 'ai-ml'
  | 'blockchain'
  | 'tools';

export const SKILL_CATEGORIES: Record<SkillCategory, { label: string; color: string }> = {
  languages: { label: 'Languages', color: '#4f9cf5' },
  frameworks: { label: 'Frameworks & Runtime', color: '#8b5cf6' },
  'ai-ml': { label: 'AI & Machine Learning', color: '#38bdf8' },
  blockchain: { label: 'Blockchain & Finance', color: '#f59e0b' },
  tools: { label: 'DevOps & Tools', color: '#10b981' },
};

export const SKILLS: Skill[] = [
  // Languages
  { name: 'Python', category: 'languages', level: 0.95, orbitRadius: 2.5, orbitSpeed: 0.3, orbitOffset: 0, color: '#4f9cf5' },
  { name: 'TypeScript', category: 'languages', level: 0.9, orbitRadius: 2.5, orbitSpeed: 0.3, orbitOffset: 1.2, color: '#4f9cf5' },
  { name: 'JavaScript', category: 'languages', level: 0.9, orbitRadius: 2.5, orbitSpeed: 0.3, orbitOffset: 2.4, color: '#4f9cf5' },
  { name: 'Go', category: 'languages', level: 0.6, orbitRadius: 2.5, orbitSpeed: 0.3, orbitOffset: 3.6, color: '#4f9cf5' },
  { name: 'Bash', category: 'languages', level: 0.8, orbitRadius: 2.5, orbitSpeed: 0.3, orbitOffset: 4.8, color: '#4f9cf5' },
  { name: 'C#', category: 'languages', level: 0.5, orbitRadius: 2.5, orbitSpeed: 0.3, orbitOffset: 5.4, color: '#4f9cf5' },
  { name: 'Java', category: 'languages', level: 0.5, orbitRadius: 2.5, orbitSpeed: 0.3, orbitOffset: 5.8, color: '#4f9cf5' },

  // Frameworks
  { name: 'React', category: 'frameworks', level: 0.9, orbitRadius: 3.5, orbitSpeed: 0.2, orbitOffset: 0.5, color: '#8b5cf6' },
  { name: 'Next.js', category: 'frameworks', level: 0.85, orbitRadius: 3.5, orbitSpeed: 0.2, orbitOffset: 1.8, color: '#8b5cf6' },
  { name: 'Node.js', category: 'frameworks', level: 0.85, orbitRadius: 3.5, orbitSpeed: 0.2, orbitOffset: 3.0, color: '#8b5cf6' },
  { name: 'Flask', category: 'frameworks', level: 0.75, orbitRadius: 3.5, orbitSpeed: 0.2, orbitOffset: 4.2, color: '#8b5cf6' },
  { name: 'Electron', category: 'frameworks', level: 0.7, orbitRadius: 3.5, orbitSpeed: 0.2, orbitOffset: 5.5, color: '#8b5cf6' },

  // AI/ML
  { name: 'OpenAI API', category: 'ai-ml', level: 0.85, orbitRadius: 4.5, orbitSpeed: 0.15, orbitOffset: 0.3, color: '#38bdf8' },
  { name: 'Gemini API', category: 'ai-ml', level: 0.8, orbitRadius: 4.5, orbitSpeed: 0.15, orbitOffset: 1.8, color: '#38bdf8' },
  { name: 'Ollama', category: 'ai-ml', level: 0.7, orbitRadius: 4.5, orbitSpeed: 0.15, orbitOffset: 3.3, color: '#38bdf8' },
  { name: 'Prompt Eng.', category: 'ai-ml', level: 0.9, orbitRadius: 4.5, orbitSpeed: 0.15, orbitOffset: 4.8, color: '#38bdf8' },

  // Blockchain
  { name: 'Solana', category: 'blockchain', level: 0.75, orbitRadius: 5.5, orbitSpeed: 0.1, orbitOffset: 0, color: '#f59e0b' },
  { name: 'Pine Script', category: 'blockchain', level: 0.85, orbitRadius: 5.5, orbitSpeed: 0.1, orbitOffset: 2.1, color: '#f59e0b' },
  { name: 'DeFi', category: 'blockchain', level: 0.7, orbitRadius: 5.5, orbitSpeed: 0.1, orbitOffset: 4.2, color: '#f59e0b' },

  // Tools
  { name: 'Git', category: 'tools', level: 0.9, orbitRadius: 6.5, orbitSpeed: 0.08, orbitOffset: 0.7, color: '#10b981' },
  { name: 'Docker', category: 'tools', level: 0.65, orbitRadius: 6.5, orbitSpeed: 0.08, orbitOffset: 2.8, color: '#10b981' },
  { name: 'WebSocket', category: 'tools', level: 0.8, orbitRadius: 6.5, orbitSpeed: 0.08, orbitOffset: 4.9, color: '#10b981' },
];
