// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "genwebai-d0e78.firebaseapp.com",
  projectId: "genwebai-d0e78",
  storageBucket: "genwebai-d0e78.firebasestorage.app",
  messagingSenderId: "515501673394",
  appId: "1:515501673394:web:126da91dfd941ebeed72ab",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export {auth,provider}
