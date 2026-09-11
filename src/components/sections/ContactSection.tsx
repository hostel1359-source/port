'use client';

// Contact section is now handled by the 3D ContactWall component
// This empty section just provides the scroll space for that section
export default function ContactSection() {
  return (
    <section id="contact" className="min-h-screen relative w-full pointer-events-none" />
  );
}
