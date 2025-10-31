# 🌾 HarvestHive - Farmer Marketplace

A modern React-based marketplace connecting farmers with buyers. Post products, browse listings, communicate via real-time chat, and access weather forecasting for agricultural planning.

## ✨ Features

### Core Functionality
- 🔐 **User Authentication** - Secure Firebase authentication with role-based access
- 📦 **Product Management** - Post products with images (Supabase storage), descriptions, prices in UGX
- 🔍 **Product Browsing** - Search, filter by category, view ratings and reviews
- 💬 **Real-time Chat** - Direct messaging with auto-quoting of products
- ⭐ **Product Ratings** - 5-star rating system with comments
- 🗺️ **Location Mapping** - Interactive location selection with OpenStreetMap

### Advanced Features
- 🌤️ **Weather Forecast** - 30-day weather predictions with agricultural insights
- 📊 **Analytics Dashboard** - Product views, sales tracking, and performance metrics
- 👤 **User Profiles** - Manage personal information and account settings
- 📱 **Responsive Design** - Mobile-first approach with custom green theme

## 🛠️ Technology Stack

- **Frontend** - React 18, React Router v6
- **Database** - Firebase Firestore
- **Authentication** - Firebase Auth
- **Storage** - Supabase (product images)
- **Weather API** - Tomorrow.io
- **Charts** - Recharts
- **Icons** - React Icons
- **Styling** - Custom CSS with CSS Variables

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ and npm
- Firebase account
- Supabase account
- Tomorrow.io API key (free tier available)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/harvesthive.git
cd harvesthive

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
# Supabase Configuration
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key

# Weather API
REACT_APP_WEATHER_API_KEY=your_tomorrow_io_api_key
```

### Firebase Configuration

Update `src/firebase.js` with your Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### Run the App

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📁 Project Structure

```
harvesthive/
├── public/
│   ├── harvesthive-logo.png
│   └── hero video.mp4
├── src/
│   ├── components/
│   │   ├── ChatList.js
│   │   ├── DashboardLayout.js
│   │   ├── Footer.js
│   │   ├── Navbar.js
│   │   └── ProductCard.js
│   ├── contexts/
│   │   ├── AuthContext.js
│   │   └── UserProfileContext.js
│   ├── pages/
│   │   ├── Analytics.js
│   │   ├── Chat.js
│   │   ├── Foreshadow.js      # Weather forecast
│   │   ├── Home.js             # Dashboard
│   │   ├── Landing.js          # Landing page
│   │   ├── Login.js
│   │   ├── PostProduct.js
│   │   ├── Products.js
│   │   ├── Profile.js
│   │   └── Register.js
│   ├── firebase.js
│   ├── supabaseClient.js
│   ├── App.js
│   └── index.js
├── .env
└── package.json
```

## 🎯 How to Use

### For Farmers
1. **Sign Up** - Create an account
2. **Post Products** - Add product images, details, location on map
3. **Set Prices** - Price in UGX (Ugandan Shillings)
4. **Track Analytics** - View product performance
5. **Chat with Buyers** - Respond to inquiries
6. **Check Weather** - Plan activities with 30-day forecasts

### For Buyers
1. **Browse Products** - Search and filter by category
2. **View Details** - See ratings, reviews, location
3. **Contact Sellers** - Auto-quoted product information
4. **Rate Products** - Leave reviews with star ratings
5. **Track Conversations** - Manage all chats in one place

## 🎨 Design System

Custom green agricultural theme:

- **Primary**: `#22C55E` (Green)
- **Secondary**: `#15803D` (Dark Green)
- **Accent**: `#16A34A` (Medium Green)
- **Typography**: Poppins, Inter
- **Custom Scrollbars**: Green gradient theme

## 📜 Available Scripts

```bash
npm start          # Development server (localhost:3000)
npm test           # Run tests
npm run build      # Production build
```

## 🤝 Contributing

Created by **Mugabi Jeremiah** and **Kavuma Hakim** 

Contributions welcome! Fork the repo, make changes, and submit a pull request.