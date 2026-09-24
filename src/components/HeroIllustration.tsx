import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import robotMarkup from '../assets/hero/robot.svg?raw';
import strategy from '../assets/hero/strategy.svg';
import product from '../assets/hero/product.svg';
import engineering from '../assets/hero/engineering.svg';
import design from '../assets/hero/design.svg';
import data from '../assets/hero/data.svg';
import automation from '../assets/hero/automation.svg';
import qa from '../assets/hero/qa.svg';

const cards = [
  { name: 'Strategy', image: strategy, message: 'Strategy gives it direction.' },
  { name: 'Engineering', image: engineering, message: 'Engineering makes it work.' },
  { name: 'Data', image: data, message: 'Data makes it smarter.' },
  { name: 'QA', image: qa, message: 'QA builds confidence.' },
  { name: 'Automation', image: automation, message: 'Automation helps it scale.' },
  { name: 'Design', image: design, message: 'Design makes it intuitive.' },
  { name: 'Product', image: product, message: 'Product brings ideas to life.' },
];
const CARD_WIDTH = 152.554;
const CARD_HEIGHT = 88.339;
const REVOLUTION_MS = 90000;
type Box = { x: number; y: number; width: number; height: number };

// Pick nearby free space at the card's current position, including after it orbits.
function placeCallout(card: Box, obstacles: Box[]) {
  const width = 248;
  const height = 44;
  const gap = 14;
  const candidates = [
    { x: card.x + (card.width - width) / 2, y: card.y - height - gap },
    { x: card.x + (card.width - width) / 2, y: card.y + card.height + gap },
    { x: card.x - width - gap, y: card.y + (card.height - height) / 2 },
    { x: card.x + card.width + gap, y: card.y + (card.height - height) / 2 },
    { x: card.x, y: card.y - height - gap },
    { x: card.x + card.width - width, y: card.y - height - gap },
    { x: card.x, y: card.y + card.height + gap },
    { x: card.x + card.width - width, y: card.y + card.height + gap },
  ].map((point) => ({ x: Math.max(6, Math.min(416, point.x)), y: Math.max(6, Math.min(566, point.y)), width, height }));
  const overlap = (a: Box, b: Box) => Math.max(0, Math.min(a.x + a.width + 6, b.x + b.width) - Math.max(a.x - 6, b.x)) * Math.max(0, Math.min(a.y + a.height + 6, b.y + b.height) - Math.max(a.y - 6, b.y));
  return candidates.reduce((best, candidate) => {
    const score = (box: Box) => obstacles.reduce((total, obstacle) => total + overlap(box, obstacle), 0);
    return score(candidate) < score(best) ? candidate : best;
  });
}

