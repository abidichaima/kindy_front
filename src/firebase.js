// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpJEjBW6AL7Utipyrq7HjCXvvH1sfLFIA",
  authDomain: "elkindy-46c6e.firebaseapp.com",
  projectId: "elkindy-46c6e",
  storageBucket: "elkindy-46c6e.appspot.com",
  messagingSenderId: "272498403442",
  appId: "1:272498403442:web:336429a382c9b0ce187aeb",
  measurementId: "G-9VVENB8ZPM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)