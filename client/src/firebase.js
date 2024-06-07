// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "property-marketplace-2309.firebaseapp.com",
  projectId: "property-marketplace-2309",
  storageBucket: "property-marketplace-2309.appspot.com",
  messagingSenderId: "859089468192",
  appId: "1:859089468192:web:dfad0d30df879ef9f7b545"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);