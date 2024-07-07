import React, { useState, useEffect } from 'react';
import './PopupMessage.css'; // Optional: Add your own CSS for styling

const PopupMessage = ({ message, setMessage }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            setTimeout(() => {
                setIsVisible(false);
                setMessage(''); // Clear the message after timeout
            }, 4000); // 4 seconds timeout
        }
    }, [message, setMessage]);

    return (
        <div className={`popup-message ${isVisible ? 'show' : ''}`}>
            <p>{message}</p>
        </div>
    );
};

export default PopupMessage;
