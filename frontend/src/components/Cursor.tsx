// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import './css/Cursor.css';

// const Cursor = () => {
//   const dotRef = useRef<HTMLDivElement>(null);
//   const ringRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const dot = dotRef.current!;
//     const ring = ringRef.current!;
//     let mouseX = 0, mouseY = 0;
//     let ringX = 0, ringY = 0;
//     let raf: number;

//     const onMove = (e: MouseEvent) => {
//       mouseX = e.clientX;
//       mouseY = e.clientY;
//       gsap.to(dot, { x: mouseX - 4, y: mouseY - 4, duration: 0.05 });
//     };

//     const loop = () => {
//       ringX += (mouseX - ringX - 18) * 0.12;
//       ringY += (mouseY - ringY - 18) * 0.12;
//       gsap.set(ring, { x: ringX, y: ringY });
//       raf = requestAnimationFrame(loop);
//     };

//     const onHoverIn = () => {
//       gsap.to(ring, { width: 56, height: 56, borderColor: 'rgba(242,240,235,0.9)', duration: 0.3, ease: 'power2.out' });
//       gsap.to(dot, { scale: 0, duration: 0.2 });
//     };
//     const onHoverOut = () => {
//       gsap.to(ring, { width: 36, height: 36, borderColor: 'rgba(242,240,235,0.35)', duration: 0.3, ease: 'power2.out' });
//       gsap.to(dot, { scale: 1, duration: 0.2 });
//     };

//     const interactives = document.querySelectorAll('a, button, [data-cursor]');
//     interactives.forEach(el => {
//       el.addEventListener('mouseenter', onHoverIn);
//       el.addEventListener('mouseleave', onHoverOut);
//     });

//     window.addEventListener('mousemove', onMove);
//     loop();

//     return () => {
//       window.removeEventListener('mousemove', onMove);
//       cancelAnimationFrame(raf);
//       interactives.forEach(el => {
//         el.removeEventListener('mouseenter', onHoverIn);
//         el.removeEventListener('mouseleave', onHoverOut);
//       });
//     };
//   }, []);

//   return (
//     <>
//       <div ref={dotRef} className="cursor-dot" />
//       <div ref={ringRef} className="cursor-ring" />
//     </>
//   );
// };

// export default Cursor;

"use client";

import { useEffect, useRef, useState } from "react";

interface Trail {
  id: number;
  x: number;
  y: number;
  opacity: number;
}

export default function Cursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [trail, setTrail] = useState<Trail[]>([]);
  const [clicking, setClicking] = useState(false);
  const [hidden, setHidden] = useState(false);
  const trailIdRef = useRef(0);

  useEffect(() => {
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = "";
    };
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setPos({ x, y });

      const id = trailIdRef.current++;
      setTrail((prev) => [
        ...prev.slice(-14),
        { id, x, y, opacity: 1 },
      ]);
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const leave = () => setHidden(true);
    const enter = () => setHidden(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, []);

  useEffect(() => {
    const tick = setInterval(() => {
      setTrail((prev) =>
        prev
          .map((t) => ({ ...t, opacity: t.opacity - 0.08 }))
          .filter((t) => t.opacity > 0)
      );
    }, 30);
    return () => clearInterval(tick);
  }, []);

  if (hidden) return null;

  return (
    <>
      <style>{`
        * { cursor: none !important; }

        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        @keyframes pixelPop {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.6); }
          100% { transform: scale(1); }
        }

        .retro-cursor-root {
          pointer-events: none;
          position: fixed;
          inset: 0;
          z-index: 99999;
          overflow: hidden;
        }

        /* CRT scanline sweep */
        .scanline {
          position: absolute;
          left: 0; right: 0;
          height: 3px;
          background: rgba(255, 255, 255, 0.05);
          animation: scanline 4s linear infinite;
          mix-blend-mode: overlay;
        }

        /* Trail dots */
        .trail-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          image-rendering: pixelated;
          transform: translate(-50%, -50%);
        }

        /* Main cursor */
        .cursor-main {
          position: absolute;
          transform: translate(-2px, -2px);
          transition: transform 0.05s linear;
          image-rendering: pixelated;
        }

        .cursor-main.clicking {
          animation: pixelPop 0.18s steps(2) forwards;
        }

        /* Click ripple rings */
        .click-ring {
          position: absolute;
          border: 2px solid #ffffff;
          border-radius: 1px;
          transform: translate(-50%, -50%) scale(0);
          animation: ringOut 0.45s steps(4) forwards;
        }

        @keyframes ringOut {
          0%   { transform: translate(-50%,-50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(3); opacity: 0; }
        }

      `}</style>

      <div className="retro-cursor-root" aria-hidden="true">
        <div className="scanline" />

        {trail.map((t, i) => {
          const size = 4 + i * 0.6;
          return (
            <svg
              key={t.id}
              className="trail-dot"
              style={{
                left: t.x,
                top: t.y,
                opacity: t.opacity * 0.7,
                width: size,
                height: size,
              }}
              viewBox="0 0 4 4"
            >
              <rect x="0" y="0" width="4" height="4" fill="#ffffff" />
            </svg>
          );
        })}

        {/* Click ripple */}
        {clicking && (
          <div
            className="click-ring"
            style={{ left: pos.x, top: pos.y, width: 20, height: 20 }}
          />
        )}

        <svg
          className={`cursor-main${clicking ? " clicking" : ""}`}
          style={{ left: pos.x, top: pos.y }}
          width="20"
          height="24"
          viewBox="0 0 10 12"
          fill="none"
        >
          <rect x="0" y="0" width="2" height="2" fill="#ffffff" />
          <rect x="0" y="2" width="2" height="2" fill="#ffffff" />
          <rect x="2" y="2" width="2" height="2" fill="#ffffff" />
          <rect x="0" y="4" width="2" height="2" fill="#ffffff" />
          <rect x="2" y="4" width="2" height="2" fill="#ffffff" />
          <rect x="4" y="4" width="2" height="2" fill="#ffffff" />
          <rect x="0" y="6" width="2" height="2" fill="#ffffff" />
          <rect x="2" y="6" width="2" height="2" fill="#ffffff" />
          <rect x="4" y="6" width="2" height="2" fill="#ffffff" />
          <rect x="6" y="6" width="2" height="2" fill="#ffffff" />
          <rect x="0" y="8" width="2" height="2" fill="#ffffff" />
          <rect x="4" y="8" width="2" height="2" fill="#ffffff" />
          <rect x="6" y="8" width="2" height="2" fill="#ffffff" />
          <rect x="8" y="8" width="2" height="2" fill="#ffffff" />
          <rect x="0" y="10" width="2" height="2" fill="#ffffff" />
          <rect x="6" y="10" width="2" height="2" fill="#ffffff" />
          <rect x="8" y="10" width="2" height="2" fill="#ffffff" />
          <rect x="0" y="0" width="1" height="12" fill="none" />
          <rect x="0" y="0" width="10" height="12" fill="#000000ff" opacity="0"/>
        </svg>
      </div>
    </>
  );
}
