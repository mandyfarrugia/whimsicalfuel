import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbuFu3hswsVnIrHVM0d9063chUFcixheQ",
  authDomain: "whimsicalfuelx26.firebaseapp.com",
  projectId: "whimsicalfuelx26",
  storageBucket: "whimsicalfuelx26.firebasestorage.app",
  messagingSenderId: "320875031498",
  appId: "1:320875031498:web:855809a56cf6d165637d33",
  measurementId: "G-PG8J8RHCCF"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firebaseAuthentication = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const firebaseDatabase = getFirestore(app);