import React, { useEffect, useState } from 'react';
import { db } from './firebase-config';
import {deleteDoc, updateDoc, doc, Timestamp } from 'firebase/firestore';

function Entry(props) {

    const [text, setText] = useState(props.entry.body);

    const {entry} = props;
    useEffect(() => {
        console.log(text)
    }, [text]);

      // Put Request
  const putEntry = async (id, newBody) => {
    const seconds = Math.round(new Date() / 1000);
    const milliseconds = Math.round(seconds / 10);
    const newField ={ 
      body: newBody,
      uId: props.entry.uId,
      createdAt: props.entry.createdAt,
      lastUpdated: new Timestamp(seconds, milliseconds)
    }
    const entryDoc = doc(db, "entries", id)
    await updateDoc(entryDoc, newField);
  }

  // Delete Request
  const deleteEntry = async (id) => {
    const entryDoc = doc(db, "entries", id)
    await deleteDoc(entryDoc);
  }

  return (
    <>
        <h1>Entry: {entry.body}</h1>
        <textarea defaultValue={text} placeholder={entry.body} onChange={(e) => {setText(e.target.value)}}></textarea>
        <button onClick={(e) => {putEntry(entry.id, text)}}>Update</button>
        <button onClick={() => {deleteEntry(entry.id)}}>Delete</button>
    </>
  )
}

export default Entry