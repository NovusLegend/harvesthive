import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import './PostProduct.css';

function PostProduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    location: '',
    contactInfo: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!currentUser) {
      setError('You must be logged in to post a product');
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, 'products'), {
        ...formData,
        price: parseFloat(formData.price),
        sellerId: currentUser.uid,
        sellerName: currentUser.email,
        createdAt: serverTimestamp()
      });
      
      navigate('/products');
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Failed to post product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="post-product-page">
        <div className="container">
          <div className="auth-required">
            <h2>Authentication Required</h2>
            <p>You must be logged in to post a product.</p>
            <button onClick={() => navigate('/login')} className="btn btn-primary">
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="post-product-page">
      <div className="container">
        <h1>Post Your Product</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Fresh Tomatoes"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Describe your product, quality, quantity available, etc."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price (UGX) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="vegetables">Vegetables</option>
                <option value="fruits">Fruits</option>
                <option value="grains">Grains</option>
                <option value="dairy">Dairy</option>
                <option value="meat">Meat</option>
                <option value="herbs">Herbs</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="e.g., Kampala, Uganda"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactInfo">Contact Information *</label>
            <input
              type="text"
              id="contactInfo"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
              required
              placeholder="Phone number or email for buyers to contact you"
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Posting...' : 'Post Product'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostProduct;
