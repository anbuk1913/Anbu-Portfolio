import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import './css/Contact.css';

gsap.registerPlugin(ScrollTrigger);

interface FormState {
  name: string;
  email: string;
  message: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact__label',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.7,
          scrollTrigger: { trigger: '.contact__label', start: 'top 88%' } }
      );

      gsap.fromTo('.contact__heading-line',
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power4.out',
          scrollTrigger: { trigger: '.contact__heading', start: 'top 85%' } }
      );

      gsap.fromTo('.contact__form-group',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact__form', start: 'top 80%' } }
      );

      gsap.fromTo('.contact__info-item',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact__info', start: 'top 80%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErrorMsg('Please fill in all fields.');
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    try {
      await axios.post('/api/contact', form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
      setErrorMsg('Failed to send. Please try again.');
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="contact">
      <div className="contact__grid">
        {/* Left */}
        <div className="contact__left">
          <div className="contact__label">
            <span className="label-line" />
            <span>Contact</span>
          </div>

          <h2 className="contact__heading">
            <div className="heading-wrap"><span className="contact__heading-line">Let's</span></div>
            <div className="heading-wrap"><span className="contact__heading-line contact__heading-line--italic">work</span></div>
            <div className="heading-wrap"><span className="contact__heading-line">together.</span></div>
          </h2>

          <div className="contact__info">
            <a href="mailto:your@email.com" className="contact__info-item">
              <span className="contact__info-label">Email</span>
              <span className="contact__info-value">your@email.com ↗</span>
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noreferrer"
              className="contact__info-item"
            >
              <span className="contact__info-label">GitHub</span>
              <span className="contact__info-value">github.com/yourusername ↗</span>
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noreferrer"
              className="contact__info-item"
            >
              <span className="contact__info-label">LinkedIn</span>
              <span className="contact__info-value">linkedin.com/in/yourusername ↗</span>
            </a>
          </div>
        </div>

        {/* Right — Form */}
        <div className="contact__right">
          <div className="contact__form">
            <div className="contact__form-group">
              <label className="contact__form-label">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="contact__input"
                placeholder="Your full name"
              />
            </div>

            <div className="contact__form-group">
              <label className="contact__form-label">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="contact__input"
                placeholder="your@email.com"
              />
            </div>

            <div className="contact__form-group">
              <label className="contact__form-label">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="contact__input contact__textarea"
                placeholder="Tell me about your project..."
                rows={5}
              />
            </div>

            {errorMsg && (
              <p className="contact__error">{errorMsg}</p>
            )}

            {status === 'success' ? (
              <p className="contact__success">
                ✓ Message sent! I'll get back to you soon.
              </p>
            ) : (
              <button
                className={`contact__submit ${status === 'loading' ? 'contact__submit--loading' : ''}`}
                onClick={handleSubmit}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <span className="contact__spinner" />
                ) : (
                  <>Send Message <span>→</span></>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="contact__footer">
        <div className="contact__footer-line" />
        <div className="contact__footer-inner">
          <span>© {new Date().getFullYear()} — Full Stack Developer</span>
          {/* <span>Built with React + TypeScript + GSAP</span> */}
        </div>
      </div>
    </section>
  );
};

export default Contact;
