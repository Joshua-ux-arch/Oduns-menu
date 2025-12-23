import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBEzPEiclF75PQVfOcvIZYE13lyMBJ-mXo",
  authDomain: "oduns-menu.firebaseapp.com",
  projectId: "oduns-menu",
  storageBucket: "oduns-menu.firebasestorage.app",
  messagingSenderId: "620857593962",
  appId: "1:620857593962:web:88984cc6ea6c929bd73a13"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
