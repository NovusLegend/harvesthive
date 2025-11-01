import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import ProductCard from '../components/ProductCard';
import './Home.css';

function Home() {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    userProducts: 0,
    recentProducts: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch total products count
        const productsRef = collection(db, 'products');
        const allProductsSnapshot = await getDocs(productsRef);
        const totalProducts = allProductsSnapshot.size;

        // Fetch recent products
        const recentQuery = query(productsRef, orderBy('createdAt', 'desc'), limit(6));
        const recentSnapshot = await getDocs(recentQuery);
        const recentProducts = recentSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Fetch user's products count if logged in
        let userProducts = 0;
        if (currentUser) {
          const userProductsQuery = query(productsRef, where('sellerId', '==', currentUser.uid));
          const userProductsSnapshot = await getDocs(userProductsQuery);
          userProducts = userProductsSnapshot.size;
        }

        setStats({
          totalProducts,
          userProducts,
          recentProducts
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentUser]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="dashboard-page page-transition">
      {/* Welcome Section */}
      <header className="dashboard-header fade-in">
        <h1 className="welcome-message">
          {getGreeting()}{currentUser && ', Farmer'}!
        </h1>
        <p className="dashboard-subtitle">
          Manage your products and connect with buyers
        </p>
      </header>

      {/* Recent Products */}
      <section className="recent-products-section">
        <div className="section-header">
          <h2 className="section-title">Recently Added Products</h2>
          <Link to="/products" className="view-all-link">
            View All →
          </Link>
        </div>
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : stats.recentProducts.length === 0 ? (
          <div className="no-products">
            <p>No products available yet. Be the first to post!</p>
            <Link to="/post-product" className="btn btn-primary">
              Post Your First Product
            </Link>
          </div>
        ) : (
          <div className="products-grid">
            {stats.recentProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
