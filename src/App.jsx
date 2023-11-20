import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm.jsx';
import LoginForm from './components/LoginForm.jsx';
import PostList from './components/PostList.jsx';
import NewListingForm from './components/NewListingForm.jsx';
import Modal from './components/Modal.jsx';
import Search from './components/Search.jsx';
import './App.css';

function App() {
  const cohortName = '2306-FTB-MT-WEB-PT';
  const baseURL = `https://strangers-things.herokuapp.com/api/${cohortName}`;
  const [showModal, setShowModal] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

    // Assume a function to update the authToken after login
    const handleLogin = (token) => {
      setAuthToken(token);
    };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleNewListingFormSubmit = async (formData) => {
    try {
      const response = await fetch(`${baseURL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ post: formData }),
      });
  
      if (response.ok) {
        const newPost = await response.json();
        // Update state or perform necessary actions with the new post data
      } else {
        throw new Error('Failed to create listing');
      }

      // Close the modal after the form is submitted successfully
      closeModal();
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  };

  return (
    <>
     <div className="search-form">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div>
      <button className="create" onClick={openModal}>Create New Listing</button>
      <PostList />
      </div>
      {showModal && (
        <Modal isOpen={showModal} onClose={closeModal}>
          <NewListingForm
            baseURL={baseURL}
            authToken={authToken}
            updatePosts={() => {}} // Replace with your updatePosts function
            onSubmit={handleNewListingFormSubmit} // Pass the submit function to the form
          />
        </Modal>
      )}
      <div>
        <h3>Sign In</h3>
        <LoginForm baseURL={baseURL} />
        <h3>or Sign Up</h3>
        <RegistrationForm baseURL={baseURL} />
      </div>
    </>
  );
}

export default App;