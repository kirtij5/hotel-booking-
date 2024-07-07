// HotelLista.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HotelLista.css'; // Optional: Add your own CSS for styling
import PopupMessage from './PopupMessage'; // Import the PopupMessage component
const HotelLista = () => {
  const [hotels, setHotels] = useState([]);
  const [popupMessage, setPopupMessage] = useState('');
  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await axios.get('http://localhost:8081/hotels');
      setHotels(response.data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const handleDeleteHotel = async (hotelId, hotelName) => {
    try {
        await axios.delete(`http://localhost:8081/hotels/${hotelId}`); // Deleting a hotel by ID
        fetchHotels(); // Refresh the list after deletion

        // Set success message
        setPopupMessage(`${hotelName} deleted successfully!`);

        // Clear message after 3 seconds
        setTimeout(() => {
            setPopupMessage('');
        }, 3000);

    } catch (error) {
        console.error('Error deleting hotel:', error); // Error handling
        setPopupMessage(`Error deleting ${hotelName}. Please try again.`); // Display error message
    }
};
  return (
    <div className="admin-hotel-list-container">
      <h2>List of Hotels</h2>
      <div className="admin-hotel-list">
        {hotels.length === 0 ? (
          <p>No hotels found</p>
        ) : (
          hotels.map((hotel) => (
            <div key={hotel.id} className="admin-hotel-card">
              <img src={`http://localhost:8081/${hotel.cover_image}`} alt={hotel.name} />
              <div className="admin-hotel-details">
                <h3>{hotel.name}</h3>
                <p>Location: {hotel.location}</p>
              </div>
              <div className="admin-hotel-actions">
                
                <Link to={`/updateHotel/${hotel.id}`} className="admin-btn-update">Update</Link>
                <button onClick={() => handleDeleteHotel(hotel.id, hotel.name)} className="admin-btn-delete">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HotelLista;

