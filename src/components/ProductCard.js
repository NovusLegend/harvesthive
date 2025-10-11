import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product }) {
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown date';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <div className="product-card">
      <div className="product-header">
        <h3 className="product-name">{product.name}</h3>
        <span className="product-price">${product.price}</span>
      </div>
      
      <div className="product-details">
        <p className="product-category">Category: {product.category}</p>
        <p className="product-description">{product.description}</p>
        <p className="product-location">Location: {product.location}</p>
        <p className="product-date">Posted: {formatDate(product.createdAt)}</p>
      </div>
      
      <div className="product-seller">
        <p className="seller-name">Seller: {product.sellerName}</p>
        <p className="seller-contact">Contact: {product.contactInfo}</p>
      </div>
      
      <div className="product-actions">
        <Link 
          to={`/chat?seller=${product.sellerId}&productId=${product.id}&productName=${encodeURIComponent(product.name)}`} 
          className="btn btn-primary"
        >
          Contact Seller
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
