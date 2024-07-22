import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./HotelList.css";

// Set the app element
Modal.setAppElement("#root"); // Make sure the ID matches the root element in your index.html

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:8081/hotels");
      setHotels(response.data);
      setFilteredHotels(response.data); // Set filtered hotels initially
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const openModal = (hotel) => {
    setSelectedHotel(hotel);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedHotel(null);
  };

  const handleHotelClick = (Hotel_id) => {
    navigate(`/hotel-info/${Hotel_id}`);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    const filteredData = hotels.filter((hotel) =>
      hotel.name.toLowerCase().includes(query)
    );
    setFilteredHotels(filteredData);
  };

  return (
    <div className="hotel-list-page">

      <section className="hotel-about">
        <div className="hotel-list-nav-container">
          <input
            type="text"
            placeholder="Search Hotels..."
            className="search-bar"
            onChange={handleSearchChange}
          />
        </div>
        <div className="hotelabout-content">
          <h2>We Offer the Best Prices and a Wide Range of Hotels</h2>
          <p>
            Whether you're looking for luxury, comfort, or budget-friendly
            options, we have something for everyone. Planning your next getaway?
            Look no further! Our selection of hotels caters to every traveler's
            needs and preferences. From luxurious accommodations with
            breathtaking views to cozy stays that won't break the bank.
          </p>
        </div>
      </section>

      <section className="hotel-cards-section">
       
        <div className="hotel-cards">
          {filteredHotels.map((hotel) => (
            <div key={hotel.id} className="hotel-card">
              <img
                src={`http://localhost:8081/${hotel.cover_image}`}
                alt={hotel.name}
                className="hotel-image"
                onClick={() => openModal(hotel)}
              />
              <div className="hotel-info">
                <h3 onClick={() => handleHotelClick(hotel.Hotel_id)}>{hotel.name}</h3>
                <p>{hotel.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Hotel Images Modal"
        className="modal"
        overlayClassName="overlay"
      >
        {selectedHotel && (
          <div className="modal-content">
            
            <div className="modal-images">
              <img
                src={`http://localhost:8081/${selectedHotel.cover_image}`}
                alt={selectedHotel.name}
                className="modal-image"
              />
            </div>
            <button className="close-button" onClick={closeModal}>
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default HotelList;
