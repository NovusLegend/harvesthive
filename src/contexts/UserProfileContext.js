import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';

const UserProfileContext = createContext();

export function useUserProfile() {
  return useContext(UserProfileContext);
}

export function UserProfileProvider({ children }) {
  const [userProfiles, setUserProfiles] = useState({});
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // Create or update user profile
  const createUserProfile = async (userData) => {
    if (!currentUser) return;

    try {
      const profileData = {
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: userData.displayName || currentUser.email.split('@')[0],
        createdAt: new Date(),
        ...userData
      };

      await setDoc(doc(db, 'userProfiles', currentUser.uid), profileData);
      setUserProfiles(prev => ({
        ...prev,
        [currentUser.uid]: profileData
      }));
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  };

  // Get user profile by ID
  const getUserProfile = async (userId) => {
    if (userProfiles[userId]) {
      return userProfiles[userId];
    }

    try {
      const userDoc = await getDoc(doc(db, 'userProfiles', userId));
      if (userDoc.exists()) {
        const profileData = userDoc.data();
        setUserProfiles(prev => ({
          ...prev,
          [userId]: profileData
        }));
        return profileData;
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }

    return null;
  };

  // Get user display name
  const getUserDisplayName = (userId) => {
    if (userProfiles[userId]) {
      return userProfiles[userId].displayName;
    }
    return `User ${userId.slice(-4)}`;
  };

  // Load current user profile on auth change
  useEffect(() => {
    if (currentUser) {
      getUserProfile(currentUser.uid);
    }
    setLoading(false);
  }, [currentUser]);

  const value = {
    userProfiles,
    createUserProfile,
    getUserProfile,
    getUserDisplayName,
    loading
  };

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
}
