import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './ConfirmationPage.css'; // Import the CSS file
import videoBackground from '../components/images/h2.mp4'; // Import the video file

const ConfirmationPage = () => {
  const { user } = useUserContext(); // Fetch user from context
  const location = useLocation();
  const navigate = useNavigate();
  const { checkInDate, checkOutDate, adults, children, totalPrice } = location.state;
  const [showCreditCardPopup, setShowCreditCardPopup] = useState(false);
  const [showPaypalPopup, setShowPaypalPopup] = useState(false);
  const [showGPayPopup, setShowGPayPopup] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [showFeedbackPrompt, setShowFeedbackPrompt] = useState(false);

  // Function to handle payment and booking confirmation
  const handlePayment = (method) => {
    console.log(`Selected payment method: ${method}`);

    const bookingDetails = {
      hotel_id: location.state.hotelId,
      username: user?.username || 'Guest', // Use username from context
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
      adults,
      children,
      room_type: location.state.roomType,
      total_price: totalPrice,
    };

    fetch('http://localhost:8081/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingDetails),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Booking confirmation:', data);
        setBookingConfirmed(true);
        setTimeout(() => {
          setBookingConfirmed(false);
          setShowFeedbackPrompt(true);
        }, 2000); // Clear booking confirmed message after 2 seconds
      })
      .catch(error => {
        console.error('Error confirming booking:', error);
        alert('Failed to confirm booking. Please try again.');
      });
  };

  const handleFeedbackResponse = (response) => {
    if (response === 'yes') {
      navigate('/feedback');
    } else {
      navigate('/home2');
    }
  };

  const openCreditCardPopup = () => {
    setShowCreditCardPopup(true);
    setShowPaypalPopup(false); // Close other popups
    setShowGPayPopup(false);
  };

  const closeCreditCardPopup = () => {
    setShowCreditCardPopup(false);
  };

  const openPaypalPopup = () => {
    setShowPaypalPopup(true);
    setShowCreditCardPopup(false); // Close other popups
    setShowGPayPopup(false);
  };

  const closePaypalPopup = () => {
    setShowPaypalPopup(false);
  };

  const openGPayPopup = () => {
    setShowGPayPopup(true);
    setShowCreditCardPopup(false); // Close other popups
    setShowPaypalPopup(false);
  };

  const closeGPayPopup = () => {
    setShowGPayPopup(false);
  };

  return (
    <div className="confirmation-page">
      <video className="video-background" autoPlay loop muted>
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="glass-container">
        <h2>Booking Confirmation</h2>
        <div className="confirmation-details">
          <p><strong>Username:</strong> {user?.username || 'Guest'}</p>
          <p><strong>Check-in Date:</strong> {checkInDate}</p>
          <p><strong>Check-out Date:</strong> {checkOutDate}</p>
          <p><strong>Adults:</strong> {adults}</p>
          <p><strong>Children:</strong> {children}</p>
          <p><strong>Total Price:</strong> ${totalPrice}</p>
        </div>
        <div className="payment-options">
          <h3>Payment Options</h3>
          <button onClick={openCreditCardPopup}>Pay with Credit Card</button>
          <button onClick={openPaypalPopup}>Pay with PayPal</button>
          <button onClick={openGPayPopup}>Pay with GPay</button>
        </div>
        <Link to="/">Back to Home</Link>
      </div>

      {/* Credit Card Popup */}
      {showCreditCardPopup && (
        <div className="payment-popup">
          <div className="popup-content">
            <h3>Credit Card Payment</h3>
            {/* Demo inputs */}
            <input type="text" placeholder="Card Number" />
            <input type="text" placeholder="Expiration Date" />
            <input type="text" placeholder="CVV" />
            <button onClick={() => handlePayment('credit_card')}>Pay Now</button>
            <button onClick={closeCreditCardPopup}>Close</button>
          </div>
        </div>
      )}

      {/* PayPal Popup */}
      {showPaypalPopup && (
        <div className="payment-popup">
          <div className="popup-content">
            <h3>PayPal Payment</h3>
            {/* Demo inputs */}
            <input type="text" placeholder="PayPal Email" />
            <button onClick={() => handlePayment('paypal')}>Pay Now</button>
            <button onClick={closePaypalPopup}>Close</button>
          </div>
        </div>
      )}

      {/* GPay Popup */}
      {showGPayPopup && (
        <div className="payment-popup">
          <div className="popup-content">
            <h3>GPay Payment</h3>
            {/* Demo inputs */}
            <input type="text" placeholder="GPay Email or Number" />
            <button onClick={() => handlePayment('gpay')}>Pay Now</button>
            <button onClick={closeGPayPopup}>Close</button>
          </div>
        </div>
      )}

      {/* Booking confirmed message */}
      {bookingConfirmed && (
        <div className="booking-confirmed">
          <p>Booking confirmed!</p>
        </div>
      )}

      {/* Feedback Prompt */}
      {showFeedbackPrompt && (
        <div className="feedback-prompt">
          <p>Booking confirmed! Do you want to leave feedback?</p>
          <button onClick={() => handleFeedbackResponse('yes')}>Yes</button>
          <button onClick={() => handleFeedbackResponse('no')}>No</button>
        </div>
      )}
    </div>
  );
};

export default ConfirmationPage;
