import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEJLagx3So8-buC2N6jKr8xw_UG9W5wCY",
  authDomain: "fungjai-web.firebaseapp.com",
  projectId: "fungjai-web",
  storageBucket: "fungjai-web.firebasestorage.app",
  messagingSenderId: "118031467203",
  appId: "1:118031467203:web:a4f460600e5392674e9876",
  measurementId: "G-K8M9D5G8HJ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
