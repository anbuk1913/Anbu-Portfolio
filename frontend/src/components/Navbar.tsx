import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { navLinks } from '../data/portfolio';
import './css/Navbar.css';

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.3 }
    );

    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      // Scroll progress bar
      const el = document.querySelector('.scroll-progress') as HTMLElement;
      if (el) {
        const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        el.style.width = `${pct}%`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="scroll-progress" />
      <nav ref={navRef} className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <a className="navbar__logo" href="#hero" onClick={e => { e.preventDefault(); handleNav('#hero'); }}>
          <span className="navbar__logo-text">Anbukumar</span>
          <span className="navbar__logo-dot" />
        </a>

        {/* Desktop links */}
        <ul className="navbar__links">
          {navLinks.map((link, i) => (
            <li key={i}>
              <a
                href={link.href}
                className="navbar__link"
                onClick={e => { e.preventDefault(); handleNav(link.href); }}
              >
                <span className="navbar__link-num">{String(i + 1).padStart(2, '0')}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/resume.pdf"
          className="navbar__resume"
          target="_blank"
          rel="noreferrer"
        >
          Resume ↗
        </a>

        {/* Hamburger */}
        <button
          className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
        <ul>
          {navLinks.map((link, i) => (
            <li key={i}>
              <a
                href={link.href}
                onClick={e => { e.preventDefault(); handleNav(link.href); }}
              >
                <span>{String(i + 1).padStart(2, '0')}</span>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="/resume.pdf" target="_blank" rel="noreferrer">
              <span>↗</span>Resume
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
