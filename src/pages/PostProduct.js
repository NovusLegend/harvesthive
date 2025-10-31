import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';
import { MdCloudUpload, MdImage } from 'react-icons/md';
import './PostProduct.css';

function PostProduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    location: '',
    contactInfo: '',
    latitude: 0.3476,
    longitude: 32.5825
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = async (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });

    // If latitude or longitude changes, update location via reverse geocoding
    if (name === 'latitude' || name === 'longitude') {
      const lat = name === 'latitude' ? value : formData.latitude;
      const lon = name === 'longitude' ? value : formData.longitude;
      
      if (lat && lon) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );
          const data = await response.json();
          
          if (data.display_name) {
            setFormData(prev => ({
              ...prev,
              [name]: value,
              location: data.display_name
            }));
          }
        } catch (error) {
          console.error('Error fetching location:', error);
        }
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image size must be less than 5MB');
        return;
      }
      
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const uploadImageToSupabase = async (file) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${currentUser.uid}_${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setUploadProgress(0);

    if (!currentUser) {
      setError('You must be logged in to post a product');
      setLoading(false);
      return;
    }

    if (!imageFile) {
      setError('Please upload a product image');
      setLoading(false);
      return;
    }

    try {
      // Upload image to Supabase
      setUploadProgress(50);
      const imageUrl = await uploadImageToSupabase(imageFile);
      
      setUploadProgress(75);
      
      // Add product to Firestore with image URL
      await addDoc(collection(db, 'products'), {
        ...formData,
        price: parseFloat(formData.price),
        imageUrl,
        sellerId: currentUser.uid,
        sellerName: currentUser.email,
        ratings: [],
        views: 0,
        createdAt: serverTimestamp()
      });
      
      setUploadProgress(100);
      navigate('/products');
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Failed to post product. Please try again.');
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="post-product-page">
      <div className="page-header">
        <h1>Post Your Product</h1>
        <p className="page-subtitle">List your fresh produce for buyers to discover</p>
      </div>
      
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

          {/* Image Upload */}
          <div className="form-group">
            <label>Product Image *</label>
            <div className="image-upload-container">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="image-input"
                required
              />
              <label htmlFor="image" className="image-upload-label">
                {imagePreview ? (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                    <div className="image-overlay">
                      <MdImage />
                      <span>Change Image</span>
                    </div>
                  </div>
                ) : (
                  <div className="image-placeholder">
                    <MdCloudUpload className="upload-icon" />
                    <p>Click to upload image</p>
                    <span>Max size: 5MB</span>
                  </div>
                )}
              </label>
            </div>
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="upload-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${uploadProgress}%` }} />
                </div>
                <span>{uploadProgress}%</span>
              </div>
            )}
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
                step="1"
                placeholder="e.g., 50000"
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
            
            {/* Location Map */}
            <div className="location-map-container">
              <iframe
                title="Location Map"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${formData.longitude-0.01},${formData.latitude-0.01},${formData.longitude+0.01},${formData.latitude+0.01}&layer=mapnik&marker=${formData.latitude},${formData.longitude}`}
                className="location-iframe"
              />
              <div className="map-coordinates">
                <div className="coordinate-group">
                  <label htmlFor="latitude">Latitude:</label>
                  <input
                    type="number"
                    id="latitude"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    step="0.0001"
                    placeholder="0.3476"
                  />
                </div>
                <div className="coordinate-group">
                  <label htmlFor="longitude">Longitude:</label>
                  <input
                    type="number"
                    id="longitude"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    step="0.0001"
                    placeholder="32.5825"
                  />
                </div>
              </div>
              <p className="map-hint">💡 Tip: Adjust coordinates to pinpoint your exact location</p>
            </div>
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
  );
}

export default PostProduct;
