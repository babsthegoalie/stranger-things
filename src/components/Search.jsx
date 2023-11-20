import React, { useState, useEffect } from 'react';

function Search() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch('https://strangers-things.herokuapp.com/api/2306-FTB-MT-WEB-PT/posts')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.posts);
        setSearchResults(data.posts); // Initialize search results with all posts
      })
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  function postMatches(post, text) {
    return (
      post.title.toLowerCase().includes(text.toLowerCase()) ||
      post.description.toLowerCase().includes(text.toLowerCase()) ||
      post.price.toLowerCase().includes(text.toLowerCase())
    );
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredPosts = posts.filter((post) => postMatches(post, searchTerm));
    setSearchResults(filteredPosts);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div>
        {searchResults.map((post) => (
          <div key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <p>Price: {post.price}</p>
            {/* Display other relevant post information */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
