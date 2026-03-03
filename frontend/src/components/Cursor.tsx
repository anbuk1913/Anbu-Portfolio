import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './css/Cursor.css';

const Cursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(dot, { x: mouseX - 4, y: mouseY - 4, duration: 0.05 });
    };

    const loop = () => {
      ringX += (mouseX - ringX - 18) * 0.12;
      ringY += (mouseY - ringY - 18) * 0.12;
      gsap.set(ring, { x: ringX, y: ringY });
      raf = requestAnimationFrame(loop);
    };

    const onHoverIn = () => {
      gsap.to(ring, { width: 56, height: 56, borderColor: 'rgba(242,240,235,0.9)', duration: 0.3, ease: 'power2.out' });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };
    const onHoverOut = () => {
      gsap.to(ring, { width: 36, height: 36, borderColor: 'rgba(242,240,235,0.35)', duration: 0.3, ease: 'power2.out' });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    const interactives = document.querySelectorAll('a, button, [data-cursor]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onHoverIn);
      el.addEventListener('mouseleave', onHoverOut);
    });

    window.addEventListener('mousemove', onMove);
    loop();

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onHoverIn);
        el.removeEventListener('mouseleave', onHoverOut);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

export default Cursor;
