import type { CSSProperties } from 'react';

const logos = import.meta.glob<string>('../assets/tech/*.svg', { eager: true, query: '?url', import: 'default' });
const rows = [
  [
    ['React', 'react', 'Frontend'], ['Next.js', 'next', 'Frontend'],
    ['TypeScript', 'typescript', 'Frontend'], ['Tailwind CSS', 'tailwind', 'Frontend'], ['Figma', 'figma', 'Frontend'],
  ],
  [['Flutter', 'flutter', 'Mobile'], ['React Native', 'react native', 'Mobile']],
  [
    ['Node.js', 'node', 'Backend & AI'], ['Python', 'python', 'Backend & AI'],
    ['Laravel', 'laravel', 'Backend & AI'], ['Claude', 'claude', 'Backend & AI'],
    ['NestJS', 'nestjs', 'Backend & AI'], ['ChatGPT', 'chat-gpt', 'Backend & AI'], ['n8n', 'n8n', 'Automation'],
  ],
  [
    ['PostgreSQL', 'postgree', 'Data & Cloud'], ['MongoDB', 'mongodb', 'Data & Cloud'],
    ['Supabase', 'supabase', 'Data & Cloud'], ['Docker', 'docker', 'Data & Cloud'],
    ['Google Cloud', 'google cloud', 'Data & Cloud'], ['Odoo', 'odoo', 'Business Apps'],
    ['AWS', 'aws', 'Data & Cloud'], ['Azure', 'azure', 'Data & Cloud'],
    ['Shopify', 'shopify', 'Commerce'], ['HubSpot', 'hubspot', 'CRM'], ['Slack', 'slack', 'Collaboration'],
  ],
];

export default function TechnologyMarquee() {
  return (
    <section className="technology-marquee" aria-label="Technologies we work with">
      {rows.map((row, rowIndex) => {
        // Each repeated half is wider than the viewport, even for the two-logo mobile row.
        const repetitions = Math.ceil(12 / row.length);
        const entries = Array.from({ length: repetitions }, () => row).flat();
        return (
          <div key={rowIndex} className={`technology-row${rowIndex % 2 === 0 ? ' moves-right' : ' moves-left'}`}>
            <div className="technology-track" style={{ '--marquee-duration': `${entries.length * 7}s` } as CSSProperties}>
              {[0, 1].map((copy) => (
                <ul key={copy} className="technology-group" aria-hidden={copy === 1 ? true : undefined}>
                  {entries.map(([name, file, category], index) => (
                    <li className="technology-pill" key={`${file}-${index}`} aria-hidden={index >= row.length ? true : undefined}>
                      <img src={logos[`../assets/tech/${file}.svg`]} alt="" width="32" height="32" />
                      <span className="technology-name">{name}</span>
                      <span className="technology-category">{category}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
