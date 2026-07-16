import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

const pageContent = {
  services: {
    eyebrow: 'What we do',
    title: 'Care for every season.',
    intro: 'Thoughtful, reliable landscape services designed around your property and your priorities.',
    items: [
      ['Routine Lawn Care', 'Consistent mowing, trimming, edging, and cleanup for a polished lawn week after week.'],
      ['Mulching', 'Fresh, carefully installed mulch that defines planting beds, supports moisture retention, and gives the landscape a finished appearance.'],
      ['Aeration & Overseeding', 'Seasonal lawn treatments that help reduce soil compaction, encourage stronger roots, and support thicker, healthier turf.'],
    ],
  },
  about: {
    eyebrow: 'Our approach',
    title: 'Good work, done with care.',
    intro: 'Terry Enterprises Lawn Care is built around dependable service, thoughtful workmanship, and respect for every property we maintain.',
    items: [
      ['Reliable by Design', 'Clear communication and consistent scheduling make professional lawn care feel effortless.'],
      ['Attention to Detail', 'We approach every edge, pass, and finishing touch with the same level of care.'],
      ['Pride in the Result', 'Our standard is simple: leave every property looking better than we found it.'],
    ],
  },
  'our-work': {
    eyebrow: 'Selected properties',
    title: 'Landscapes, well looked after.',
    intro: 'A growing collection of residential lawns and landscapes maintained with precision and consistency.',
    items: [
      ['Residential Lawn', 'Weekly maintenance · Placeholder project'],
      ['Garden Property', 'Seasonal care · Placeholder project'],
      ['Full Grounds', 'Complete maintenance · Placeholder project'],
    ],
  },
};

export default function PlaceholderPage({ page }) {
  const content = pageContent[page];
  return (
    <main className="static-page">
      <SiteHeader />
      <section className="static-hero">
        <div>
          <p className="kicker">{content.eyebrow}</p>
          <h1>{content.title}</h1>
          <p className="static-intro">{content.intro}</p>
        </div>
      </section>
      {page === 'about' && <AboutContent />}
      {page === 'our-work' && <WorkGallery />}
      {page === 'services' && (
        <section className="static-grid" aria-label="Services overview">
          {content.items.map(([title, body]) => (
            <article className="static-card" key={title}>
              <h2>{title}</h2>
              <p>{body}</p>
            </article>
          ))}
        </section>
      )}
      <section className="static-footer" aria-label="Contact Terry Enterprises Lawn Care">
        <div><p className="kicker">Ready when you are</p><h2>Let’s care for your property.</h2></div>
        <a className="light-button" href="tel:+15408159402">Call Now</a>
      </section>
      <SiteFooter />
    </main>
  );
}

function ImagePlaceholder({ label }) {
  return (
    <div className="image-placeholder" role="img" aria-label={`${label} image coming soon`}>
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M7 35 18 23l8 8 5-6 10 10M14 16h.01" />
      </svg>
      <span>{label}</span>
    </div>
  );
}

function AboutContent() {
  return (
    <section className="about-content" aria-label="About Terry Enterprises Lawn Care">
      <div className="about-story">
        <div className="about-copy">
          <p className="section-label">Our Story</p>
          <h2>A local business built around dependable care.</h2>
          <p>Terry Enterprises Lawn Care began with a straightforward idea: property care should feel reliable, personal, and easy to trust. This space will share the story of the business, the community it serves, and the standards behind every visit.</p>
          <p>Additional company background, service philosophy, and local history will be added here as the business story develops.</p>
        </div>
        <ImagePlaceholder label="Business Image Coming Soon" />
      </div>
      <div className="owner-story">
        <ImagePlaceholder label="Owner Portrait Coming Soon" />
        <div className="about-copy">
          <p className="section-label">Meet the Owner</p>
          <h2>Owner Story</h2>
          <p>This area is reserved for a brief owner biography. It can introduce their background, connection to the community, experience in lawn care, and the values they bring to each property.</p>
          <p className="owner-title">Owner &amp; Operator · Terry Enterprises Lawn Care</p>
        </div>
      </div>
    </section>
  );
}

function WorkGallery() {
  return (
    <section className="work-gallery" aria-label="Project gallery coming soon">
      {Array.from({ length: 12 }, (_, index) => (
        <div className="work-item" key={index}>
          <ImagePlaceholder label="Coming Soon" />
        </div>
      ))}
    </section>
  );
}
