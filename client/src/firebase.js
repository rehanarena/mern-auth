// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-b1014.firebaseapp.com",
  projectId: "mern-auth-b1014",
  storageBucket: "mern-auth-b1014.appspot.com",
  messagingSenderId: "258947624037",
  appId: "1:258947624037:web:f9d0ccbf2376a6fee2ea8c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);