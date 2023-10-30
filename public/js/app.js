// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCS1D4QbWjDyfdmOhPtQZcDwMhS5_nmfxA",
  authDomain: "metaverse-explorer-game-298b6.firebaseapp.com",
  databaseURL: "https://metaverse-explorer-game-298b6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "metaverse-explorer-game-298b6",
  storageBucket: "metaverse-explorer-game-298b6.appspot.com",
  messagingSenderId: "440963002699",
  appId: "1:440963002699:web:c1b798ca409a2a287638ce",
  measurementId: "G-QRJSZT539W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);