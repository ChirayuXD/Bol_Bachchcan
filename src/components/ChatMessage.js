import React, { useState } from 'react';
import Modal from 'react-modal';
import firebase from 'firebase/compat/app';

function ChatMessage({ message }) {
  const { text, uid, photoURL, displayName, imageUrl } = message;
  const auth = firebase.auth();
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imageStyles, setImageStyles] = useState({});

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleImageLoad = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const imageAspectRatio = imageElement.width / imageElement.height;

    let maxWidth = windowWidth * 0.8;
    let maxHeight = windowHeight * 0.8;

    if (imageAspectRatio > 1) {
      // Landscape orientation
      if (imageElement.width > maxWidth) {
        const ratio = maxWidth / imageElement.width;
        maxHeight = imageElement.height * ratio;
      }
    } else {
      // Portrait orientation
      if (imageElement.height > maxHeight) {
        const ratio = maxHeight / imageElement.height;
        maxWidth = imageElement.width * ratio;
      }
    }

    setImageStyles({
      maxWidth: `${maxWidth}px`,
      maxHeight: `${maxHeight}px`,
    });
  };

  let imageElement = null;
  if (imageUrl) {
    imageElement = new Image();
    imageElement.src = imageUrl;
    imageElement.onload = handleImageLoad;
  }

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'pp.jpg'} alt="User Avatar" className='profile-picture' />
      <div className="message-content">
        <small className="username">{displayName}</small>
        {text && <p>{text}</p>}
        {imageUrl && (
          <>
            <img
              src={imageUrl}
              alt="Uploaded"
              className='uploaded-image'
              onClick={openModal}
            />
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Image Modal"
            >
              <button className="close-button" onClick={closeModal}>Close Modal</button>
              <img src={imageUrl} alt="Uploaded" className='modal-image' style={imageStyles} />
            </Modal>
          </>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;
