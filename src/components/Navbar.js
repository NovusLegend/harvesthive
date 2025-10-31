import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/harvesthive-logo.png" alt="HarvestHive" className="logo-image" />
          <span className="logo-text">HarvestHive</span>
        </Link>
        
        <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></span>
        </div>
        
        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          {currentUser && (
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
          )}
          {currentUser && (
            <li className="nav-item">
              <Link to="/products" className="nav-links" onClick={() => setIsMenuOpen(false)}>
                Products
              </Link>
            </li>
          )}
          {currentUser && (
            <li className="nav-item">
              <Link to="/post-product" className="nav-links" onClick={() => setIsMenuOpen(false)}>
                Sell Product
              </Link>
            </li>
          )}
          {currentUser && (
            <li className="nav-item">
              <Link to="/chat" className="nav-links" onClick={() => setIsMenuOpen(false)}>
                Chat
              </Link>
            </li>
          )}
          <li className="nav-item">
            {currentUser ? (
              <button className="nav-links logout-btn" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link to="/login" className="nav-links" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
            )}
          </li>
          {!currentUser && (
            <li className="nav-item">
              <Link to="/register" className="nav-links register-btn" onClick={() => setIsMenuOpen(false)}>
                Register
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
