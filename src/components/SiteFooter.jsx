export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <a className="footer-brand" href="/" aria-label="Terry Enterprises Lawn Care home">
          <img src="/assets/terry-enterprises-logo.png" alt="Terry Enterprises Lawn Care" />
        </a>
        <nav className="footer-nav" aria-label="Footer navigation">
          <a href="/services">Services</a>
          <a href="/about">About</a>
          <a href="/our-work">Our Work</a>
        </nav>
        <div className="footer-contact">
          <a href="tel:+15408159402">(540) 815-9402</a>
          <a href="mailto:Terryenterprises0727@gmail.com">Email Us</a>
        </div>
      </div>
      <div className="footer-legal">
        <span>© {new Date().getFullYear()} Terry Enterprises Lawn Care. All rights reserved.</span>
        <span>Design concept prepared by Star 23 for review. Not the official website of Terry Enterprises Lawn Care</span>
      </div>
    </footer>
  );
}
