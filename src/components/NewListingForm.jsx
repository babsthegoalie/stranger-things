import React, { useState } from 'react';

const NewListingForm = ({ baseURL, authToken, updatePosts }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '[On Request]',
    willDeliver: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseURL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ post: formData }),
      });

      const newPost = await response.json();

      // Update state with the new post
      updatePosts(newPost.data.post);
      // Handle success feedback or update UI as needed here
    } catch (error) {
      console.error('Error creating new post:', error);
      // Handle error cases
    }
  };

  return (
    <form className="new-listing-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      
    

      <button className="create" type="submit">Create Listing</button>
    </form>
  );
};

export default NewListingForm;