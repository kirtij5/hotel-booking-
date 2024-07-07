// src/components/Register.js

import React, { useState } from 'react';
import './register.css';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      username,
      email,
      password,
    };

    axios.post('http://localhost:8081/user', userData)
      .then(response => {
        console.log('User added:', response.data);

        // Clear form after submission (optional)
        setUsername('');
        setEmail('');
        setPassword('');

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      })
      .catch(error => {
        console.error('There was an error adding the user!', error);
      });
  };

  return (
    <div className="register-container">
      
      <div className="register-glass-box">
        <h1 className="register-title">Register</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-input-group">
            <FaUser className="register-icon" />
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="register-input-group">
            <FaEnvelope className="register-icon" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="register-input-group">
            <FaLock className="register-icon" />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="register-button">Submit</button>
        </form>
        <p className="register-login-link">
          Already have an account?{' '}
          <a href="#" onClick={() => navigate('/login')}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;