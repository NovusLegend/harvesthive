import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>HarvestHive</h3>
            <p>Connecting farmers with buyers for fresh, local produce.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/post-product">Sell Product</Link></li>
              <li><Link to="/chat">Chat</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>jeremiahmugabi@gmail.com</p>
            <p>📞 +256 709 457 789</p>
            <p>📍 Kampala, Uganda</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; 2025 HarvestHive. All rights reserved.</p>
            <p className="made-by">Made by <strong>Mugabi Jeremiah</strong></p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
