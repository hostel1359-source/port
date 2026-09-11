'use client';

import React, { useRef, useEffect, useState } from 'react';

export default function SharinganEye() {
  const eyeRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  // Blink periodically
  useEffect(() => {
    const blink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    };

    const interval = setInterval(() => {
      blink();
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  // Track mouse for pupil movement
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!eyeRef.current) return;
      const rect = eyeRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / window.innerWidth;
      const dy = (e.clientY - cy) / window.innerHeight;
      setMousePos({ x: dx * 8, y: dy * 8 });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div
      ref={eyeRef}
      style={{
        width: '280px',
        height: '280px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: 'drop-shadow(0 0 30px rgba(200,0,0,0.6)) drop-shadow(0 0 60px rgba(200,0,0,0.3))',
      }}
    >
      {/* Eye shape (almond) */}
      <div style={{
        width: '260px',
        height: '160px',
        borderRadius: '50% / 50%',
        background: 'radial-gradient(ellipse, #1a0000 30%, #0a0000 70%)',
        position: 'relative',
        overflow: 'hidden',
        border: '3px solid #2a0a0a',
        boxShadow: 'inset 0 0 30px rgba(200,0,0,0.3)',
      }}>
        {/* Eyelid (blink) */}
        <div style={{
          position: 'absolute',
          inset: '-5px',
          background: '#1a1210',
          zIndex: 20,
          transition: 'transform 0.12s ease-in-out',
          transform: isBlinking ? 'translateY(0%)' : 'translateY(-100%)',
          borderRadius: '0 0 50% 50%',
        }} />

        {/* Bottom eyelid */}
        <div style={{
          position: 'absolute',
          inset: '-5px',
          background: '#1a1210',
          zIndex: 20,
          transition: 'transform 0.12s ease-in-out',
          transform: isBlinking ? 'translateY(0%)' : 'translateY(100%)',
          borderRadius: '50% 50% 0 0',
        }} />

        {/* Iris */}
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(calc(-50% + ${mousePos.x}px), calc(-50% + ${mousePos.y}px))`,
          transition: 'transform 0.15s ease-out',
          background: 'radial-gradient(circle, #cc0000 0%, #990000 40%, #660000 70%, #330000 100%)',
          boxShadow: '0 0 20px rgba(200,0,0,0.5), inset 0 0 15px rgba(0,0,0,0.5)',
        }}>
          {/* Mangekyo pattern - spinning */}
          <svg
            viewBox="0 0 100 100"
            style={{
              position: 'absolute',
              inset: '10%',
              width: '80%',
              height: '80%',
              animation: 'sharinganSpin 8s linear infinite',
            }}
          >
            {/* Three curved blades of Mangekyo */}
            {[0, 120, 240].map((angle) => (
              <g key={angle} transform={`rotate(${angle} 50 50)`}>
                <path
                  d="M50,50 Q65,20 50,10 Q35,20 50,50"
                  fill="none"
                  stroke="#1a1a1a"
                  strokeWidth="3.5"
                />
                <path
                  d="M50,50 Q65,20 50,10 Q35,20 50,50"
                  fill="#1a0000"
                  opacity="0.7"
                />
                {/* Tomoe dot */}
                <circle cx="50" cy="18" r="4" fill="#1a1a1a" />
              </g>
            ))}
            {/* Inner ring */}
            <circle cx="50" cy="50" r="12" fill="none" stroke="#1a1a1a" strokeWidth="2" />
            <circle cx="50" cy="50" r="8" fill="none" stroke="#1a1a1a" strokeWidth="1.5" opacity="0.6" />
          </svg>

          {/* Pupil */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #000 60%, #1a0000 100%)',
            zIndex: 5,
          }} />

          {/* Light reflection */}
          <div style={{
            position: 'absolute',
            top: '22%',
            left: '62%',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.35)',
            filter: 'blur(1px)',
            zIndex: 10,
          }} />
          <div style={{
            position: 'absolute',
            top: '30%',
            left: '55%',
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            filter: 'blur(0.5px)',
            zIndex: 10,
          }} />
        </div>

        {/* Iris glow pulse */}
        <div style={{
          width: '130px',
          height: '130px',
          borderRadius: '50%',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(calc(-50% + ${mousePos.x}px), calc(-50% + ${mousePos.y}px))`,
          background: 'radial-gradient(circle, rgba(200,0,0,0.3) 0%, transparent 70%)',
          animation: 'sharinganPulse 2s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Eyelid edges */}
      <svg
        viewBox="0 0 260 160"
        style={{
          position: 'absolute',
          width: '260px',
          height: '160px',
          pointerEvents: 'none',
          zIndex: 25,
        }}
      >
        <ellipse cx="130" cy="80" rx="128" ry="78" fill="none" stroke="#2a1a10" strokeWidth="4" />
      </svg>

      <style jsx>{`
        @keyframes sharinganSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes sharinganPulse {
          0%, 100% { opacity: 0.5; transform: translate(calc(-50% + ${mousePos.x}px), calc(-50% + ${mousePos.y}px)) scale(1); }
          50% { opacity: 1; transform: translate(calc(-50% + ${mousePos.x}px), calc(-50% + ${mousePos.y}px)) scale(1.15); }
        }
      `}</style>
    </div>
  );
}
