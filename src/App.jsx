import LawnScrollStory from './components/LawnScrollStory';
import PlaceholderPage from './components/PlaceholderPage';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import ReviewsSection from './components/ReviewsSection';

export default function App() {
  const route = window.location.pathname.replace(/^\/+|\/+$/g, '');
  if (['services', 'about', 'our-work'].includes(route)) {
    return <PlaceholderPage page={route} />;
  }

  return (
    <main>
      <SiteHeader />
      <section className="intro" id="top">
        <span id="about" className="anchor-target" aria-hidden="true" />
        <p className="kicker">Residential landscape care</p>
        <h1>Quality you can see.<br />Care you can feel.</h1>
        <span className="scroll-cue" aria-hidden="true"><i /></span>
      </section>
      <div id="services"><LawnScrollStory /></div>
      <ReviewsSection />
      <section className="outro" id="estimate">
        <span id="our-work" className="anchor-target" aria-hidden="true" />
        <p className="kicker">Let’s get started</p>
        <h2>Come Home to a Lawn You Love.</h2>
        <a className="light-button" href="mailto:Terryenterprises0727@gmail.com">Request an estimate</a>
      </section>
      <SiteFooter />
    </main>
  );
}
