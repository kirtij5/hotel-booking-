// src/components/PaymentSuccess.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect back to home2 after submitting feedback
    setTimeout(() => {
      navigate('/home2');
    }, 100000);
  }, []);

  const handleLeaveFeedback = () => {
    navigate('/feedback');
  };

  return (
    <div>
      <h2>Payment Successful!</h2>
      <p>Your booking is confirmed.</p>
      <button onClick={handleLeaveFeedback}>Leave Feedback</button>
    </div>
  );
};

export default PaymentSuccess;
