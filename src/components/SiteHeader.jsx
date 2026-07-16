export default function SiteHeader() {
  const base = import.meta.env.BASE_URL;
  return (
    <header className="site-header">
      <nav className="primary-nav" aria-label="Primary navigation">
        <a href={`${base}#/services`}>Services</a>
        <a href={`${base}#/about`}>About</a>
        <a href={`${base}#/our-work`}>Our Work</a>
      </nav>
      <a className="brand" href={base} aria-label="Terry Enterprises Lawn Care home">
        <img src={`${base}assets/terry-enterprises-logo.png`} alt="Terry Enterprises Lawn Care" />
      </a>
      {/* Replace this placeholder with the confirmed business number. */}
      <a className="call-button" href="tel:+15408159402" aria-label="Call Terry Enterprises Lawn Care at 540-815-9402">Call Now</a>
    </header>
  );
}
