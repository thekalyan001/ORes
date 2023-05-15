import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8BDyygTlC2JW8Na83bVc0W-0Im1gMk4k",
  authDomain: "oreselling-374c5.firebaseapp.com",
  projectId: "oreselling-374c5",
  storageBucket: "oreselling-374c5.appspot.com",
  messagingSenderId: "598123681857",
  appId: "1:598123681857:web:dd7e2090bbf79a82f54ec0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;