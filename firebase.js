import { initializeApp, getApps } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile  } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCcDPUAqY4gAobSy0UNJ9AtNXgCQ5FtdA4",
//   authDomain: "student-space-c7147.firebaseapp.com",
//   projectId: "student-space-c7147",
//   storageBucket: "student-space-c7147.appspot.com",
//   messagingSenderId: "985992092282",
//   appId: "1:985992092282:web:36ce84a652f6eb122179c3",
//   measurementId: "G-7D2MQ6YK58"
// };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps();
const db = getFirestore()
const storage = getStorage()
const auth = getAuth();

export { app, db, storage, auth, createUserWithEmailAndPassword, updateProfile, getAuth }