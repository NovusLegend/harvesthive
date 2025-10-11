import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Get user display name from email or user ID
export const getUserDisplayName = (email, userId) => {
  if (email) {
    // Extract name from email (before @)
    const name = email.split('@')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  
  if (userId) {
    // Use last 4 characters of user ID
    return `User ${userId.slice(-4)}`;
  }
  
  return 'Unknown User';
};

// Get user avatar initial
export const getUserAvatar = (email, userId) => {
  const name = getUserDisplayName(email, userId);
  return name.charAt(0).toUpperCase();
};

// Get user profile data (if stored in Firestore)
export const getUserProfile = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

// Format chat participant info
export const formatChatParticipant = (userId, currentUserId) => {
  if (userId === currentUserId) {
    return 'You';
  }
  return `User ${userId.slice(-4)}`;
};
