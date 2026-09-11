export const siteConfig = {
  brand: {
    name: 'MANVESH',
    displayName: 'M A N V E S H',
    tagline: '< security researcher />',
    author: 'MANVESH',
  },
  corridor: {
    segmentLength: 60,
    startZ: 10,
    wallColor: '#e8e4df',
    floorColor: '#d4cfc8',
    ceilingColor: '#f0ece6',
  },
  rooms: [
    {
      id: 'projects',
      label: 'PROJECTS',
      side: 'left',
      relativeZ: -15,
      doorColor: '#d4cfc8',
    },
    {
      id: 'arsenal', 
      label: 'ARSENAL',
      side: 'right',
      relativeZ: -25,
      doorColor: '#d4cfc8',
    },
    {
      id: 'about',
      label: 'ABOUT',
      side: 'left', 
      relativeZ: -35,
      doorColor: '#d4cfc8',
    },
    {
      id: 'contact',
      label: 'CONTACT',
      side: 'right',
      relativeZ: -45,
      doorColor: '#d4cfc8',
    },
  ],
  home: {
    title: 'MANVESH',
    tagline: '< security researcher />',
  },
  projects: [
    { title: 'DevOS', desc: 'AI-powered local-first developer workstation', tags: ['TypeScript', 'AI'], url: 'https://github.com/mnvvshu/DevOS' },
    { title: 'Solana Scanner', desc: 'Autonomous alpha scanner with rotating proxy bypass', tags: ['Python', 'Solana'], url: 'https://github.com/mnvvshu/solana-memecoin-scanner' },
    { title: 'LeetSolver', desc: 'Paste any LeetCode question, get ELI5 + clean solution', tags: ['JavaScript', 'AI'], url: 'https://github.com/mnvvshu/leetsolver' },
    { title: 'Quantum Edge Pro', desc: 'Pine Script v6 XAU/USD indicator, 18+ modules', tags: ['Pine Script'], url: 'https://github.com/mnvvshu/quantum-edge-pro' },
    { title: 'PotatoBoost', desc: 'Low-level Windows optimization utility', tags: ['Batch'], url: 'https://github.com/mnvvshu/PotatoBoost' },
    { title: 'Ephemeral Chat', desc: 'Self-destructing zero-database chat rooms', tags: ['HTML', 'WebSocket'], url: 'https://github.com/mnvvshu/ephemeral-chat' },
  ],
  skills: {
    bypass: ['Cloudflare', 'Akamai', 'DataDome', 'PerimeterX', 'Custom WAFs', 'Rate Limits'],
    languages: ['Python', 'TypeScript', 'JavaScript', 'Pine Script', 'Batch'],
    tools: ['Proxy Rotation', 'TLS Spoofing', 'Browser Automation', 'Reverse Engineering'],
  },
}
