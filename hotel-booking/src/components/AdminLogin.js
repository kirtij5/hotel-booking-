import React, { useState } from 'react';
import './admin.css'; // Reusing the login.css for styling
import { FaUser, FaLock } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setError(''); // Clear any previous errors

    axios.post('http://localhost:8081/admin', formData)
      .then(res => {
        if (res.data.success) {
          console.log("Admin login successful");
          navigate('/admin'); // Redirect to admin dashboard
        } else {
          console.log("Login failed");
          setError('Invalid username or password');
        }
      })
      .catch(err => {
        console.error('Error during login:', err);
        setError('An error occurred. Please try again later.');
      });
  };

  return (
    <div className="login-container">
      <div className="login-glass-box">
        <h1 className="login-title">Admin Login</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-input-group">
            <FaUser className="login-icon" />
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="login-input-group">
            <FaLock className="login-icon" />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
         
        </form>
        {error && <p className="error-message">{error}</p>}
        <p className="login-register-link">
          Go back to {' '}
          <a href="#" onClick={() => navigate('/login')}>
            User Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
