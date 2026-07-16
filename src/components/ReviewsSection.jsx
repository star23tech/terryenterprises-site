const reviews = [
  'Customer Review placeholder Customer Name placeholder',
  'Customer Review placeholder Customer Name placeholder',
  'Customer Review placeholder Customer Name placeholder',
];

export default function ReviewsSection() {
  return (
    <section className="reviews-section" aria-labelledby="reviews-title">
      <div className="reviews-heading">
        <div>
          <p className="kicker">What neighbors are saying</p>
          <h2 id="reviews-title">Reliable care.<br />Visible results.</h2>
        </div>
        <p>Real customer experiences will be featured here as reviews become available.</p>
      </div>
      <div className="reviews-grid">
        {reviews.map((review, index) => (
          <blockquote className="review-card" key={index}>
            <div className="review-stars" aria-hidden="true">★★★★★</div>
            <p>“{review}”</p>
          </blockquote>
        ))}
      </div>
      <div className="service-area-band">
        <span>Serving residential properties across</span>
        <ul aria-label="Service areas">
          <li>Vinton</li>
          <li>Roanoke</li>
          <li>Moneta</li>
        </ul>
      </div>
    </section>
  );
}
