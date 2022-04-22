// Import the functions you need from the SDKs you need
import * as firebase_app from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {

  apiKey: "AIzaSyAIuVXoH-aV_h_ddBEzO7P1v763GRPwbXU",
  authDomain: "setupyourbussiness.firebaseapp.com",
  projectId: "setupyourbussiness",
  storageBucket: "setupyourbussiness.appspot.com",
  messagingSenderId: "135917045128",
  appId: "1:135917045128:web:ccb58ea596ff552060263d",
  measurementId: "G-E3BWK345DF"
};

// Initialize Firebase

const app = firebase_app.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firebase_db = getFirestore(app)
export const firebase_storage = getStorage(app)