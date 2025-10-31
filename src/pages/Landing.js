import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

function Landing() {
  return (
    <div className="landing">
      <section className="hero">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src="/hero video.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-container">
          <h1 className="hero-headline">
            Connecting Farmers, Growing Communities
          </h1>
          <p className="hero-subheadline">
            Join HarvestHive to buy and sell fresh produce directly from local farmers. 
            Connect with your community and support sustainable agriculture.
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary">
              Browse Products
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Join as Farmer
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose HarvestHive?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>Fresh Products</h3>
              <p>Connect directly with local farmers for the freshest produce</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Direct Communication</h3>
              <p>Chat directly with farmers to ask questions and negotiate prices</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏘️</div>
              <h3>Community Support</h3>
              <p>Support your local farming community and sustainable agriculture</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <p className="section-subtitle">Get started in three simple steps</p>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-image">
                <img src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop" alt="Sign up" />
              </div>
              <h3>Create Your Account</h3>
              <p>Sign up as a farmer or buyer in just a few minutes. It's free and easy!</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-image">
                <img src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop" alt="Post products" />
              </div>
              <h3>Post or Browse Products</h3>
              <p>Farmers can list their produce, buyers can browse fresh local products.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-image">
                <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop" alt="Connect" />
              </div>
              <h3>Connect & Trade</h3>
              <p>Chat directly with each other and arrange transactions seamlessly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid-landing">
            <div className="stat-item">
              <h3 className="stat-number">500+</h3>
              <p className="stat-label">Active Farmers</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">10,000+</h3>
              <p className="stat-label">Products Listed</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">25,000+</h3>
              <p className="stat-label">Happy Customers</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">50+</h3>
              <p className="stat-label">Communities Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Gallery Section */}
      <section className="product-gallery">
        <div className="container">
          <h2>Fresh From Our Farms</h2>
          <p className="section-subtitle">Discover the variety of fresh produce available</p>
          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&h=400&fit=crop" alt="Fresh vegetables" />
              <div className="gallery-overlay">
                <h3>Fresh Vegetables</h3>
              </div>
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&h=400&fit=crop" alt="Organic fruits" />
              <div className="gallery-overlay">
                <h3>Organic Fruits</h3>
              </div>
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500&h=400&fit=crop" alt="Grains" />
              <div className="gallery-overlay">
                <h3>Quality Grains</h3>
              </div>
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=500&h=400&fit=crop" alt="Herbs" />
              <div className="gallery-overlay">
                <h3>Fresh Herbs</h3>
              </div>
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&h=400&fit=crop" alt="Dairy products" />
              <div className="gallery-overlay">
                <h3>Dairy Products</h3>
              </div>
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500&h=400&fit=crop" alt="Meat" />
              <div className="gallery-overlay">
                <h3>Premium Meat</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2>What Our Community Says</h2>
          <p className="section-subtitle">Real stories from real people</p>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-image">
                <img src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=150&h=150&fit=crop" alt="Sarah M." />
              </div>
              <div className="quote-icon">❝</div>
              <p className="testimonial-text">
                "HarvestHive has transformed how I sell my produce. I can now reach customers directly and get fair prices for my hard work!"
              </p>
              <h4 className="testimonial-name">Sarah Nakato</h4>
              <p className="testimonial-role">Farmer, Kampala</p>
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-image">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop" alt="John D." />
              </div>
              <div className="quote-icon">❝</div>
              <p className="testimonial-text">
                "I love that I can buy fresh, organic produce directly from local farmers. The quality is amazing and prices are fair!"
              </p>
              <h4 className="testimonial-name">John Mugisha</h4>
              <p className="testimonial-role">Customer, Entebbe</p>
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-image">
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop" alt="Mary K." />
              </div>
              <div className="quote-icon">❝</div>
              <p className="testimonial-text">
                "The chat feature makes it so easy to communicate with farmers. I can ask questions and arrange pickups without any hassle."
              </p>
              <h4 className="testimonial-name">Mary Achieng</h4>
              <p className="testimonial-role">Customer, Jinja</p>
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of farmers and buyers already using HarvestHive</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary">
              Create Account
            </Link>
            <Link to="/login" className="btn btn-outline">
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;
