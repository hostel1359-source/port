'use client';
import { PERSONAL } from '@/data/personal';
import { PROJECTS } from '@/data/projects';
import { SKILLS, SKILL_CATEGORIES } from '@/data/skills';

export default function WebGLFallback() {
  return (
    <div className="min-h-screen bg-void text-white font-sans selection:bg-accent-blue/30 overflow-x-hidden">
      <main className="max-w-5xl mx-auto px-6 py-24 space-y-32">
        {/* Hero */}
        <section className="min-h-[70vh] flex flex-col justify-center items-start">
          <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-violet">
            {PERSONAL.name}
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-muted font-light max-w-2xl">
            {PERSONAL.tagline}
          </p>
          <p className="mt-8 font-mono text-sm text-accent-blue uppercase tracking-widest">
            {PERSONAL.motto}
          </p>
        </section>

        {/* About */}
        <section>
          <h2 className="font-mono text-sm text-accent-blue uppercase tracking-widest mb-8">About</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <p className="text-lg text-white/80 leading-relaxed font-light">
              {PERSONAL.bio}
            </p>
            <div>
              <h3 className="font-mono text-sm text-muted uppercase tracking-widest mb-4">Interests</h3>
              <ul className="space-y-2">
                {PERSONAL.interests.map((interest, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/70">
                    <span className="w-1.5 h-1.5 bg-accent-blue rounded-full" />
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="font-mono text-sm text-accent-blue uppercase tracking-widest mb-8">Selected Works</h2>
          <div className="grid gap-8">
            {PROJECTS.map((project, i) => (
              <div key={project.id} className="p-8 bg-void-surface border border-white/5 rounded-xl hover:border-accent-blue/30 transition-colors">
                <div className="font-mono text-xs text-muted mb-4">{(i + 1).toString().padStart(2, '0')}</div>
                <h3 className="text-3xl font-display font-bold mb-4">{project.title}</h3>
                <p className="text-white/70 mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map(tech => (
                    <span key={tech} className="px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-white/80">
                      {tech}
                    </span>
                  ))}
                </div>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center font-mono text-sm text-accent-blue hover:text-white transition-colors">
                  VIEW SOURCE ↗
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="font-mono text-sm text-accent-blue uppercase tracking-widest mb-8">Technologies</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {Object.entries(SKILL_CATEGORIES).map(([key, label]) => {
              const categorySkills = SKILLS.filter(s => s.category === key);
              if (categorySkills.length === 0) return null;
              return (
                <div key={key}>
                  <h3 className="font-mono text-sm text-muted uppercase tracking-widest mb-4">{label.label}</h3>
                  <ul className="space-y-3">
                    {categorySkills.map(skill => (
                      <li key={skill.name} className="flex items-center justify-between text-white/80">
                        <span>{skill.name}</span>
                        <span className="text-xs font-mono text-white/30">{skill.level}/10</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact */}
        <section className="py-24 flex flex-col items-center text-center border-t border-white/5">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-12">{PERSONAL.cta}</h2>
          <div className="flex gap-6">
            <a href={`mailto:${PERSONAL.email}`} className="px-8 py-4 border border-accent-blue/30 hover:bg-accent-blue/10 font-mono text-sm uppercase tracking-wide transition-colors">
              Email Me
            </a>
            <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-transparent text-muted hover:text-accent-blue font-mono text-sm uppercase tracking-wide transition-colors">
              GitHub
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
