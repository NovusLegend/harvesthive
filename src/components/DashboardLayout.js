import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MdDashboard, MdShoppingCart, MdAddCircle, MdChat, MdAnalytics, MdLogout, MdCloud } from 'react-icons/md';
import { GiWheat } from 'react-icons/gi';
import './DashboardLayout.css';

function DashboardLayout({ children }) {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const sidebarRef = useRef(null);

  const navigationItems = [
    { path: '/', label: 'Dashboard', icon: MdDashboard },
    { path: '/products', label: 'Products', icon: MdShoppingCart },
    { path: '/post-product', label: 'Post Product', icon: MdAddCircle },
    { path: '/chat', label: 'Messages', icon: MdChat },
    { path: '/analytics', label: 'Analytics', icon: MdAnalytics },
    { path: '/foreshadow', label: 'Weather Forecast', icon: MdCloud },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  // Auto-collapse sidebar on outside click (desktop only)
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only on desktop (width > 992px)
      if (window.innerWidth > 992) {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          // Check if click is not on the toggle button
          const toggleButton = document.querySelector('.sidebar-toggle-desktop');
          if (toggleButton && !toggleButton.contains(event.target)) {
            setSidebarOpen(false);
          }
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setSidebarMobileOpen(!sidebarMobileOpen);
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside ref={sidebarRef} className={`dashboard-sidebar ${sidebarOpen ? 'expanded' : 'collapsed'} ${sidebarMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <GiWheat className="logo-icon" />
            {sidebarOpen && <h2 className="sidebar-title">HarvestHive</h2>}
          </div>
          <button 
            className="sidebar-toggle-desktop"
            onClick={toggleSidebar}
            title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {sidebarOpen ? '«' : '»'}
          </button>
          <button 
            className="sidebar-close-mobile"
            onClick={toggleMobileSidebar}
          >
            ✕
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setSidebarMobileOpen(false)}
                title={item.label}
              >
                <IconComponent className="sidebar-icon" />
                {sidebarOpen && <span className="sidebar-label">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {currentUser && (
          <div className="sidebar-footer">
            <Link to="/profile" className="user-info" onClick={() => setSidebarMobileOpen(false)}>
              <div className="user-avatar">
                {currentUser.email?.charAt(0).toUpperCase()}
              </div>
              {sidebarOpen && (
                <div className="user-details">
                  <p className="user-email">{currentUser.email}</p>
                  <span className="user-status">View Profile</span>
                </div>
              )}
            </Link>
            <button 
              className="logout-button"
              onClick={handleLogout}
              title="Logout"
            >
              <MdLogout className="logout-icon" />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        )}
      </aside>

      {/* Mobile Menu Toggle */}
      <button 
        className="mobile-menu-toggle"
        onClick={toggleMobileSidebar}
      >
        ☰
      </button>

      {/* Overlay for mobile */}
      {sidebarMobileOpen && (
        <div 
          className="sidebar-overlay"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Main Content */}
      <main className={`dashboard-content ${sidebarOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
