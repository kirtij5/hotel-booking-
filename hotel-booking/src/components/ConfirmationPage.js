import React, { useState, useEffect } from 'react';
import { useUserContext } from '../context/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import './ConfirmationPage.css'; // Import the CSS file


const ConfirmationPage = () => {
  const { user } = useUserContext(); // Fetch user from context
  const location = useLocation();
  const navigate = useNavigate();
  const { checkInDate, checkOutDate, adults, children, totalPrice, hotelName } = location.state;
  const [showCreditCardPopup, setShowCreditCardPopup] = useState(false);
  const [showPaypalPopup, setShowPaypalPopup] = useState(false);
  const [showGPayPopup, setShowGPayPopup] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [showFeedbackPrompt, setShowFeedbackPrompt] = useState(false);
  const [creditCardDetails, setCreditCardDetails] = useState({ cardNumber: '', expirationDate: '', cvv: '' });
  const [paypalEmail, setPaypalEmail] = useState('');
  const [gpayNumber, setGpayNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 19000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const validateCreditCard = () => {
    const { cardNumber, expirationDate, cvv } = creditCardDetails;
    if (cardNumber.length !== 16) {
      setErrorMessage('Card number must be 16 digits');
      return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(expirationDate)) {
      setErrorMessage('Expiration date must be in MM/YY format');
      return false;
    }
    if (cvv.length !== 3) {
      setErrorMessage('CVV must be 3 digits');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const validatePaypal = () => {
    if (!paypalEmail.includes('@')) {
      setErrorMessage('Invalid PayPal email address');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const validateGpay = () => {
    if (gpayNumber.length < 10 || isNaN(gpayNumber)) {
      setErrorMessage('GPay number must be at least 10 digits and numeric');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handlePayment = (method) => {
    let isValid = false;
    switch (method) {
      case 'credit_card':
        isValid = validateCreditCard();
        break;
      case 'paypal':
        isValid = validatePaypal();
        break;
      case 'gpay':
        isValid = validateGpay();
        break;
      default:
        isValid = false;
    }

    if (!isValid) {
      return;
    }

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
        savePaymentDetails(user?.username || 'Guest', method);
        setTimeout(() => {
          setBookingConfirmed(true);
          setShowFeedbackPrompt(true);
        }, 1000); // Clear booking confirmed message after 1 second
      })
      .catch(error => {
        console.error('Error confirming booking:', error);
        alert('Failed to confirm booking. Please try again.');
      });
  };

  const savePaymentDetails = (username, paymentMethod) => {
    fetch('http://localhost:8081/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, payment_method: paymentMethod }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Payment details saved:', data);
      })
      .catch(error => {
        console.error('Error saving payment details:', error);
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
      <div className="glass-container">
        <h2>Booking Confirmation</h2>
        <div className="confirmation-details">
          <p><strong>Username:</strong> {user?.username || 'Guest'}</p>
          <p><strong>Hotel Name:</strong> {hotelName}</p>
          <p><strong>Check-in Date:</strong> {checkInDate}</p>
          <p><strong>Check-out Date:</strong> {checkOutDate}</p>
          <p><strong>Adults:</strong> {adults}</p>
          <p><strong>Children:</strong> {children}</p>
          <p><strong>Total Price:</strong> ${totalPrice}</p>
        </div>
        <br/><br/>
        <div className="payment-options">
          <h3>Payment Options</h3>
          <button onClick={openCreditCardPopup}>Pay with Credit Card</button>
          <button onClick={openPaypalPopup}>Pay with PayPal</button>
          <button onClick={openGPayPopup}>Pay with GPay</button>
        </div>
      </div>

      {/* Credit Card Popup */}
      {showCreditCardPopup && (
        <div className="payment-popup">
          <div className="popup-content">
            <h3>Credit Card Payment</h3>
            <input type="text" placeholder="Card Number" onChange={(e) => setCreditCardDetails({ ...creditCardDetails, cardNumber: e.target.value })} />
            <input type="text" placeholder="Expiration Date (MM/YY)" onChange={(e) => setCreditCardDetails({ ...creditCardDetails, expirationDate: e.target.value })} />
            <input type="text" placeholder="CVV" onChange={(e) => setCreditCardDetails({ ...creditCardDetails, cvv: e.target.value })} />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
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
            <input type="text" placeholder="PayPal Email" onChange={(e) => setPaypalEmail(e.target.value)} />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
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
            <input type="text" placeholder="GPay Number" onChange={(e) => setGpayNumber(e.target.value)} />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button onClick={() => handlePayment('gpay')}>Pay Now</button>
            <button onClick={closeGPayPopup}>Close</button>
          </div>
        </div>
      )}

 {/* Booking Confirmed Message */}
 {bookingConfirmed && (
        <div className="booking-confirmed">
          <div className="white-box">
            <h3>Booking Confirmed!</h3>
            <p>Hotel: {hotelName}</p>
            <p>Check-in Date: {checkInDate}</p>
            <p>Check-out Date: {checkOutDate}</p>
            <p><strong>Thank you for your payment!</strong></p>
          </div>
        </div>
      )}
      {/* Feedback Prompt */}
      {showFeedbackPrompt && (
        <div className="feedback-prompt">
          <p>Do you want to leave feedback?</p>
          <button onClick={() => handleFeedbackResponse('yes')}>Yes</button>
          <button onClick={() => handleFeedbackResponse('no')}>No</button>
        </div>
      )}
    </div>
  );
};

export default ConfirmationPage;
