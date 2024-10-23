// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDollAHrm2LwAVnBgYbFN8Ilhgfvi5kPtQ",
  authDomain: "assignment-2-4eef0.firebaseapp.com",
  projectId: "assignment-2-4eef0",
  storageBucket: "assignment-2-4eef0.appspot.com",
  messagingSenderId: "204538906083",
  appId: "1:204538906083:web:b7df046f76c3cffdb70cd6",
  measurementId: "G-C44N6V7BYL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);