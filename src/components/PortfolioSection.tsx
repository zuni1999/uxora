import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import geviti from '../assets/projects/givit.jpg';
import thakeel from '../assets/projects/thakeel.jpg';
import ezwage from '../assets/projects/ezwage.jpg';
import calorie from '../assets/projects/al-calorie.jpg';

const projects = [
  { title: 'Geviti — Personalized Health & Longevity Platform', image: geviti, category: 'Web Development', description: 'AI-powered insights to help members better understand and optimize their long-term health.' },
  { title: 'Thakeel Al-Arabia — Heavy Equipment Marketplace', image: thakeel, category: 'Web & App Development · UI/UX Design', description: 'A connected marketplace for buying, selling and renting heavy equipment across the GCC.' },
  { title: 'EZ Wage — Everyday Is Payday', image: ezwage, category: 'Web & App Development · Fintech', description: 'A digital platform for earned wage access, payroll financing and everyday financial flexibility.' },
  { title: 'AI Health — Calorie & Heart Rate Tracker', image: calorie, category: 'Mobile Apps · UI/UX Design', description: 'An intelligent wellness companion for calorie tracking, heart-rate monitoring and daily health habits.' },
];
const keywords = [
  ['Web Design', 'Product Strategy', 'Design Systems', 'Platform Engineering', 'UX/UI Design', 'Cloud-Native Development', 'Custom Software Development'],
  ['Automation', 'Integrations', 'Easy to use', 'Web Apps', 'Mobile Apps', 'Built to last', 'Ready to grow', 'AI Agents', 'DevOps', 'API Integration'],
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previewRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!section || !sticky || !track) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let distance = 0;
    let frame = 0;
    let enabled = false;
    function update() {
      frame = 0;
      if (!section || !track || !enabled) return;
      const top = parseFloat(getComputedStyle(sticky!).top) || 0;
      const progress = Math.max(0, Math.min(distance, top - section.getBoundingClientRect().top));
      track.style.transform = `translate3d(${-progress}px, 0, 0)`;
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    function measure() {
      if (!section || !sticky || !track) return;
      const header = document.querySelector('.site-header');
      const top = header?.getBoundingClientRect().height ?? 80;
      section.style.setProperty('--portfolio-top', `${top}px`);
      enabled = !motion.matches && window.innerWidth > 700 && window.innerHeight - top >= 500;
      section.classList.toggle('is-pinned', enabled);
      if (enabled) {
        const intro = sticky.querySelector<HTMLElement>('.portfolio-intro')!;
        const style = getComputedStyle(sticky);
        const available = window.innerHeight - top - parseFloat(style.paddingTop)
          - parseFloat(style.paddingBottom) - intro.offsetHeight
          - parseFloat(getComputedStyle(intro).marginBottom) - 8;
        // Measure the complete cards, including wrapped titles and descriptions.
        let lower = 280;
        let upper = window.innerWidth * 0.62;
        section.style.setProperty('--portfolio-card-width', `${lower}px`);
        if (track.getBoundingClientRect().height > available + 1) {
          enabled = false;
        } else {
          // Find the largest complete card that fits, rather than overshooting
          // to a smaller size when a title wraps onto an additional line.
          for (let pass = 0; pass < 14; pass++) {
            const width = (lower + upper) / 2;
            section.style.setProperty('--portfolio-card-width', `${width}px`);
            if (track.getBoundingClientRect().height <= available) lower = width;
            else upper = width;
          }
          section.style.setProperty('--portfolio-card-width', `${Math.floor(lower)}px`);
        }
        section.classList.toggle('is-pinned', enabled);
      }
      distance = Math.max(0, track.scrollWidth - window.innerWidth);
      section.style.height = enabled ? `${sticky.offsetHeight + distance}px` : 'auto';
      if (!enabled) track.style.transform = '';
      update();
    }
    const resize = new ResizeObserver(measure);
    resize.observe(sticky);
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', schedule, { passive: true });
    motion.addEventListener('change', measure);
    measure();
    let disposed = false;
    void document.fonts.ready.then(() => { if (!disposed) measure(); });
    return () => {
      disposed = true;
      resize.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', schedule);
      motion.removeEventListener('change', measure);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <section className="portfolio-section" id="work" ref={sectionRef} aria-labelledby="portfolio-title">
        <div className="portfolio-sticky" ref={stickyRef}>
          <header className="portfolio-intro"><span className="about-eyebrow"><span className="brand-mark" aria-hidden="true" />Portfolio Work</span><h2 id="portfolio-title">Explore Our Real Works</h2></header>
          <div className="portfolio-window">
            <div className="portfolio-track" ref={trackRef}>
              {projects.map((project) => <article className="project-card" key={project.title}>
                <button className="project-cover" aria-label={`View ${project.title}`} onClick={() => {
                  if (project.image === thakeel) { window.location.href = '/work/thakeel-al-arabia'; return; }
                  if (project.image === geviti) { window.location.href = '/work/geviti'; return; }
                  if (previewRef.current) { previewRef.current.src = project.image; previewRef.current.alt = project.title; }
                  dialogRef.current?.showModal();
                }}>
                  <img src={project.image} alt={project.title} width="900" height="579" loading="lazy" />
                  <span className="project-overlay" /><span className="project-view">View</span>
                  <span className="project-category">{project.category}</span>
                </button>
                <h3>{project.title}</h3><p>{project.description}</p>
              </article>)}
            </div>
          </div>
        </div>
      </section>
      <section className="keyword-marquee" aria-label="Our digital product expertise">
        {keywords.map((row, index) => <div className={`keyword-row ${index === 0 ? 'moves-right' : 'moves-left'}`} key={index}>
          <div className="technology-track keyword-track">
            {[0, 1].map((copy) => <ul className="keyword-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>{row.map((word) => <li key={word}><span className="keyword-pill">{word}</span><span className="keyword-arrow" aria-hidden="true"><ArrowUpRight /></span><span className="keyword-star" aria-hidden="true">✶</span></li>)}</ul>)}
          </div>
        </div>)}
      </section>
      <dialog className="project-dialog" ref={dialogRef} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }} aria-label="Project preview">
        <button className="project-dialog-close" onClick={() => dialogRef.current?.close()} autoFocus aria-label="Close project preview">×</button>
        <img ref={previewRef} alt="" />
      </dialog>
    </>
  );
}
