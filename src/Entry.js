import React, { useEffect, useState } from 'react';
import { db } from './firebase-config';
import {deleteDoc, updateDoc, doc } from 'firebase/firestore';

function Entry(props) {

    const [text, setText] = useState("");

    const {entry} = props;
    useEffect(() => {
        console.log(text)
    }, [text]);

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

  return (
    <>
        <h1>Entry: {entry.body}</h1>
        <textarea placeholder={entry.body} onChange={(e) => {setText(e.target.value)}}>{entry.body}</textarea>
        <button onClick={(e) => {putEntry(entry.id, text)}}>Update</button>
        <button onClick={() => {deleteEntry(entry.id)}}>Delete</button>
    </>
  )
}

export default Entry