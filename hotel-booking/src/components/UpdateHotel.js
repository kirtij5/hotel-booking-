import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import './UpdateHotel.css'; // Optional: Add your own CSS for styling

Modal.setAppElement('#root'); // Required for accessibility

const UpdateHotel = () => {
    const { Hotel_id } = useParams(); // Get hotel ID from URL
    const navigate = useNavigate();
    const [hotelDetails, setHotelDetails] = useState({
        hotelName: '',
        hotelDescription: '',
        location: '',
        address: '',
        email: '',
        phoneNumber: '',
        singleRoomPrice: '',
        deluxeRoomPrice: '',
        presidentialSuitePrice: '',
        penthousePrice: ''
    });
    
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        fetchHotelDetails(); // Fetch hotel details when the component mounts
    }, [Hotel_id]);

    const fetchHotelDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/hotels/${Hotel_id}`);
            setHotelDetails({
                hotelName: response.data.name || '',
                hotelDescription: response.data.description || '',
                location: response.data.location || '',
                address: response.data.address || '',
                email: response.data.email || '',
                phoneNumber: response.data.phone_number || '',
                singleRoomPrice: response.data.single_room_price || '',
                deluxeRoomPrice: response.data.deluxe_room_price || '',
                presidentialSuitePrice: response.data.presidential_suite_price || '',
                penthousePrice: response.data.penthouse_price || ''
            });
        } catch (error) {
            console.error('Error fetching hotel details:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setHotelDetails({ ...hotelDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8081/hotels/${Hotel_id}`, hotelDetails);
            setSuccessMessage('Hotel updated successfully!');
            setErrorMessage('');
            setModalIsOpen(true); // Open modal on success

            setTimeout(() => {
                setModalIsOpen(false); // Close modal after 3 seconds
                navigate('/Edithotel'); // Redirect to hotel list after modal closes
            }, 2000);
        } catch (error) {
            console.error('Error updating hotel:', error);
            setErrorMessage('Failed to update hotel. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="updatehotel">
            <div className="container_update">
                <h2>Update Hotel</h2>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="hotelName">Hotel Name</label>
                        <input type="text" id="hotelName" name="hotelName" value={hotelDetails.hotelName} onChange={handleInputChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="hotelDescription">Hotel Description</label>
                        <textarea id="hotelDescription" name="hotelDescription" rows="4" value={hotelDetails.hotelDescription} onChange={handleInputChange} required></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input type="text" id="location" name="location" value={hotelDetails.location} onChange={handleInputChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" id="address" name="address" value={hotelDetails.address} onChange={handleInputChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={hotelDetails.email} onChange={handleInputChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input type="text" id="phoneNumber" name="phoneNumber" value={hotelDetails.phoneNumber} onChange={handleInputChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="singleRoomPrice">Single Room Price</label>
                        <input type="text" id="singleRoomPrice" name="singleRoomPrice" value={hotelDetails.singleRoomPrice} onChange={handleInputChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="deluxeRoomPrice">Deluxe Room Price</label>
                        <input type="text" id="deluxeRoomPrice" name="deluxeRoomPrice" value={hotelDetails.deluxeRoomPrice} onChange={handleInputChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="presidentialSuitePrice">Presidential Suite Price</label>
                        <input type="text" id="presidentialSuitePrice" name="presidentialSuitePrice" value={hotelDetails.presidentialSuitePrice} onChange={handleInputChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="penthousePrice">Penthouse Price</label>
                        <input type="text" id="penthousePrice" name="penthousePrice" value={hotelDetails.penthousePrice} onChange={handleInputChange} required />
                    </div>

                    <button type="submit">Update Hotel</button>
                </form>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Success Message"
                className="success-modal"
                overlayClassName="success-modal-overlay"
            >
                <h2>{successMessage}</h2>
            </Modal>
        </div>
    );
};

export default UpdateHotel;
