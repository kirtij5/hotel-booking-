import React, { useState } from "react";
import axios from "axios";
import './FeedbackForm.css';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function FeedbackForm() {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0); // Added rating state
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const { user } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    
    axios
      .post("http://localhost:8081/submit-feedback", {
        username: user ? user.username : 'Guest',
        feedback,
        rating, // Include rating in the post request
      })
      .then((response) => {
        console.log(response.data);
        setShowPopup(true); // Show popup on successful submission
      })
      .catch((error) => {
        console.error("There was an error submitting the feedback!", error);
      });
  };

  const handlePopupClose = () => {
    setShowPopup(false); // Hide popup
    navigate('/home2'); // Navigate to home2
  };

  return (
    <div className="feedback-page">
      <div className="feedback-form-container">
        <h2>Feedback Form</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Your Username:</label>
          <br />
          <br />
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
            value={user ? user.username : 'Guest'}
            disabled // Make the username input read-only
          />
          <br />
          <br />
          <label htmlFor="feedback">Your Feedback:</label>
          <br />
          <br />
          <textarea
            id="feedback"
            name="feedback"
            rows="4"
            cols="50"
            placeholder="Enter your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
          <br />
          <br />
          <label htmlFor="rating">Rating:</label>
          <br />
          <br />
          <input
            id="rating"
            name="rating"
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value, 10))}
            required
          />
          <br />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>

      {/* Popup for feedback submission confirmation */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Feedback Submitted Successfully!</h3>
            <p>Your feedback has been received. Thank you!</p>
            <button onClick={handlePopupClose}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedbackForm;
