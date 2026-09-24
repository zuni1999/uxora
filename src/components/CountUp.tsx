import { useEffect, useRef, useState } from 'react';

type CountUpProps = {
  value: number;
  suffix?: string;
};

export default function CountUp({ value, suffix = '' }: CountUpProps) {
  const element = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const node = element.current;
    if (!node) return;

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let playing = false;
    let visible = false;

    function stop() {
      window.cancelAnimationFrame(frame);
    }

    function start() {
      stop();
      if (preference.matches) {
        setCount(value);
        return;
      }
      setCount(0);
      const startTime = performance.now();
      function tick(time: number) {
        const progress = Math.min((time - startTime) / 1800, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(progress === 1 ? value : Math.floor(eased * value));
        if (progress < 1) frame = window.requestAnimationFrame(tick);
      }
      frame = window.requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && entry.intersectionRatio >= 0.35 && !playing) {
        playing = true;
        start();
      } else if (!visible) {
        playing = false;
        stop();
        setCount(preference.matches ? value : 0);
      }
    }, { threshold: [0, 0.35] });

    function handleMotionPreference() {
      stop();
      if (preference.matches) setCount(value);
      else if (visible && playing) start();
    }

    observer.observe(node);
    preference.addEventListener('change', handleMotionPreference);
    return () => {
      stop();
      observer.disconnect();
      preference.removeEventListener('change', handleMotionPreference);
    };
  }, [value]);

  return (
    <span ref={element} className="count-up">
      <span className="sr-only">{value}{suffix}</span>
      <span className="count-up-width" aria-hidden="true">{value}{suffix}</span>
      <span className="count-up-value" aria-hidden="true">{count}{suffix}</span>
    </span>
  );
}
