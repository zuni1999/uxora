import { useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { services } from '../data/services';

export default function ServicesNavigation({ onNavigate }: { onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const close = () => { setOpen(false); onNavigate(); };

  return (
    <div className="services-navigation"
      onPointerEnter={(event) => { if (event.pointerType === 'mouse') setOpen(true); }}
      onPointerLeave={(event) => { if (event.pointerType === 'mouse') setOpen(false); }}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); event.stopPropagation(); }
      }}>
      <div className="services-navigation-trigger">
        <a href="/#services" onClick={close} onFocus={() => setOpen(true)}>Services</a>
        <button ref={toggle} type="button" aria-label="Toggle services dropdown"
          aria-expanded={open} aria-controls="services-dropdown" onClick={() => setOpen(!open)}>
          <ChevronDown aria-hidden="true" />
        </button>
      </div>
      <div id="services-dropdown" className="services-dropdown" hidden={!open}>
        <ul>
          {services.map((service) => (
            <li key={service.slug}>
              <a href={`/services/${service.slug}`} onClick={close}
                aria-current={window.location.pathname.replace(/\/$/, '') === `/services/${service.slug}` ? 'page' : undefined}>
                {service.title}<ArrowUpRight aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
