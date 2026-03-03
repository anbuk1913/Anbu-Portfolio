import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './css/Marquee.css';

const items = [
  'React.js', '·', 'Node.js', '·', 'MongoDB', '·', 'Express.js', '·',
  'TypeScript', '·', 'ESP32', '·', 'MQTT', '·', 'REST API', '·',
  'JWT', '·', 'FastAPI', '·', 'IoT', '·', 'Full Stack', '·', 'Python', '·',
  'SQL', '·', 'Embedded Systems', '·',
];

const Marquee = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current!;
    const totalWidth = el.scrollWidth / 2;
    gsap.to(el, {
      x: -totalWidth,
      duration: 28,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: (x: string) => `${parseFloat(x) % totalWidth}px`,
      },
    });
  }, []);

  const doubled = [...items, ...items];

  return (
    <div className="marquee">
      <div ref={trackRef} className="marquee__track">
        {doubled.map((item, i) => (
          <span key={i} className={item === '·' ? 'marquee__dot' : 'marquee__item'}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
