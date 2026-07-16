import { useEffect, useState } from 'react';

export default function SiteHeader() {
  const base = import.meta.env.BASE_URL;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  return (
    <header className={`site-header${menuOpen ? ' menu-open' : ''}`}>
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav id="primary-navigation" className="primary-nav" aria-label="Primary navigation">
        <a href={`${base}#/services`} onClick={() => setMenuOpen(false)}>Services</a>
        <a href={`${base}#/about`} onClick={() => setMenuOpen(false)}>About</a>
        <a href={`${base}#/our-work`} onClick={() => setMenuOpen(false)}>Our Work</a>
      </nav>
      <a className="brand" href={base} aria-label="Terry Enterprises Lawn Care home">
        <img src={`${base}assets/terry-enterprises-logo.png`} alt="Terry Enterprises Lawn Care" />
      </a>
      {/* Replace this placeholder with the confirmed business number. */}
      <a className="call-button" href="tel:+15408159402" aria-label="Call Terry Enterprises Lawn Care at 540-815-9402">Call Now</a>
    </header>
  );
}
