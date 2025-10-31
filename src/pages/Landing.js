import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

function Landing() {
  return (
    <div className="landing">
      <section className="hero">
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
