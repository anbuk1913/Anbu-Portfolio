import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../data/portfolio';
import './css/About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section label
      gsap.fromTo('.about__label',
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.7,
          scrollTrigger: { trigger: '.about__label', start: 'top 88%' },
        }
      );

      // Heading lines
      gsap.fromTo('.about__heading-line',
        { y: '110%', opacity: 0 },
        {
          y: '0%', opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power4.out',
          scrollTrigger: { trigger: '.about__heading', start: 'top 85%' },
        }
      );

      // Body text
      gsap.fromTo('.about__para',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.about__paras', start: 'top 80%' },
        }
      );

      // Experience card
      gsap.fromTo('.about__exp',
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.about__exp', start: 'top 82%' },
        }
      );

      // Skills groups
      gsap.fromTo('.skills__group',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.about__skills', start: 'top 82%' },
        }
      );

      // Skill tags
      gsap.fromTo('.skill__tag',
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1, scale: 1, duration: 0.35, stagger: 0.03, ease: 'power2.out',
          scrollTrigger: { trigger: '.about__skills', start: 'top 78%' },
        }
      );

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about">
      <div className="about__grid">
        {/* Left column */}
        <div className="about__left">
          <div className="about__label">
            <span className="label-line" />
            <span>About</span>
          </div>

          <h2 className="about__heading">
            <div className="heading-wrap"><span className="about__heading-line">Crafting</span></div>
            <div className="heading-wrap"><span className="about__heading-line about__heading-line--italic">digital</span></div>
            <div className="heading-wrap"><span className="about__heading-line">solutions.</span></div>
          </h2>

          <div className="about__paras">
            <p className="about__para">
              Results-driven Full Stack Developer with hands-on experience building scalable
              and responsive web applications using the MERN stack. Skilled in designing
              RESTful APIs, implementing authentication systems, integrating third-party
              services, and developing dynamic user interfaces.
            </p>
            <p className="about__para">
              Experienced in both frontend and backend development, with strong knowledge
              of HTML, CSS, JavaScript, Bootstrap, EJS, and MongoDB. Passionate about
              writing clean, maintainable code and delivering high-performance applications.
            </p>
          </div>

          {/* Experience Card */}
          <div className="about__exp">
            <div className="about__exp-top">
              <span className="about__exp-role">IoT Developer</span>
              <span className="about__exp-badge">Past Role</span>
            </div>
            <div className="about__exp-company">Imbed Software</div>
            <p className="about__exp-desc">
              Integrating embedded systems with cloud platforms for real-time automation solutions.
              Worked with ESP32, ESP8266, MQTT protocols, and web dashboard interfaces.
            </p>
          </div>
        </div>

        {/* Right column — Skills */}
        <div className="about__skills" ref={null}>
          <div className="about__label about__label--right">
            <span className="label-line" />
            <span>Skills & Tools</span>
          </div>

          <div className="skills__grid">
            {skills.map((group, i) => (
              <div className="skills__group" key={i}>
                <h4 className="skills__group-title">{group.group}</h4>
                <div className="skills__tags">
                  {group.items.map((skill, j) => (
                    <span key={j} className="skill__tag" data-cursor="hover">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
