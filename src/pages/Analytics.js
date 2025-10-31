import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { MdTrendingUp, MdStar, MdShoppingCart, MdAttachMoney } from 'react-icons/md';
import './Analytics.css';

function Analytics() {
  const { currentUser } = useAuth();
  const [analytics, setAnalytics] = useState({
    totalProducts: 0,
    averageRating: 0,
    totalViews: 0,
    topProducts: [],
    ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!currentUser) return;

      try {
        // Fetch user's products
        const productsRef = collection(db, 'products');
        const q = query(productsRef, where('sellerId', '==', currentUser.uid));
        const snapshot = await getDocs(q);

        const products = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Calculate analytics
        const totalProducts = products.length;
        let totalRating = 0;
        let ratingCount = 0;
        const ratingDist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

        products.forEach(product => {
          if (product.ratings && product.ratings.length > 0) {
            product.ratings.forEach(rating => {
              totalRating += rating.rating;
              ratingCount++;
              ratingDist[rating.rating]++;
            });
          }
        });

        const averageRating = ratingCount > 0 ? (totalRating / ratingCount).toFixed(1) : 0;

        // Sort products by rating for top products
        const topProducts = products
          .map(product => ({
            ...product,
            avgRating: product.ratings && product.ratings.length > 0
              ? product.ratings.reduce((sum, r) => sum + r.rating, 0) / product.ratings.length
              : 0,
            totalRatings: product.ratings ? product.ratings.length : 0
          }))
          .sort((a, b) => b.avgRating - a.avgRating)
          .slice(0, 5);

        setAnalytics({
          totalProducts,
          averageRating,
          totalViews: products.reduce((sum, p) => sum + (p.views || 0), 0),
          topProducts,
          ratingDistribution: ratingDist
        });
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [currentUser]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <MdStar
          key={i}
          className={i <= rating ? 'star-filled' : 'star-empty'}
        />
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="analytics-page">
        <div className="loading">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="analytics-page">
      <div className="page-header">
        <h1>Analytics Dashboard</h1>
        <p className="page-subtitle">Track your performance and insights</p>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper products">
            <MdShoppingCart />
          </div>
          <div className="stat-content">
            <h3>{analytics.totalProducts}</h3>
            <p>Total Products</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper rating">
            <MdStar />
          </div>
          <div className="stat-content">
            <h3>{analytics.averageRating}</h3>
            <p>Average Rating</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper views">
            <MdTrendingUp />
          </div>
          <div className="stat-content">
            <h3>{analytics.totalViews}</h3>
            <p>Total Views</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper revenue">
            <MdAttachMoney />
          </div>
          <div className="stat-content">
            <h3>Coming Soon</h3>
            <p>Revenue Tracking</p>
          </div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="analytics-section">
        <h2>Rating Distribution</h2>
        <div className="rating-chart">
          {Object.entries(analytics.ratingDistribution)
            .reverse()
            .map(([rating, count]) => {
              const total = Object.values(analytics.ratingDistribution).reduce((a, b) => a + b, 0);
              const percentage = total > 0 ? (count / total) * 100 : 0;
              
              return (
                <div key={rating} className="rating-bar-container">
                  <div className="rating-label">
                    {rating} <MdStar className="star-icon" />
                  </div>
                  <div className="rating-bar">
                    <div 
                      className="rating-bar-fill" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="rating-count">{count}</div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Top Products */}
      <div className="analytics-section">
        <h2>Top Rated Products</h2>
        {analytics.topProducts.length === 0 ? (
          <p className="no-data">No products with ratings yet</p>
        ) : (
          <div className="top-products-list">
            {analytics.topProducts.map((product, index) => (
              <div key={product.id} className="top-product-item">
                <div className="product-rank">#{index + 1}</div>
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <div className="product-rating">
                    <div className="stars">
                      {renderStars(Math.round(product.avgRating))}
                    </div>
                    <span className="rating-text">
                      {product.avgRating.toFixed(1)} ({product.totalRatings} {product.totalRatings === 1 ? 'review' : 'reviews'})
                    </span>
                  </div>
                </div>
                <div className="product-price">UGX {product.price.toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Performance Tips */}
      <div className="analytics-section tips-section">
        <h2>Performance Tips</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <MdStar className="tip-icon" />
            <h3>Improve Ratings</h3>
            <p>Respond to customer feedback and maintain high-quality products to boost your ratings.</p>
          </div>
          <div className="tip-card">
            <MdShoppingCart className="tip-icon" />
            <h3>Add More Products</h3>
            <p>Diversify your offerings to attract more customers and increase sales opportunities.</p>
          </div>
          <div className="tip-card">
            <MdTrendingUp className="tip-icon" />
            <h3>Stay Active</h3>
            <p>Regular updates and prompt responses lead to better customer engagement.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
