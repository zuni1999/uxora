import { ArrowUpRight, CircleCheck } from 'lucide-react';
import { services } from '../data/services';
import { serviceDetails, servicePhoto, serviceCover } from '../data/serviceDetails';

export default function ServiceDetailPage({ slug }: { slug: string }) {
  const service = services.find((item) => item.slug === slug);
  const detail = serviceDetails[slug];
  if (!service || !detail) return <main className="service-page"><h1>Service not found</h1><a href="/#services">Explore our services</a></main>;
  return (
    <main className="service-page">
      <header className="service-page-intro"><h1>{service.title}</h1><p>{detail.intro}</p></header>
      <img className="service-page-cover" src={serviceCover(slug)} alt={`${service.title} illustration`} width="1254" height="1254" />
      <div className="service-page-body">
        <section><h2>Service Overview:</h2><p>{detail.overview}</p></section>
        <section><h2>What's Included in {slug === 'web-app-design' ? 'Web Design' : service.title} Services:</h2><p>{detail.included}</p>
          {detail.groups.map((group) => <div className="service-deliverables" key={group.title}><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}><CircleCheck aria-hidden="true" /><span>{item}</span></li>)}</ul></div>)}
        </section>
        <img className="service-page-team" src={servicePhoto(slug)} alt={detail.photoAlt} loading="lazy" />
        <section className="service-page-vision"><h2>Your vision, our expertise.</h2><p>{detail.closing}</p><a className="footer-contact-button" href="/contact">CONNECT WITH US NOW<span><ArrowUpRight /></span></a></section>
      </div>
      <section className="case-talk service-page-talk"><p>Have a project in mind? Just let us know!</p><h2>Let’s Start Talk</h2><a href="/contact">Connect With Us</a></section>
    </main>
  );
}
