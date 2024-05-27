import React, { useRef, useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from './ChatMessage';
import { storage } from '../App';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";

import { v4 } from "uuid";

import imgIcon from '../img.png'; // Import the image

function ChatRoom({ auth }) {
  const dummy = useRef();
  const messagesRef = firebase.firestore().collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages, loading, error] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState('');
  const [imageUpload, setImageUpload] = useState(null);

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL, displayName } = auth.currentUser;

    let imageUrl = null;
    if (imageUpload) {
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      const snapshot = await uploadBytes(imageRef, imageUpload);
      imageUrl = await getDownloadURL(snapshot.ref);
      setImageUpload(null); // Reset the image input after upload
    }

    if (formValue.trim() || imageUrl) {
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
        displayName,
        imageUrl,
      }).catch(error => {
        console.error("Error sending message: ", error);
      });

      setFormValue('');
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleFileChange = (e) => {
    setImageUpload(e.target.files[0]);
  };

  return (
    <>
      <main>
        {loading && <span>Loading...</span>}
        {error && <span>Error: {error.message}</span>}
        {messages && messages.map(msg => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <span ref={dummy}></span>
      </main>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Say something nice"
        />
        <label htmlFor="file-input" className="custom-file-upload">
          <img src={imgIcon} alt="Upload Icon" className="upload-icon" /></label>
        <input
          id="file-input"
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <button type="submit" disabled={!formValue.trim() && !imageUpload}>🕊️</button>
      </form>
    </>
  );
}

export default ChatRoom;
