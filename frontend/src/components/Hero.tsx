import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './css/Hero.css';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const bgNumRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.6 });

      // Background large number
      tl.fromTo(bgNumRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.6, ease: 'power4.out' }, 0
      );

      // Tag line
      tl.fromTo('.hero__tag',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.2
      );

      // Title lines one by one
      const lines = titleRef.current!.querySelectorAll('.hero__title-line');
      tl.fromTo(lines,
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1, stagger: 0.12, ease: 'power4.out' }, 0.4
      );

      // Sub text
      tl.fromTo(subRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.9
      );

      // Meta (CTAs, scroll)
      tl.fromTo(metaRef.current!.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, 1.1
      );

      // Horizontal lines enter
      tl.fromTo('.hero__line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, stagger: 0.1, ease: 'power4.inOut' }, 0.2
      );

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={sectionRef} className="hero">
      {/* Big decorative background text */}
      <span ref={bgNumRef} className="hero__bg-text">MERN</span>

      {/* Profile image with glitch effect */}
      <div className="hero__profile-wrap">
        <div className="hero__glitch">
          <img src="/pr.png" alt="Profile" className="hero__profile-img" />
          <img src="/pr.png" alt="" className="hero__profile-img hero__glitch-layer hero__glitch-layer--r" aria-hidden="true" />
          <img src="/pr.png" alt="" className="hero__profile-img hero__glitch-layer hero__glitch-layer--g" aria-hidden="true" />
          <div className="hero__glitch-scanlines" aria-hidden="true" />
        </div>
      </div>

      <div className="hero__inner">
        {/* Tag */}
        <p className="hero__tag">
          <span className="hero__tag-dot" />
          Full Stack Developer — Available for hire
        </p>

        {/* Title */}
        <h1 ref={titleRef} className="hero__title">
          <span className="hero__title-wrap"><span className="hero__title-line">Building</span></span>
          <span className="hero__title-wrap"><span className="hero__title-line hero__title-line--italic">scalable</span></span>
          <span className="hero__title-wrap"><span className="hero__title-line">web</span></span>
          <span className="hero__title-wrap hero__title-wrap--outline"><span className="hero__title-line">experiences.</span></span>
        </h1>
        {/* Decorative line */}
        <div className="hero__line hero__line--mid" />
        {/* Sub description */}
        <p ref={subRef} className="hero__sub">
          MERN Stack · IoT Systems · AI Chatbots
        </p>

        {/* CTAs */}
        <div ref={metaRef} className="hero__cta-row">
          <button
            className="hero__btn hero__btn--filled"
            onClick={() => scrollToSection('#projects')}
          >
            View Projects
          </button>
          <button
            className="hero__btn"
            onClick={() => scrollToSection('#contact')}
          >
            Get in Touch
          </button>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="hero__resume-link"
          >
            ↓ Resume
          </a>
        </div>
      </div>

      {/* Bottom line */}
      <div className="hero__line hero__line--bottom" />

      {/* Scroll cue */}
      <div className="hero__scroll">
        <span>Scroll</span>
        <div className="hero__scroll-bar" />
      </div>

      {/* Corner markers */}
      <span className="hero__corner hero__corner--tl" />
      <span className="hero__corner hero__corner--tr" />
      <span className="hero__corner hero__corner--bl" />
      <span className="hero__corner hero__corner--br" />
    </section>
  );
};

export default Hero;
