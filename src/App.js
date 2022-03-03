import './App.css';
import Entry from './Entry';
import { db, signInWithGoogle, signOutWithGoogle } from './firebase-config';
import React, { useState, useEffect } from 'react';
import {collection, addDoc, query, onSnapshot } from 'firebase/firestore';

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
  const [user, setUser] = useState(null);


  const signIn = () => {
    signInWithGoogle().then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      console.log(name);
      console.log(email);
      setUser(result.user)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const signOut = () => {
    signOutWithGoogle().then(() =>{
      console.log("signedOut");
      setUser(null);
    })
    .catch((error) => {
      console.log(error)
    })
  }
  

  // Post Request
  const postEntry = async () => {
    await addDoc(entriesCollectionRef, {body: entry});
    setEntry("");
  }


  useEffect(() => {
    // const entriesCollectionRef = collection(db, "entries")
    // // Get Request
    // const getEntries = async () => {
    //   const data = await getDocs(entriesCollectionRef);
    //   setEntries(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
    // }
    // getEntries();
    const q = query(collection(db, "entries"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setEntries(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id })))
    }, [entries])})

  // useEffect(() => {
  //   const auth = getAuth();
  //   setUser(auth.currentUser);
  //   if(user){
  //     console.log(user.displayName)
  //   } else {
  //     console.log("No user")
  //   }
  // }, [user])

  return (
    <div className="App">
      <header className="App-header">
        <textarea placeholder='what is your data' onChange={(e) => setEntry(e.target.value)}></textarea>
        <button onClick={postEntry}>Post Data</button>
        <h1>Journaling Time</h1>
        {user ? <button onClick={signOut}>Sign Out</button> : <button id="SignIn" onClick={signIn}>Sign In</button>}
        {user ? <h1>You signed in Kizzy, {user.displayName}</h1> : <h1>Sign In Kizzy</h1>}
        {entries.map((entry) => {
          return <Entry entry={entry}/>
        })}
      </header>
    </div>
  );
}

export default App;
