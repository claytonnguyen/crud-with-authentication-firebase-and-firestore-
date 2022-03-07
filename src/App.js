import './App.css';
import Entry from './Entry';
import { db, signInWithGoogle, signOutWithGoogle } from './firebase-config';
import React, { useState, useEffect } from 'react';
import {collection, addDoc, query, onSnapshot, Timestamp, where } from 'firebase/firestore';

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
    const seconds = Math.round(new Date() / 1000);
    const milliseconds = Math.round(seconds / 10);
    await addDoc(entriesCollectionRef, {
      body: entry,
      uId: user.uid,
      createdAt: new Timestamp(seconds, milliseconds),
      lastUpdated: new Timestamp(seconds, milliseconds),
    });
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
    if (user !== null){
      const q = query(collection(db, "entries"), where("uId", "==", user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setEntries(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id })))
      }
    )}
    else{
      if(entries.length !== 0){
        setEntries([]);
      }
    }
  }, [entries, user])

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
        { user ?
        <textarea placeholder='what is your data' onChange={(e) => setEntry(e.target.value)}></textarea> :
        <h1>Sign In to Add a Blog</h1>
        }
        { user ? 
        <button onClick={postEntry}>Post Data</button> :
        <div></div>
        }
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