export default function HeroIllustration() {
  const illustrationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const illustration = illustrationRef.current;
    const hero = illustration?.closest('.hero');
    const svg = illustration?.querySelector<SVGSVGElement>('.orbit-illustration');
    if (!illustration || !hero || !svg) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      illustration.style.setProperty('--look-x', '0');
      illustration.style.setProperty('--look-y', '0');
    };
    const follow = (event: Event) => {
      const pointer = event as PointerEvent;
      if (pointer.pointerType === 'touch' || preference.matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const matrix = svg.getScreenCTM();
        if (!matrix) return;
        const point = new DOMPoint(pointer.clientX, pointer.clientY).matrixTransform(matrix.inverse());
        const clamp = (value: number) => Math.max(-1, Math.min(1, value));
        illustration.style.setProperty('--look-x', String(clamp((point.x - 335) / 240)));
        illustration.style.setProperty('--look-y', String(clamp((point.y - 250) / 200)));
      });
    };
    hero.addEventListener('pointermove', follow, { passive: true });
    hero.addEventListener('pointerleave', reset);
    window.addEventListener('blur', reset);
    window.addEventListener('scroll', reset, { passive: true });
    preference.addEventListener('change', reset);
    return () => {
      cancelAnimationFrame(frame);
      hero.removeEventListener('pointermove', follow);
      hero.removeEventListener('pointerleave', reset);
      window.removeEventListener('blur', reset);
      window.removeEventListener('scroll', reset);
      preference.removeEventListener('change', reset);
    };
  }, []);

  const [angle, setAngle] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const activeIndex = hovered ?? focused ?? selected;
  const paused = activeIndex !== null;
  const pausedRef = useRef(paused);
  useLayoutEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let lastTime: number | null = null;
    function tick(time: number) {
      if (lastTime !== null && !pausedRef.current && !document.hidden) {
        const elapsed = Math.min(time - lastTime, 64);
        setAngle((current) => (current + elapsed * 360 / REVOLUTION_MS) % 360);
      }
      lastTime = time;
      frame = window.requestAnimationFrame(tick);
    }
    function syncAnimation() {
      window.cancelAnimationFrame(frame);
      lastTime = null;
      if (!preference.matches) frame = window.requestAnimationFrame(tick);
    }
    syncAnimation();
    preference.addEventListener('change', syncAnimation);
    return () => {
      window.cancelAnimationFrame(frame);
      preference.removeEventListener('change', syncAnimation);
    };
  }, []);

  const positions = cards.map((_, index) => {
    const radians = (-90 + index * 360 / cards.length + angle) * Math.PI / 180;
    return { x: 335 + 245 * Math.cos(radians) - CARD_WIDTH / 2, y: 294 + 244 * Math.sin(radians) - CARD_HEIGHT / 2, width: CARD_WIDTH, height: CARD_HEIGHT };
  });
  const active = activeIndex === null ? null : cards[activeIndex];
  const callout = activeIndex === null ? null : placeCallout(positions[activeIndex], [...positions, { x: 248, y: 193, width: 175, height: 212 }]);

  return (
    <div ref={illustrationRef} className="hero-illustration" onPointerLeave={() => setHovered(null)}>
      <svg className="orbit-illustration" viewBox="0 0 670 616" aria-label="Explore our product capabilities" onPointerDown={(event) => {
        if (event.target === event.currentTarget) { setSelected(null); setFocused(null); }
      }}>
        <g aria-hidden="true" className="orbit-connectors">
          {positions.map((position, index) => <line key={cards[index].name} x1="335" y1="294" x2={position.x + CARD_WIDTH / 2} y2={position.y + CARD_HEIGHT / 2} className={activeIndex === index ? 'orbit-connector is-active' : 'orbit-connector'} />)}
        </g>
        <g transform="translate(-19 0)" className="orbit-robot" aria-label="UXORA robot" dangerouslySetInnerHTML={{ __html: robotMarkup }} />
        {cards.map((card, index) => {
          const position = positions[index];
          return (
            <g key={card.name} transform={`translate(${position.x} ${position.y})`} className="orbit-card" role="button" tabIndex={0} aria-label={`${card.name}: ${card.message}`} aria-pressed={activeIndex === index}
              onPointerEnter={(event) => { if (event.pointerType !== 'touch') setHovered(index); }}
              onPointerLeave={() => setHovered(null)}
              onFocus={(event) => { if (event.currentTarget.matches(':focus-visible')) setFocused(index); }}
              onBlur={() => { setFocused(null); setSelected(null); }}
              onClick={(event) => { if (event.detail === 0) setSelected((current) => current === index ? null : index); }}
              onPointerDown={(event) => { if (event.pointerType === 'touch') setSelected((current) => current === index ? null : index); }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelected((current) => current === index ? null : index); }
                if (event.key === 'Escape') { setSelected(null); setFocused(null); setHovered(null); }
              }}>
              <image href={card.image} x="-24" y="-24" width="200.554" height="152.339" aria-hidden="true" />
              <rect x="1.5" y="1.5" width="149.554" height="85.339" rx="11.4" className={`active-card-border orbit-card-border${activeIndex === index ? ' is-active' : ''}`} />
              <rect width={CARD_WIDTH} height={CARD_HEIGHT} rx="11.4" fill="transparent" className="orbit-card-target" />
            </g>
          );
        })}
        {active && callout && <g transform={`translate(${callout.x} ${callout.y})`} className="orbit-callout" aria-hidden="true">
          <g key={active.name} className="card-callout">
            <rect width="248" height="44" rx="14" className="callout-halo" />
            <rect width="248" height="44" rx="14" className="callout-background" />
            <circle cx="23" cy="22" r="10" fill="#dcedb0" />
            <circle cx="23" cy="22" r="4.2" fill="#8bc500" />
            <text x="37" y="27" className="callout-text">{active.message}</text>
          </g>
        </g>}
      </svg>
    </div>
  );
}
