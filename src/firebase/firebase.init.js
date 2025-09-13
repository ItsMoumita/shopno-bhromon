// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBd23evFUevmnQnJMORs8mAUrBEZuTkr5g",
  authDomain: "shopno-bhromon.firebaseapp.com",
  projectId: "shopno-bhromon",
  storageBucket: "shopno-bhromon.firebasestorage.app",
  messagingSenderId: "86843792537",
  appId: "1:86843792537:web:860f148ff222cc59332c08"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);


