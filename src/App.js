import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { UserProfileProvider } from './contexts/UserProfileContext';
import DashboardLayout from './components/DashboardLayout';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Products from './pages/Products';
import PostProduct from './pages/PostProduct';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Foreshadow from './pages/Foreshadow';
import './App.css';

function AppContent() {
  const { currentUser } = useAuth();

  // Non-authenticated layout (original website with Navbar and Footer)
  if (!currentUser) {
    return (
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Landing />} />
          </Routes>
        </main>
        <Footer />
      </div>
    );
  }

  // Authenticated layout (Dashboard with sidebar, no Navbar/Footer)
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/post-product" element={<PostProduct />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/foreshadow" element={<Foreshadow />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </DashboardLayout>
  );
}

function App() {
  return (
    <AuthProvider>
      <UserProfileProvider>
        <Router>
          <AppContent />
        </Router>
      </UserProfileProvider>
    </AuthProvider>
  );
}

export default App;
