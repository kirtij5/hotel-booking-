import React, { useState } from "react";
import axios from "axios";
import './FeedbackForm.css';
import { useUserContext } from '../context/UserContext';

function FeedbackForm() {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0); // Added rating state
  const { user } = useUserContext();

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
        alert("Feedback submitted successfully");
      })
      .catch((error) => {
        console.error("There was an error submitting the feedback!", error);
      });
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
    </div>
  );
}

export default FeedbackForm;
