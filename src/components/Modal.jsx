import React from 'react';
import NewListingForm from './NewListingForm.jsx';

const Modal = ({ isOpen, onClose, baseURL, authToken, updatePosts }) => {
  const modalClassName = `modal ${isOpen ? 'open' : ''}`;

  return (
    <div className={modalClassName}>
      {isOpen && (
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <NewListingForm baseURL={baseURL} authToken={authToken} updatePosts={updatePosts} />
        </div>
      )}
    </div>
  );
};

export default Modal;