import React, { useState } from 'react';
import './login.css';
import { FaUser, FaLock } from 'react-icons/fa';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../context/UserContext'; // Import useUserContext

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useUserContext(); // Access login function from UserContext

  const handleToggle = () => {
    setIsAdmin(!isAdmin);
    if (!isAdmin) {
      navigate('/admin-login');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setError(''); // Clear any previous errors

    axios.post('http://localhost:8081/user2', formData)
      .then(res => {
        if (res.data.success) {
          console.log("User login successful");
          login(formData); // Example: Store user data in context
          navigate('/home2'); // Redirect to Home2
        } else {
          console.log("failed");
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
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-input-group">
            <FaUser className="login-icon" />
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Username"
              value={formData.username}
              onChange={handleChange}
              className="login-input"
              required
            />
          </div>
          <div className="login-input-group">
            <FaLock className="login-icon" />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="login-input"
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
          <div className="login-toggle-group">
            <label className="login-toggle-label">
              <span>User</span>
              <Toggle
                defaultChecked={isAdmin}
                icons={false} // Remove the default icons
                onChange={handleToggle}
                className="custom-toggle"
              />
              <span>Admin</span>
            </label>
          </div>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p className="login-register-link">
          Don't have an account?{' '}
          <a href="#" onClick={() => navigate('/register')}>
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
