import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDFNXt5Sj5hQ9GdUcWUQG01Unly1TG9gRY",
  authDomain: "asistencia-mdph.firebaseapp.com",
  projectId: "asistencia-mdph",
  storageBucket: "asistencia-mdph.firebasestorage.app",
  messagingSenderId: "120689751665",
  appId: "1:120689751665:web:6fd47e3ba99211c8188dd0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app); 

export { app, auth, db };

