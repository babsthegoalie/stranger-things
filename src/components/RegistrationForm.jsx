import React, { useState } from 'react';

const RegistrationForm = ({ baseURL }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [usernameLengthError, setUsernameLengthError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Handle submit function triggered!");

    // Resetting previous error states
    setPasswordMatchError(false);
    setPasswordLengthError(false);
    setUsernameLengthError(false);

    if (formData.password !== formData.confirmPassword) {
      console.log("Password match error triggered!"); // Log to check if the condition triggers
      setPasswordMatchError(true);
      return;
    }

    if (formData.password.length < 6) {
      console.log("Password length error triggered!"); // Log to check if the condition triggers
      setPasswordLengthError(true);
      return;
    }

    if (formData.username.length < 3) {
      console.log("Username length error triggered!"); // Log to check if the condition triggers
      setUsernameLengthError(true);
      return;
    }

    try {
      const response = await fetch(`${baseURL}/users/register`, {
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
      // Assuming the result contains a token upon successful registration
      if (result.data && result.data.token) {
        // Save the token in state or sessionStorage
        // For state: setToken(result.data.token);
        // For sessionStorage: sessionStorage.setItem('token', result.data.token);
      }

        // Display the message to the user
        alert(result.data.message); // Display the success message to the user

        // Log the message to the console
        console.log(result.data.message); // Log the success message to the console
      
        console.log(result); // Log the entire result object to the console


      console.log(result);
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        minLength={3} // Minimum username length
        required
      />
      {usernameLengthError && <p className="error-message">Username must be at least 3 characters</p>}
      
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        minLength={6} // Minimum password length
        required
      />
      {passwordLengthError && <p className="error-message">Password must be at least 6 characters</p>}
      
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        minLength={6} // Minimum password length
        required
      />
      {passwordMatchError && <p className="error-message">Passwords do not match</p>}

      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;