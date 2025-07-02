// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ Needed for login
import { getFirestore } from "firebase/firestore"; // ✅ If you're using Firestore
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAPfKnrgKMcY4NnsLxq5aD4aNhqswHEBSY",
    authDomain: "asset-bazar.firebaseapp.com",
    projectId: "asset-bazar",
    storageBucket: "asset-bazar.firebasestorage.app",
    messagingSenderId: "606915503329",
    appId: "1:606915503329:web:73e32062a7ac3eb11883a0",
    measurementId: "G-LZ7TMCRST2"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ These are important for sign-in and DB
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db };