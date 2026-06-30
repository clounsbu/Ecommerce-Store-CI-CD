import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_JHkf4ztTe5pD9DuK34pF6UD5qKlcvfk",
  authDomain: "ecommerce-store-app-54c31.firebaseapp.com",
  projectId: "ecommerce-store-app-54c31",
  storageBucket: "ecommerce-store-app-54c31.firebasestorage.app",
  messagingSenderId: "910197701504",
  appId: "1:910197701504:web:ec5dcb8b7a162ae23d9f65",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
