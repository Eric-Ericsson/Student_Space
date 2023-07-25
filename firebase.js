// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile  } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "twitter-v4-93513.firebaseapp.com",
  actionCodeSettings: {
    // Other action code settings...
    url: "https://twitter-v4-93513.firebaseapp.com/email-verification-success",
  },
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps();
const db = getFirestore()
const storage = getStorage()
const auth = getAuth();

export { app, db, storage, auth, createUserWithEmailAndPassword, updateProfile, getAuth }