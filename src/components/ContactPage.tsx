import { useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

export default function ContactPage() {
  const [budget, setBudget] = useState('');
  const [notice, setNotice] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const body = `Full name: ${values.get('name')}\nEmail: ${values.get('email')}\nProject type: ${values.get('type')}\nBudget: ${budget ? `$${budget} USD` : 'Not specified'}\nCountry: ${values.get('country')}\n\n${values.get('message')}`;
    window.location.href = `mailto:tech.uxora@gmail.com?subject=${encodeURIComponent(`Project enquiry — ${values.get('type')}`)}&body=${encodeURIComponent(body)}`;
    setNotice('Your email app will open with your project details. Please send the email there to complete your enquiry.');
  }
  return (
    <main className="contact-page">
      <section className="contact-information" aria-labelledby="contact-heading">
        <div><h1 id="contact-heading">Reach out today</h1><p className="contact-intro">Learn about our journey, mission, and the team driving innovation.</p></div>
        <div className="contact-information-bottom">
          <dl><div><dt>Email:</dt><dd><a href="mailto:tech.uxora@gmail.com">tech.uxora@gmail.com</a></dd></div><div><dt>Phone:</dt><dd><a href="tel:+447901757510">+44 7901 757510</a></dd></div><div><dt>Office:</dt><dd>Remote, World Wide</dd></div></dl>
          <p className="contact-follow-label">Follow Us:</p>
          <div className="contact-socials" aria-label="UXORA social profiles">
              <a href="https://linkedin.com/company/uxoraco/" target="_blank" rel="noopener noreferrer" aria-label="UXORA on LinkedIn (opens in a new tab)"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.46 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.29 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.4-.76 1.36-1.56 2.79-1.56 2.99 0 3.58 1.97 3.58 4.52v5.29Z" /></svg></a>
              <a href="https://www.instagram.com/tech.uxora/" target="_blank" rel="noopener noreferrer" aria-label="UXORA on Instagram (opens in a new tab)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg></a>
              <a href="https://uk.pinterest.com/uxoratech/" target="_blank" rel="noopener noreferrer" aria-label="UXORA on Pinterest (opens in a new tab)"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-1.02-.01-2.25.25-3.39l1.54-6.53s-.38-.77-.38-1.91c0-1.79 1.04-3.13 2.33-3.13 1.1 0 1.63.83 1.63 1.83 0 1.12-.71 2.78-1.07 4.32-.3 1.29.65 2.34 1.92 2.34 2.3 0 3.85-2.95 3.85-6.45 0-2.66-1.79-4.66-5.05-4.66-3.69 0-5.99 2.75-5.99 5.82 0 1.06.31 1.8.8 2.38.23.27.26.38.18.69l-.26 1c-.09.32-.33.44-.61.32-1.68-.69-2.46-2.54-2.46-4.62 0-3.44 2.9-7.57 8.65-7.57 4.62 0 7.66 3.35 7.66 6.95 0 4.76-2.65 8.31-6.56 8.31-1.31 0-2.54-.71-2.96-1.51l-.85 3.34c-.31 1.17-.92 2.35-1.48 3.27A12 12 0 1 0 12 0Z" /></svg></a>
            </div>
        </div>
      </section>
      <section className="contact-form-scene" aria-label="Tell us about your project">
        <form className="contact-form" onSubmit={submit}>
          <label htmlFor="contact-name">Full name<input id="contact-name" name="name" placeholder="Your full name" autoComplete="name" required maxLength={120} /></label>
          <label htmlFor="contact-email">Email address<input id="contact-email" name="email" type="email" placeholder="Your email address" autoComplete="email" required /></label>
          <div className="contact-form-row">
            <label htmlFor="contact-type">Project Type<span className="contact-select"><select id="contact-type" name="type" defaultValue="SAAS"><option>SAAS</option><option>Web &amp; App Design</option><option>Web &amp; App Development</option><option>AI Automation</option><option>Product Design</option><option>E-Commerce</option><option>Cloud Integration</option><option>Other</option></select><ChevronDown aria-hidden="true" /></span></label>
            <label htmlFor="contact-budget">Budget<span className="contact-budget-field"><span aria-hidden="true">$</span><input id="contact-budget" name="budget" type="text" inputMode="numeric" pattern="[0-9]*" aria-label="Budget in US dollars" placeholder="Type Your Budget" maxLength={100} value={budget} onChange={(event) => setBudget(event.target.value.replace(/[^0-9]/g, ''))} /></span></label>
          </div>
          <label htmlFor="contact-country">Your Country<input id="contact-country" name="country" placeholder="Write your country name" autoComplete="country-name" required /></label>
          <label htmlFor="contact-message">Messages<textarea id="contact-message" name="message" placeholder="Your messages here..." required maxLength={5000} /></label>
          <button className="contact-submit" type="submit">SUBMIT<span><ArrowUpRight /></span></button>
          <p className="contact-submit-note">Opens your email app to send your enquiry.</p>
          {notice && <p className="contact-form-notice" role="status">{notice}</p>}
        </form>
      </section>
    </main>
  );
}
