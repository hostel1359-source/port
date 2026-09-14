# Manvesh's little space

A pencil-drawn, explorable 3D portfolio built with Next.js, React Three Fiber, Three.js, and GSAP. Open the front door, walk down the corridor, and enter four worlds: a project gallery, a rotating monitor studio, a flight through Manvesh's story, and a seaside contact dock. The scenes use procedural pencil textures and an original illustrated avatar.

## Explore

- Click the front door or **Enter the space** to walk inside.
- Scroll to move along the corridor, fly through the story, or browse the gallery. Drag to look around; in the gallery and studio, drag to browse or rotate.
- Click a corridor door to enter its room. Project cards open their full details, and contact signs open contact information or GitHub, or copy the email address.
- Use the map to choose a room directly, or the bottom arrows to move. W/S and Up/Down also move; A/D and Left/Right look around or browse. Home/End go to the beginning/end of a room.
- Press Escape to close details or the map, then return to the corridor. The top motion toggle and the system's reduced-motion preference control animation.

The keyboard skip link reveals room navigation and text details. A content fallback is available when the 3D view cannot load. Rooms support direct links (`#corridor`, `#work`, `#studio`, `#about`, `#contact`) and browser Back/Forward.

## Run locally

Use Node.js 20 or newer, from this directory:

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Production and checks

```sh
npm run typecheck
npm run lint
npm run build
npm run start
```

Stop the development server before building, since both use `.next`.

## Edit the portfolio

- `src/data/personal.ts`: name, biography, email, and GitHub.
- `src/data/projects.ts`: project descriptions, technology lists, and links.
- `src/data/skills.ts`: tools and skills.
- `src/components/walkthrough/WalkthroughPortfolio.tsx`: navigation, dialogs, motion preference, and browser history.
- `src/components/walkthrough/JourneyScene.tsx`: WebGL canvas, moving camera, and room transitions.
- `src/components/walkthrough/CorridorWorld.tsx`: entrance, corridor, and swinging doors.
- `src/components/walkthrough/InteriorWorlds.tsx`: gallery, studio, story, and contact scenes.
- `src/components/walkthrough/SketchPrimitives.tsx` and `sketch-textures.ts`: outlined geometry, labels, and pencil textures.
- `src/components/walkthrough/useJourneyControls.ts`: scroll, drag, touch, and keyboard controls.
- `src/components/walkthrough/walkthrough.css`: responsive scene controls and room map.
- `src/components/studio/RoomContent.tsx` and `src/app/studio.css`: readable about, project, and contact details.
- `public/sketch-avatar.svg`: original illustrated avatar.
- `src/app/layout.tsx`, `public/robots.txt`, and `public/sitemap.xml`: fonts and metadata for `https://www.manvesh.space`.

Contact opens an email client or copies the address; no form service is required. Fonts are loaded through `next/font`, and the sketch textures are generated locally in the browser.

The root Next.js application serves the portfolio. The existing `c/` directory and older scene components are retained but are not used by the homepage.
