// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgSCcTxoz8hPRmJ0iDIbGWE7xNwNxP8Ns",
  authDomain: "lagbuy-academy.firebaseapp.com",
  projectId: "lagbuy-academy",
  storageBucket: "lagbuy-academy.firebasestorage.app",
  appId: "1:719846822464:web:1c32e9144dcddc919345a5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);