import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKUO8DZ_swoUTaCAEGxSvHMwyWM5Ohj1A",
  authDomain: "onesight-challenge-98038.firebaseapp.com",
  projectId: "onesight-challenge-98038",
  storageBucket: "onesight-challenge-98038.appspot.com",
  messagingSenderId: "885338198224",
  appId: "1:885338198224:web:05fc821a5f75c6bbdd0ed5",
  measurementId: "G-HB2NJR5CNR",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
