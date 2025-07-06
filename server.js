// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3p7rZI_UDJ0bPexD3eEZcGGLeBcV57Gg",
  authDomain: "vnotanet.firebaseapp.com",
  projectId: "vnotanet",
  storageBucket: "vnotanet.firebasestorage.app",
  messagingSenderId: "543091348816",
  appId: "1:543091348816:web:29c7d66c443681333f8855",
  measurementId: "G-VSJLGK2CHW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
