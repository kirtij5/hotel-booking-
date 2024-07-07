// utils/auth.js
const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, 'your_secret_key'); // Replace 'your_secret_key' with your actual secret key
    return decoded;
  } catch (err) {
    console.error('Token verification error:', err);
    return null;
  }
};

module.exports = verifyToken;
