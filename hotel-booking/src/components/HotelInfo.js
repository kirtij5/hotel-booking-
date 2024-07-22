import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import { useSpring, animated } from 'react-spring';
import 'react-datepicker/dist/react-datepicker.css';
import './HotelInfo.css';
import single from "../components/room/1.jpg";
import deluxe from "../components/room/12.jpg";
import presidential from "../components/room/18.jpg";
import penthouse from "../components/room/22.jpg";

const HotelInfo = () => {
  const navigate = useNavigate();
  const { Hotel_id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)); // Default check-out date to tomorrow
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [roomType, setRoomType] = useState('single');
  const [roomPrice, setRoomPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0); // State for total price
  const hotelDetailsRef = useRef(null);

  useEffect(() => {
    fetchHotelInfo();
  }, []);

  useEffect(() => {
    if (hotel) {
      setRoomPrice(getRoomPriceByType(roomType));
      calculateTotalPrice();
    }
  }, [hotel, roomType, checkInDate, checkOutDate, adults, children]);

  const fetchHotelInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/hotels/${Hotel_id}`);
      setHotel(response.data);
      setRoomPrice(response.data.single_room_price); // Default room price to single room
    } catch (error) {
      console.error('Error fetching hotel details:', error);
    }
  };

  // Calculate total price based on room price and number of nights
  const calculateTotalPrice = () => {
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const selectedRoomPrice = getRoomPriceByType(roomType);
    const totalPrice = nights * selectedRoomPrice;
    setTotalPrice(totalPrice);
  };

  // Get room price based on room type
  const getRoomPriceByType = (type) => {
    switch (type) {
      case 'single':
        return hotel.single_room_price;
      case 'deluxe':
        return hotel.deluxe_room_price;
      case 'presidential':
        return hotel.presidential_suite_price;
      case 'penthouse':
        return hotel.penthouse_price;
      default:
        return 0;
    }
  };

  const handleBookNow = () => {
    setModalIsOpen(true);
    scrollToTop();
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleBooking = async () => {
    try {
      const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
      const calculatedTotalPrice = nights * getRoomPriceByType(roomType);

      navigate(`/confirmation/${hotel.name}/${roomType}/${calculatedTotalPrice}`, {
        state: {
          hotelId: hotel.Hotel_id,
          hotelName:hotel.name,
          checkInDate: checkInDate.toISOString().split('T')[0],
          checkOutDate: checkOutDate.toISOString().split('T')[0],
          adults,
          children,
          roomType,
          totalPrice: calculatedTotalPrice,
        }
      });
      closeModal();
    } catch (error) {
      console.error('Error booking:', error);
      alert('Failed to book. Please try again.');
    }
  };

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
    if (date >= checkOutDate) {
      setCheckOutDate(new Date(date.getTime() + 24 * 60 * 60 * 1000)); // Set check-out date to the day after check-in date if it's before or equal to check-in date
    }
  };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
  };

  const modalAnimation = useSpring({
    opacity: modalIsOpen ? 1 : 0,
    transform: modalIsOpen ? 'translateY(0)' : 'translateY(-100%)',
  });

  const scrollToTop = () => {
    if (hotelDetailsRef.current) {
      hotelDetailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!hotel) {
    return <p>Loading...</p>;
  }

  return (
    <div className="hotelinfo-details-container" ref={hotelDetailsRef}>
      <h2 className='h2'>{hotel.name}</h2>
      <div className="hotelinfo-details">
        <div className="hotelinfo-cover-image">
          <img src={`http://localhost:8081/${hotel.cover_image}`} alt={hotel.name} />
        </div>
        <div className="hotelinfo-description">
          <div className="hotelinfo-description-glass">
            <h4>{hotel.description}</h4>
            <p>Location: {hotel.location}</p>
            <p>Address: {hotel.address}</p>
            <p>Email: {hotel.email}</p>
            <p>Phone Number: {hotel.phone_number}</p>
            <button onClick={handleBookNow} className="hotelinfo-book-now-button">Book Now</button>
          </div>
        </div>
      </div>
      <h2 className="hotelinfo-section-heading">Room Types</h2>
      <div className="hotelinfo-room-types">
        <div className="hotelinfo-room-type" onClick={() => setRoomType('single')}>
          <div className="hotelinfo-room-type-front">
            <img src={single} alt="Single Room" />
            <p>Single</p>
          </div>
          <div className="hotelinfo-room-type-back">
            <p>Single Room</p>
            <p>${hotel.single_room_price} / night</p>
          </div>
        </div>
        <div className="hotelinfo-room-type" onClick={() => setRoomType('deluxe')}>
          <div className="hotelinfo-room-type-front">
            <img src={deluxe} alt="Deluxe Room" />
            <p>Deluxe</p>
          </div>
          <div className="hotelinfo-room-type-back">
            <p>Deluxe Room</p>
            <p>${hotel.deluxe_room_price} / night</p>
          </div>
        </div>
        <div className="hotelinfo-room-type" onClick={() => setRoomType('presidential')}>
          <div className="hotelinfo-room-type-front">
            <img src={presidential} alt="Presidential Suite" />
            <p>Presidential</p>
          </div>
          <div className="hotelinfo-room-type-back">
            <p>Presidential Suite</p>
            <p>${hotel.presidential_suite_price} / night</p>
          </div>
        </div>
        <div className="hotelinfo-room-type" onClick={() => setRoomType('penthouse')}>
          <div className="hotelinfo-room-type-front">
            <img src={penthouse} alt="Penthouse" />
            <p>Penthouse</p></div>
            <div className="hotelinfo-room-type-back">
            <p>Penthouse</p>
            <p>${hotel.penthouse_price} / night</p>
          </div>
        </div>
      </div>
      <h2 className="hotelinfo-section-heading">Hotel Images</h2>
      <div className="hotelinfo-images-slider">
        {Array.isArray(hotel.hotel_images) && hotel.hotel_images.map((image, index) => (
          <img key={index} src={`http://localhost:8081/${image}`} alt={`Hotel Image ${index + 1}`} />
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Booking Modal"
        className="hotelinfo-modal"
        overlayClassName="hotelinfo-overlay"
      >
        <animated.div style={modalAnimation} className="hotelinfo-modal-content">
          <h2>Book Your Stay</h2>
          <div className="hotelinfo-modal-field">
            <label>Check-in Date:</label>
            <DatePicker
              selected={checkInDate}
              onChange={handleCheckInDateChange}
              minDate={new Date()} // Disable dates before today
              dateFormat="MM/dd/yyyy"
            />
          </div>
          <div className="hotelinfo-modal-field">
            <label>Check-out Date:</label>
            <DatePicker
              selected={checkOutDate}
              onChange={handleCheckOutDateChange}
              minDate={checkInDate} // Disable dates before check-in date
              dateFormat="MM/dd/yyyy"
            />
          </div>
          <div className="hotelinfo-modal-field">
            <label>Room Type:</label>
            <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
              <option value="single">Single</option>
              <option value="deluxe">Deluxe</option>
              <option value="presidential">Presidential</option>
              <option value="penthouse">Penthouse</option>
            </select>
          </div>
          <div className="hotelinfo-modal-field">
            <label>Adults:</label>
            <input type="number" value={adults} onChange={(e) => setAdults(Number(e.target.value))} min="1" />
          </div>
          <div className="hotelinfo-modal-field">
            <label>Children:</label>
            <input type="number" value={children} onChange={(e) => setChildren(Number(e.target.value))} min="0" />
          </div>
          <p>Total Price: ${totalPrice}</p>
          <button onClick={handleBooking} className="hotelinfo-modal-book-now-button">Proceed to Confirmation</button>
          <button onClick={closeModal} className="hotelinfo-modal-close-button">Close</button>
        </animated.div>
      </Modal>
    </div>
  );
};

export default HotelInfo;
