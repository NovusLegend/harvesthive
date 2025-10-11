# HarvestHive - Farmer Marketplace

A React-based marketplace application that connects farmers with buyers, allowing them to post products, browse listings, and communicate through an integrated chat system.

## Features

- **User Authentication**: Secure login/register system using Firebase Auth
- **Product Management**: Farmers can post products with descriptions, prices, and contact details
- **Product Browsing**: Buyers can search and browse available products
- **Real-time Chat**: Direct communication between buyers and sellers
- **Responsive Design**: Mobile-friendly interface based on modern design principles

## Technology Stack

- **Frontend**: React 18 with React Router
- **Backend**: Firebase (Firestore for data, Auth for authentication)
- **Styling**: Custom CSS with CSS Variables
- **State Management**: React Context API

## Setup Instructions

### 1. Firebase Configuration

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and Firestore Database
3. Copy your Firebase configuration
4. Update `src/firebase.js` with your Firebase config:

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

### 2. Firestore Security Rules

Set up the following Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products collection - anyone can read, authenticated users can write
    match /products/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Chats collection - authenticated users can read/write
    match /chats/{chatId}/messages/{messageId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 3. Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.js       # Navigation component
│   └── ProductCard.js  # Product display component
├── contexts/           # React Context providers
│   └── AuthContext.js  # Authentication context
├── pages/              # Page components
│   ├── Home.js         # Landing page
│   ├── Products.js     # Product listing page
│   ├── PostProduct.js  # Product creation page
│   ├── Login.js        # Login page
│   ├── Register.js     # Registration page
│   └── Chat.js         # Chat interface
├── firebase.js         # Firebase configuration
└── App.js             # Main app component
```

## Usage

### For Farmers (Sellers)
1. Register an account
2. Navigate to "Sell Product" to post your products
3. Fill in product details (name, description, price, category, location, contact info)
4. Respond to buyer inquiries through the chat system

### For Buyers
1. Browse products on the main products page
2. Use the search functionality to find specific items
3. Click "Contact Seller" to start a conversation
4. Use the chat system to communicate with farmers

## Design System

The app uses a consistent design system based on the provided design.json:

- **Primary Color**: #00AEB5 (Teal)
- **Secondary Color**: #0B2A4A (Navy Blue)
- **Accent Color**: #20D0C9 (Cyan)
- **Typography**: Poppins font family
- **Spacing**: 8px base unit with consistent spacing scale

## Development

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Contributing

This project was created by Mugabi Jeremiah. Feel free to contribute by:

1. Forking the repository
2. Creating a feature branch
3. Making your changes
4. Submitting a pull request

## License

This project is open source and available under the MIT License.