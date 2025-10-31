import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { MdStar, MdStarBorder, MdLocationOn, MdCalendarToday } from 'react-icons/md';
import './ProductCard.css';

function ProductCard({ product }) {
  const { currentUser } = useAuth();
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingComment, setRatingComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown date';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
  };

  const calculateAverageRating = () => {
    if (!product.ratings || product.ratings.length === 0) return 0;
    const sum = product.ratings.reduce((acc, r) => acc + r.rating, 0);
    return (sum / product.ratings.length).toFixed(1);
  };

  const hasUserRated = () => {
    if (!currentUser || !product.ratings) return false;
    return product.ratings.some(r => r.userId === currentUser.uid);
  };

  const handleSubmitRating = async () => {
    if (!currentUser || !selectedRating || submitting) return;

    setSubmitting(true);
    try {
      const productRef = doc(db, 'products', product.id);
      await updateDoc(productRef, {
        ratings: arrayUnion({
          userId: currentUser.uid,
          userEmail: currentUser.email,
          rating: selectedRating,
          comment: ratingComment,
          createdAt: new Date().toISOString()
        })
      });
      
      setShowRatingModal(false);
      setSelectedRating(0);
      setRatingComment('');
    } catch (error) {
      console.error('Error submitting rating:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating, interactive = false) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const filled = interactive ? (hoverRating >= i || (!hoverRating && selectedRating >= i)) : (rating >= i);
      stars.push(
        interactive ? (
          <button
            key={i}
            type="button"
            className="star-button"
            onClick={() => setSelectedRating(i)}
            onMouseEnter={() => setHoverRating(i)}
            onMouseLeave={() => setHoverRating(0)}
          >
            {filled ? <MdStar className="star-filled" /> : <MdStarBorder className="star-empty" />}
          </button>
        ) : (
          filled ? <MdStar key={i} className="star-filled" /> : <MdStarBorder key={i} className="star-empty" />
        )
      );
    }
    return stars;
  };

  const avgRating = calculateAverageRating();

  return (
    <div className="product-card">
      {/* Product Image */}
      <div className="product-image-container">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="product-image" />
        ) : (
          <div className="product-image-placeholder">
            <MdLocationOn className="placeholder-icon" />
            <span>No Image</span>
          </div>
        )}
        <div className="product-badge">UGX {product.price.toLocaleString()}</div>
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        
        {/* Rating Display */}
        <div className="product-rating">
          <div className="stars">
            {renderStars(Math.round(avgRating))}
          </div>
          <span className="rating-text">
            {avgRating > 0 ? `${avgRating} (${product.ratings?.length || 0})` : 'No ratings yet'}
          </span>
        </div>

        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description}</p>
        
        <div className="product-meta">
          <span className="meta-item">
            <MdLocationOn className="meta-icon" />
            {product.location}
          </span>
          <span className="meta-item">
            <MdCalendarToday className="meta-icon" />
            {formatDate(product.createdAt)}
          </span>
        </div>
      </div>
      
      {/* Actions */}
      <div className="product-actions">
        <Link 
          to={`/chat?seller=${product.sellerId}&productId=${product.id}&productName=${encodeURIComponent(product.name)}&productPrice=${product.price}`} 
          className="btn btn-primary"
        >
          Contact Seller
        </Link>
        
        {currentUser && currentUser.uid !== product.sellerId && !hasUserRated() && (
          <button 
            className="btn btn-secondary"
            onClick={() => setShowRatingModal(true)}
          >
            Rate Product
          </button>
        )}
      </div>

      {/* Rating Modal */}
      {showRatingModal && (
        <div className="rating-modal-overlay" onClick={() => setShowRatingModal(false)}>
          <div className="rating-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Rate this Product</h3>
            <div className="rating-stars-container">
              {renderStars(selectedRating, true)}
            </div>
            <textarea
              placeholder="Add a comment (optional)"
              value={ratingComment}
              onChange={(e) => setRatingComment(e.target.value)}
              className="rating-comment"
              rows="3"
            />
            <div className="modal-actions">
              <button 
                className="btn btn-secondary" 
                onClick={() => setShowRatingModal(false)}
                disabled={submitting}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleSubmitRating}
                disabled={!selectedRating || submitting}
              >
                {submitting ? 'Submitting...' : 'Submit Rating'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
