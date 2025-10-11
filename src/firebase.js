import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
// Replace these values with your actual Firebase config
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_Xa-AgdgEYWbOXQvXSku9Vb9pgWv8EEY",
  authDomain: "blog-af357.firebaseapp.com",
  projectId: "blog-af357",
  storageBucket: "blog-af357.firebasestorage.app",
  messagingSenderId: "742174134068",
  appId: "1:742174134068:web:c5facec576b08de36f5f61",
  measurementId: "G-TNSNP60G65"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
