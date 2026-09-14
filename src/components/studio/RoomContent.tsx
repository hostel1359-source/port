'use client';

import { useState } from 'react';
import { PERSONAL } from '@/data/personal';
import { PROJECTS } from '@/data/projects';
import { SKILLS, SKILL_CATEGORIES, type SkillCategory } from '@/data/skills';

export type Room = 'about' | 'work' | 'contact';

interface RoomContentProps {
  room: Room;
  onNavigate: (room: Room) => void;
  initialProjectIndex?: number;
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h16m-6-6 6 6-6 6'}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProjectArt({ id }: { id: string }) {
  const ink = '#302e28';
  const yellow = '#f1cc55';
  const mint = '#b7c9b1';
  return (
    <div className={`project-art project-art-${id}`}>
      <svg viewBox="0 0 560 250" fill="none" aria-hidden="true">
        <path d="M34 220h492" stroke={ink} strokeOpacity=".17" />
        <circle cx="460" cy="57" r="29" stroke={ink} strokeOpacity=".12" />
        <path d="M65 57v16M57 65h16m427 110v12m-6-6h12" stroke={ink} strokeOpacity=".35" />
        {id === 'devos' && (
          <g stroke={ink} strokeWidth="2" strokeLinejoin="round">
            <path d="m137 206 298-9 14 17-331 6Z" fill={mint} />
            <rect x="128" y="40" width="308" height="164" rx="10" fill="#f8f5e9" />
            <path d="M128 70h308" />
            <circle cx="144" cy="56" r="3" fill={yellow} />
            <circle cx="156" cy="56" r="3" fill={mint} />
            <circle cx="168" cy="56" r="3" fill={ink} />
            <path d="m151 100 8 6-8 6m16 0h13" strokeLinecap="round" />
            <path d="M150 136h109m-109 13h80m-80 13h117" strokeOpacity=".35" strokeLinecap="round" />
            <rect x="292" y="91" width="119" height="90" rx="5" fill={yellow} />
            <path d="m318 126-13 11 13 11m67-22 13 11-13 11m-26-28-13 36" strokeWidth="3" strokeLinecap="round" />
            <path d="m275 213 28-1" strokeOpacity=".5" />
          </g>
        )}
        {id === 'solana-scanner' && (
          <g stroke={ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="261" cy="126" r="90" fill="#f8f5e9" />
            <circle cx="261" cy="126" r="66" strokeOpacity=".25" />
            <circle cx="261" cy="126" r="40" strokeOpacity=".25" />
            <path d="M171 126h180M261 36v180" strokeOpacity=".2" />
            <path d="M261 126V36a90 90 0 0 1 79 47Z" fill={mint} fillOpacity=".8" stroke="none" />
            <path d="m261 126 79-43" />
            <circle cx="296" cy="99" r="6" fill={yellow} />
            <circle cx="224" cy="154" r="4" fill={ink} />
            <circle cx="283" cy="180" r="4" fill={yellow} />
            <rect x="366" y="104" width="81" height="53" rx="6" fill={yellow} />
            <path d="M380 143v-13m12 13v-23m12 23v-17m12 17v-29m12 29v-35" strokeWidth="4" />
            <path d="m297 100 43-25h50" strokeDasharray="3 6" strokeOpacity=".5" />
            <circle cx="395" cy="75" r="4" fill={mint} />
          </g>
        )}
        {id === 'potato-boost' && (
          <g stroke={ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M163 189a117 117 0 1 1 234 0Z" fill="#f8f5e9" />
            <path d="M188 179a92 92 0 0 1 184 0" stroke={mint} strokeWidth="20" />
            <path d="M315 94a92 92 0 0 1 57 85" stroke={yellow} strokeWidth="20" />
            <path d="m195 148 9 3m25-47 6 8m45-30v11m51 10-6 9m40 36-10 3" />
            <path d="m280 177 59-41" strokeWidth="4" />
            <circle cx="280" cy="177" r="8" fill={ink} />
            <path d="m273 88-27 41h23l-8 30 32-43h-23l11-28Z" fill={yellow} />
            <path d="M191 210h177m-201-69-20-7m254 7 20-7M191 66l-14-14m191 14 14-14" strokeOpacity=".4" />
          </g>
        )}
        {id === 'ephemeral-chat' && (
          <g stroke={ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M162 56h171a13 13 0 0 1 13 13v83a13 13 0 0 1-13 13h-119l-33 28v-28h-19a13 13 0 0 1-13-13V69a13 13 0 0 1 13-13Z" fill={mint} />
            <path d="M183 87h117m-117 16h86m-86 16h105" strokeOpacity=".45" />
            <path d="M297 120h91a10 10 0 0 1 10 10v49a10 10 0 0 1-10 10h-10v22l-28-22h-53a10 10 0 0 1-10-10v-49a10 10 0 0 1 10-10Z" fill={yellow} />
            <circle cx="316" cy="155" r="3" fill={ink} />
            <circle cx="338" cy="155" r="3" fill={ink} />
            <circle cx="360" cy="155" r="3" fill={ink} fillOpacity=".3" strokeOpacity=".3" />
            <rect x="374" y="84" width="8" height="8" fill={yellow} strokeOpacity=".4" />
            <rect x="398" y="66" width="6" height="6" fill={mint} strokeOpacity=".3" />
            <rect x="418" y="96" width="4" height="4" fill={ink} stroke="none" opacity=".25" />
            <path d="M122 100h-17m19 31h-9m278-18h17" strokeOpacity=".35" />
          </g>
        )}
      </svg>
    </div>
  );
}

function AboutRoom({ onNavigate }: Pick<RoomContentProps, 'onNavigate'>) {
  return (
    <>
      <header className="room-heading">
        <p className="room-eyebrow">ROOM 01 / THE PERSON</p>
        <h2 id="room-title" tabIndex={-1}>Curiosity is the starting point.</h2>
        <p className="room-intro">A little about the person behind the keyboard.</p>
      </header>
      <div className="room-profile">
        <div className="room-monogram" aria-hidden="true">M<span>✳</span></div>
        <div>
          <h3>Hey, I’m {PERSONAL.name}.</h3>
          <p>I’m a developer who likes to take an idea apart, figure out how it works, and build something useful from it. My projects span AI tools, on-chain analytics, and making computers run a little better.</p>
          <p className="room-personality">Usually found turning “what if” into a working prototype.</p>
        </div>
      </div>
      <section className="room-section" aria-labelledby="room-interests-title">
        <h3 id="room-interests-title" className="room-section-heading">Things that keep me curious</h3>
        <ul className="room-interests">
          {PERSONAL.interests.map((interest) => <li key={interest}><span aria-hidden="true">↗</span>{interest}</li>)}
        </ul>
      </section>
      <section className="room-section" aria-labelledby="room-tools-title">
        <h3 id="room-tools-title" className="room-section-heading">My everyday building blocks</h3>
        <div className="room-tool-groups">
          {(Object.keys(SKILL_CATEGORIES) as SkillCategory[]).map((category) => (
            <div className="room-tool-group" key={category}>
              <h4>{SKILL_CATEGORIES[category].label}</h4>
              <ul className="room-tags">
                {SKILLS.filter((skill) => skill.category === category).map((skill) => <li key={skill.name}>{skill.name}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <button className="room-button" type="button" onClick={() => onNavigate('work')}>Take a look at my work <Arrow /></button>
    </>
  );
}

function WorkRoom({ initialProjectIndex = 0 }: { initialProjectIndex?: number }) {
  const [selectedId, setSelectedId] = useState(PROJECTS[initialProjectIndex]?.id || 'devos');
  const project = PROJECTS.find((item) => item.id === selectedId) ?? PROJECTS[0];
  const projectNumber = String(PROJECTS.indexOf(project) + 1).padStart(2, '0');

  return (
    <>
      <header className="room-heading">
        <p className="room-eyebrow">ROOM 02 / THE WORKSHOP</p>
        <h2 id="room-title" tabIndex={-1}>Things I’ve put into the world.</h2>
        <p className="room-intro">Small experiments. Deep rabbit holes. Working software. Pick a project and look around.</p>
      </header>
      <div className="project-picker" role="group" aria-label="Choose a project">
        {PROJECTS.map((item, index) => (
          <button
            key={item.id}
            className="project-tab"
            type="button"
            aria-pressed={item.id === project.id}
            aria-controls="project-detail"
            onClick={() => setSelectedId(item.id)}
          >
            <span className="project-tab-index">{String(index + 1).padStart(2, '0')}</span>
            <span>{item.title}</span>
            <Arrow />
          </button>
        ))}
      </div>
      <article className="project-detail" id="project-detail" aria-labelledby="project-title">
        <ProjectArt id={project.id} />
        <div className="project-detail-body">
          <div className="project-detail-header">
            <div><p className="project-index">PROJECT {projectNumber} / {String(PROJECTS.length).padStart(2, '0')}</p><h3 id="project-title">{project.title}</h3></div>
            <span className="project-detail-mark" aria-hidden="true">↗</span>
          </div>
          <p className="project-description">{project.description}</p>
          <p className="project-long-description">{project.longDescription}</p>
          <ul className="project-technologies" aria-label="Built with">
            {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
          <div className="project-actions">
            <a className="room-text-link" href={project.githubUrl} target="_blank" rel="noreferrer">EXPLORE THE CODE <Arrow diagonal /></a>
            {project.liveUrl && <a className="room-text-link" href={project.liveUrl} target="_blank" rel="noreferrer">VISIT PROJECT <Arrow diagonal /></a>}
          </div>
        </div>
      </article>
      <p className="room-footnote">More experiments live on <a href={PERSONAL.github} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>.</p>
    </>
  );
}

function ContactRoom() {
  const [copyState, setCopyState] = useState<'idle' | 'copying' | 'copied' | 'failed'>('idle');

  async function copyEmail() {
    setCopyState('copying');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(PERSONAL.email);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
  }

  return (
    <>
      <header className="room-heading">
        <p className="room-eyebrow">ROOM 03 / SAY HELLO</p>
        <h2 id="room-title" tabIndex={-1}>Good things start with a hello.</h2>
        <p className="room-intro">An idea, a collaboration, or a particularly interesting rabbit hole. I’d love to hear about it.</p>
      </header>
      <div className="room-contact-card">
        <svg className="room-envelope" width="108" height="86" viewBox="0 0 108 86" fill="none" aria-hidden="true">
          <path d="m12 24 69-12 14 55-69 12Z" fill="#b7c9b1" stroke="#302e28" strokeWidth="2" />
          <rect x="9" y="15" width="82" height="55" rx="3" fill="#f1cc55" stroke="#302e28" strokeWidth="2" />
          <path d="m10 17 40 29 40-29M10 69l29-28m51 28L61 41" stroke="#302e28" strokeWidth="2" strokeLinejoin="round" />
          <path d="M97 7v10m-5-5h10" stroke="#302e28" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <p className="room-eyebrow">STRAIGHT TO MY INBOX</p>
        <a className="room-email" style={{ userSelect: 'all' }} href={`mailto:${PERSONAL.email}`}>{PERSONAL.email}</a>
        <div className="room-contact-actions">
          <a className="room-button" href={`mailto:${PERSONAL.email}`}>Write me a note <Arrow diagonal /></a>
          <button className="room-button room-button-secondary" type="button" onClick={copyEmail} disabled={copyState === 'copying'}>
            {copyState === 'copying' ? 'Copying…' : copyState === 'copied' ? 'Email copied ✓' : 'Copy email'}
          </button>
        </div>
        <p className="room-copy-feedback" role="status" aria-live="polite">
          {copyState === 'copied' ? 'Copied to your clipboard. See you in my inbox.' : copyState === 'failed' ? 'Copy unavailable. Select the email address above to copy it manually.' : '\u00a0'}
        </p>
      </div>
      <a className="room-social-link" href={PERSONAL.github} target="_blank" rel="noreferrer">
        <span><span className="room-eyebrow">ELSEWHERE ON THE INTERNET</span><strong>GitHub <span>@{PERSONAL.username}</span></strong></span>
        <Arrow diagonal />
      </a>
      <p className="room-footnote">{PERSONAL.cta}</p>
    </>
  );
}

export default function RoomContent({ room, onNavigate, initialProjectIndex }: RoomContentProps) {
  if (room === 'about') return <AboutRoom onNavigate={onNavigate} />;
  if (room === 'work') return <WorkRoom initialProjectIndex={initialProjectIndex} />;
  return <ContactRoom />;
}
