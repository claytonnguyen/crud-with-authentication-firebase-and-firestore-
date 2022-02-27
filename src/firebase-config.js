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

// const firebaseConfig = {
//     apiKey: process.env.API_KEY,
//     authDomain: process.env.AUTH_DOMAIN,
//     projectId: process.env.PROJECT_ID,
//     storageBucket: process.env.STORAGE_BUCKET,
//     messagingSenderId: process.env.MESSAGING_SENDER_ID,
//     appId: process.env.APP_ID,
//     measurementId: process.env.MEASUREMENT_ID
// };


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);