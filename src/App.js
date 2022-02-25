import './App.css';
import { db } from './firebase-config';
import Doc from './Doc.js';
import React, { useState, useEffect } from 'react';
import {collection, getDocs} from 'firebase/firestore';
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase




function App() {
  const [entries, setEntries] = useState([]);
  const entriesCollectionRef = collection(db, "entries")
  useEffect(() => {
    const getEntries = async () => {
      const data = await getDocs(entriesCollectionRef);
      setEntries(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
    }

    getEntries();
  }, [entries])

  return (
    <div className="App">
      <header className="App-header">
        <formControl>
          <textarea placeholder='yoo'></textarea>
        </formControl>
        <h1>Journaling Time</h1>
        {entries.map((entry) => {
          return (
            <div>
              <h1>Entry: {entry.body}</h1>
            </div>
          );
        })}
      </header>
    </div>
  );
}

export default App;
