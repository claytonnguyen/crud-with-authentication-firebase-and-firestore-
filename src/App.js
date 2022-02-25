import './App.css';
import Doc from './Doc.js';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcGKdFl3Y7aVJlgZL96x085tBQIBvA5N8",
  authDomain: "journal-6c65a.firebaseapp.com",
  projectId: "journal-6c65a",
  storageBucket: "journal-6c65a.appspot.com",
  messagingSenderId: "216716225231",
  appId: "1:216716225231:web:2688630603cf1fe3e1e5ba",
  measurementId: "G-RHE0FF6T2S"
};

// require('dotenv').config();
// console.log(process.env);

// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
//   measurementId: process.env.MEASUREMENT_ID
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}

const cities = getCities(db).then(console.log("what the")).catch(err => {
  console.log(err);
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Journaling Time</h1>
        <Doc cities={cities}/>
      </header>
    </div>
  );
}

export default App;
