import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/portfolio';
import './css/Projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.projects__label',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.7,
          scrollTrigger: { trigger: '.projects__label', start: 'top 88%' } }
      );

      gsap.fromTo('.projects__heading-line',
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power4.out',
          scrollTrigger: { trigger: '.projects__heading', start: 'top 85%' } }
      );

      // Each project item reveal
      gsap.utils.toArray<HTMLElement>('.project-row').forEach((row, i) => {
        gsap.fromTo(row,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 85%' } }
        );
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="projects">
      <div className="projects__header">
        <div className="projects__label">
          <span className="label-line" />
          <span>Selected Projects</span>
        </div>
        <div className="projects__heading-wrap">
          <h2 className="projects__heading">
            <div className="heading-wrap"><span className="projects__heading-line">Recent</span></div>
            <div className="heading-wrap"><span className="projects__heading-line projects__heading--italic">work.</span></div>
          </h2>
        </div>
        <span className="projects__count">0{projects.length}</span>
      </div>

      <div className="projects__list">
        {projects.map((project, i) => (
          <div
            key={project.id}
            className={`project-row ${activeProject === i ? 'project-row--active' : ''}`}
            onMouseEnter={() => setActiveProject(i)}
            onMouseLeave={() => setActiveProject(null)}
          >
            <div className="project-row__top">
              <span className="project-row__num">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="project-row__main">
                <div className="project-row__title-row">
                  <h3 className="project-row__title">{project.title}</h3>
                  <span className="project-row__category">{project.category}</span>
                  <span className="project-row__year">{project.year}</span>
                </div>

                <div className={`project-row__body ${activeProject === i ? 'project-row__body--visible' : ''}`}>
                  <p className="project-row__desc">{project.description}</p>

                  <div className="project-row__features">
                    {project.features.map((feat, j) => (
                      <span key={j} className="project-feature">
                        <span className="project-feature__dash">—</span>
                        {feat}
                      </span>
                    ))}
                  </div>

                  <div className="project-row__stack">
                    {project.stack.map((tech, j) => (
                      <span key={j} className="tech-pill">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="project-row__arrow">
                <a href={project.link} target="_blank" rel="noreferrer">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 16L16 4M16 4H8M16 4V12" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
