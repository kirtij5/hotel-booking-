import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import './HotelLista.css'; // Optional: Add your own CSS for styling

Modal.setAppElement('#root'); // Required for accessibility

const HotelLista = () => {
  const [hotels, setHotels] = useState([]);
  const [popupMessage, setPopupMessage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

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

  const openModal = (hotel) => {
    setSelectedHotel(hotel);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedHotel(null);
    setModalIsOpen(false);
  };

  const handleDeleteHotel = async () => {
    if (selectedHotel) {
      try {
        await axios.delete(`http://localhost:8081/hotels/${selectedHotel.Hotel_id}`); // Deleting a hotel by ID
        fetchHotels(); // Refresh the list after deletion

        // Set success message
        setPopupMessage(`${selectedHotel.name} deleted successfully!`);

        // Clear message after 3 seconds
        setTimeout(() => {
          setPopupMessage('');
        }, 3000);

        closeModal();
      } catch (error) {
        console.error('Error deleting hotel:', error); // Error handling
        setPopupMessage(`Error deleting ${selectedHotel.name}. Please try again.`); // Display error message
        closeModal();
      }
    }
  };

  return (
    <div className="admin-hotel-list-container">
      <h2>List of Hotels</h2>
      {popupMessage && <div className="popup-message">{popupMessage}</div>}
      <div className="admin-hotel-list">
        {hotels.length === 0 ? (
          <p>No hotels found</p>
        ) : (
          hotels.map((hotel) => (
            <div key={hotel.Hotel_id} className="admin-hotel-card">
              <img src={`http://localhost:8081/${hotel.cover_image}`} alt={hotel.name} />
              <div className="admin-hotel-details">
                <h3>{hotel.name}</h3>
                <p>Location: {hotel.location}</p>
              </div>
              <div className="admin-hotel-actions">
                <Link to={`/updateHotel/${hotel.Hotel_id}`} className="admin-btn-update">Update</Link>
                <button onClick={() => openModal(hotel)} className="admin-btn-delete">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Deletion"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete {selectedHotel?.name}?</p>
        <button onClick={handleDeleteHotel} className="confirm-btn">OK</button>
        <button onClick={closeModal} className="cancel-btn">Cancel</button>
      </Modal>
    </div>
  );
};

export default HotelLista;
