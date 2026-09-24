import { useState } from 'react';
import { ChevronRight, Star } from 'lucide-react';
import ridaAvatar from '../assets/avatars/portrait-1.jpg';
import aliAvatar from '../assets/avatars/portrait-2.jpg';

const testimonials = [
  { name: 'Rida Nawab', role: 'Founder at Aswad Labs', avatar: ridaAvatar, quote: 'UXORA helped us turn a complex marketplace concept into a clear, user-friendly product. Their team understood our business model, simplified difficult workflows and delivered an experience designed for long-term growth.' },
  { name: 'Ali Pervaiz', role: 'Product Lead, HealthTech Company', avatar: aliAvatar, quote: 'They brought structure to an ambitious product idea and guided us from early strategy through interface design. Every decision was thoughtful, practical and connected to the needs of our users.' },
];
const questions = [
  { question: 'What digital product services does UXORA provide?', answer: 'UXORA provides end-to-end digital product services, including web and app design, custom software development, AI workflow automation, product design, e-commerce development and cloud integration. We can support an entire product lifecycle or strengthen a specific stage of an existing project.' },
  { question: 'How much does custom web or app development cost?', answer: 'The cost depends on the scope, features, integrations and complexity of your product. Share your goals and requirements with us so we can recommend an approach and provide a tailored estimate.' },
  { question: 'How long does it take to design and develop a digital product?', answer: 'Timelines vary with the size and complexity of the project. We start by defining the scope and priorities, then outline clear milestones for discovery, design, development and launch.' },
  { question: 'Do you provide ongoing support after launch?', answer: 'Yes. We can support your product after launch with maintenance, improvements and new features. We’ll work with you to define the support your product needs as it grows.' },
];

export default function TestimonialsFaq() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);
  return (
    <>
      <section className="testimonials-section" aria-labelledby="testimonials-title">
        <header className="feedback-intro">
          <span className="about-eyebrow"><span className="brand-mark" aria-hidden="true" />Testimonials</span>
          <h2 id="testimonials-title">What Our Clients are Saying</h2>
          <p>See how founders and product teams work with UXORA to transform complex ideas into intuitive, scalable and high-performing digital products.</p>
        </header>
        <div className="testimonials-window" tabIndex={0} aria-label="Client testimonials. Scroll horizontally to explore.">
          <div className="testimonials-track">
            {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => <article className="testimonial-card" key={index} aria-hidden={index >= testimonials.length ? true : undefined}>
              <div className="testimonial-stars" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, star) => <Star key={star} fill="currentColor" aria-hidden="true" />)}</div>
              <blockquote>{testimonial.quote}</blockquote>
              <div className="testimonial-person"><img src={testimonial.avatar} alt="" width="256" height="256" loading="lazy" /><div><p>{testimonial.name}</p><span>{testimonial.role}</span></div></div>
            </article>)}
          </div>
        </div>
      </section>
      <section className="faq-section" aria-labelledby="faq-title">
        <header className="feedback-intro">
          <span className="about-eyebrow"><span className="brand-mark" aria-hidden="true" />FAQ’s</span>
          <h2 id="faq-title">What Our Clients are Saying</h2>
          <p>Clear answers about UXORA’s digital product design, software development, AI automation and cloud integration services.</p>
        </header>
        <div className="faq-list">
          {questions.map((item, index) => {
            const open = openQuestion === index;
            return <article key={item.question} className={`faq-item${open ? ' is-open' : ''}`}>
              <h3><button id={`faq-question-${index}`} aria-expanded={open} aria-controls={`faq-answer-${index}`} onClick={() => setOpenQuestion(open ? null : index)}>
                <span className="faq-number">{String(index + 1).padStart(2, '0')}.</span><span>{item.question}</span><span className="faq-chevron"><ChevronRight aria-hidden="true" /></span>
              </button></h3>
              <div id={`faq-answer-${index}`} className="faq-answer" role="region" aria-labelledby={`faq-question-${index}`} aria-hidden={!open} inert={!open}><div><p>{item.answer}</p></div></div>
            </article>;
          })}
        </div>
      </section>
    </>
  );
}
