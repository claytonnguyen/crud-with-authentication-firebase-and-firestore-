import './App.css';
import { db } from './firebase-config';
import React, { useState, useEffect } from 'react';
import {collection, getDocs, deleteDoc, addDoc, updateDoc, doc } from 'firebase/firestore';
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase


function App() {
  const [entries, setEntries] = useState([]);
  const entriesCollectionRef = collection(db, "entries")
  const [entry, setEntry] = useState("");

  // Post Request
  const postEntry = async () => {
    await addDoc(entriesCollectionRef, {body: entry});
    setEntry("");
  }

  // Put Request
  const putEntry = async (id, newBody) => {
    const newField ={ body: newBody }
    const entryDoc = doc(db, "entries", id)
    await updateDoc(entryDoc, newField);
  }

  // Delete Request
  const deleteEntry = async (id) => {
    const entryDoc = doc(db, "entries", id)
    await deleteDoc(entryDoc);
  }

  useEffect(() => {

    // Get Request
    const getEntries = async () => {
      const data = await getDocs(entriesCollectionRef);
      setEntries(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
    }

    getEntries();
  }, [entries])

  return (
    <div className="App">
      <header className="App-header">
        <textarea placeholder='what is your data' onChange={(e) => setEntry(e.target.value)}></textarea>
        <button onClick={postEntry}>Post Data</button>
        <h1>Journaling Time</h1>
        {entries.map((entry) => {
          return (
            <div>
                <h1>Entry: {entry.body}</h1>
                <textarea placeholder={entry.body}></textarea>
                <button onClick={(e) => {putEntry(entry.id, entry.body)}}>Update</button>
                <button onClick={() => {deleteEntry(entry.id)}}>Delete</button>
            </div>
          );
        })}
      </header>
    </div>
  );
}

export default App;
