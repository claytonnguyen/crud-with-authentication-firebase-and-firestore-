import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAcGKdFl3Y7aVJlgZL96x085tBQIBvA5N8",
    authDomain: "journal-6c65a.firebaseapp.com",
    projectId: "journal-6c65a",
    storageBucket: "journal-6c65a.appspot.com",
    messagingSenderId: "216716225231",
    appId: "1:216716225231:web:2688630603cf1fe3e1e5ba",
    measurementId: "G-RHE0FF6T2S"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);