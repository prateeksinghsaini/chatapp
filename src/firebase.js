import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkcXxw_4V7Xs6Ey1Vj5SVLrlqqEwIblxk",
  authDomain: "chat-app-834a1.firebaseapp.com",
  projectId: "chat-app-834a1",
  storageBucket: "chat-app-834a1.appspot.com",
  messagingSenderId: "192809005249",
  appId: "1:192809005249:web:9175b2f1a550c0797ba440",
  measurementId: "G-JXYTDTRWKL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore(app)