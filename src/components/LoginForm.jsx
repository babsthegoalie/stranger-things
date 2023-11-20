import React, { useState } from 'react';

const LoginForm = ({ baseURL }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [loginError, setLoginError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseURL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username: formData.username,
            password: formData.password,
          },
        }),
      });

      const result = await response.json();

      if (result.success && result.data && result.data.token) {
        // Handle successful login - token storage, redirection, etc.
        // For instance:
        localStorage.setItem('token', result.data.token);
        // Redirect or update state to reflect logged-in status
      } else {
        setLoginError(true);
      }
    } catch (err) {
      console.error(err);
      // Handle error
      setLoginError(true);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      
      {loginError && <p className="error-message">Incorrect username or password</p>}

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;