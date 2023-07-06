// Import the functions you need from the SDKs you need
import { initializeApp, gwtApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "twitter-v4-93513.firebaseapp.com",
  projectId: "twitter-v4-93513",
  storageBucket: "twitter-v4-93513.appspot.com",
  messagingSenderId: "166954820204",
  appId: "1:166954820204:web:1b539ace2c7ea7a14a2e49"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps();
const db = getFirestore()
const storage = getStorage()

export { app, db, storage }