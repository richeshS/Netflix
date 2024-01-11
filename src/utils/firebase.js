// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_C456L2KUP3fxdFoPEpgauAUxqtyRdDg",
  authDomain: "netflix-gpt-be41f.firebaseapp.com",
  projectId: "netflix-gpt-be41f",
  storageBucket: "netflix-gpt-be41f.appspot.com",
  messagingSenderId: "115219934014",
  appId: "1:115219934014:web:403555d77f9ea28b7eda6f",
  measurementId: "G-5LJR34DS7L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();