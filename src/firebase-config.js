import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: "AIzaSyAcGKdFl3Y7aVJlgZL96x085tBQIBvA5N8",
//     authDomain: "journal-6c65a.firebaseapp.com",
//     projectId: "journal-6c65a",
//     storageBucket: "journal-6c65a.appspot.com",
//     messagingSenderId: "216716225231",
//     appId: "1:216716225231:web:2688630603cf1fe3e1e5ba",
//     measurementId: "G-RHE0FF6T2S"
// };

// const firebaseConfig = {
//     apiKey: "AIzaSyCm86LYGx9gJnuDEGYh1KpROwn2OUIiWeQ",
//     authDomain: "fake-b22d5.firebaseapp.com",
//     projectId: "fake-b22d5",
//     storageBucket: "fake-b22d5.appspot.com",
//     messagingSenderId: "1099253475977",
//     appId: "1:1099253475977:web:ef133ac8f65099d3eb7458",
//     measurementId: "G-DLHTGJSZQG"
//   };

  const firebaseConfig = {
    apiKey: "AIzaSyBMxQ4-5lYVlGYGvdjTcU0i4nR_XLaVzho",
    authDomain: "new-fake.firebaseapp.com",
    projectId: "new-fake",
    storageBucket: "new-fake.appspot.com",
    messagingSenderId: "1025779881350",
    appId: "1:1025779881350:web:9abd91b5a627c388b64807",
    measurementId: "G-DBLDKXTLR8"
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

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const signInWithGoogle =  () => signInWithPopup(auth, provider);


export const signOutWithGoogle = async () => signOut(auth);