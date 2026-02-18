import vcSirImage from '../assets/vc-sir.jpg'; // Assuming image exists

export default function VCVision() {
  return (
    <div className="vc-vision-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-badge">Leadership</span>
          <h1 className="page-hero-title">Vice Chancellor's Vision</h1>
          <p className="page-hero-desc">
            Guiding principles and vision for the future of our institution.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="vc-vision-content">
            <div className="vc-vision-text">
              <h2>Empowering Tomorrow's Engineers</h2>
              <p>
                The fundamental philosophy of our Institute is to cultivate a vibrant technical culture through innovative programs that deliver high-quality technical education. We are committed to equipping our students with dynamic knowledge and practical skills that prepare them to excel in an ever-evolving technological landscape.
              </p>
              <p>
                Our vision extends beyond mere academics; it encompasses the holistic development of individuals who will not only contribute to technological advancement but also become responsible citizens, leaders, and innovators in their respective fields.
              </p>
              <p>
                By fostering a culture of excellence, creativity, and ethical practice, we aim to produce engineers who are ready to tackle the challenges of the 21st century and drive positive change in society.
              </p>
              
              <blockquote className="vc-quote">
                <p>"Education is not just about acquiring knowledge; it's about developing the ability to think, innovate, and create solutions that benefit humanity."</p>
                <cite>- Vice Chancellor, Vikram University</cite>
              </blockquote>
            </div>
            <div className="vc-image">
              <img src={vcSirImage} alt="Vice Chancellor" />
              <div className="vc-name">
                <h3>Prof. Arpan Bharadwaj</h3>
                <p>Vice Chancellor, Samrat Vikramaditya Vishwavidyalaya</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}