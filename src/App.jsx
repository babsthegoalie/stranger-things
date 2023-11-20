import { useState, useEffect } from 'react';
import './App.css';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const cohortName = '2306-FTB-MT-WEB-PT';
    const baseURL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

    const fetchPosts = async () => {
      try {
        const response = await fetch(`${baseURL}/posts`);
        const data = await response.json();
        setPosts(data.data.posts); // Update state with fetched posts
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container">
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h3>{post.title} | {post.price}</h3>
            <p>{post.description}</p>

          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <>
      <div>
        <PostList />
      </div>
    </>
  );
}

export default App;