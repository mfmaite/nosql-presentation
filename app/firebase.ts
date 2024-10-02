// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZGS732gaNcva3jBRHE8te6E5mK9ZQ1VM",
  authDomain: "nosql-presentation-9a3fd.firebaseapp.com",
  projectId: "nosql-presentation-9a3fd",
  storageBucket: "nosql-presentation-9a3fd.appspot.com",
  messagingSenderId: "329842318558",
  appId: "1:329842318558:web:fc6d32cc9a04f7cb9ff64f",
  measurementId: "G-1RVXH5LCW8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseClient = getDatabase(app);
export const analytics = getAnalytics(app);
