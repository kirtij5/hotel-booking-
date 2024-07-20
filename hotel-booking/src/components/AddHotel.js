import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './addHotel.css'; // Ensure this path is correct

const AddHotel = () => {
    const initialHotelDetails = {
        hotelName: '',
        hotelDescription: '',
        location: '',
        address: '',
        email: '',
        phoneNumber: '',
        singleRoomPrice: '',
        deluxeRoomPrice: '',
        presidentialSuitePrice: '',
        penthousePrice: '',
        coverImage: null,
        hotelImages: []
    };

    const [hotelDetails, setHotelDetails] = useState({ ...initialHotelDetails });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false); // State for popup visibility

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setHotelDetails({ ...hotelDetails, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'coverImage') {
            setHotelDetails({ ...hotelDetails, coverImage: files[0] });
        } else {
            setHotelDetails({ ...hotelDetails, hotelImages: files });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('hotelName', hotelDetails.hotelName);
        formData.append('hotelDescription', hotelDetails.hotelDescription);
        formData.append('location', hotelDetails.location);
        formData.append('address', hotelDetails.address);
        formData.append('email', hotelDetails.email);
        formData.append('phoneNumber', hotelDetails.phoneNumber);
        formData.append('singleRoomPrice', hotelDetails.singleRoomPrice);
        formData.append('deluxeRoomPrice', hotelDetails.deluxeRoomPrice);
        formData.append('presidentialSuitePrice', hotelDetails.presidentialSuitePrice);
        formData.append('penthousePrice', hotelDetails.penthousePrice);
        formData.append('coverImage', hotelDetails.coverImage);

        Array.from(hotelDetails.hotelImages).forEach((file) => {
            formData.append('hotelImages', file);
        });

        try {
            await axios.post('http://localhost:8081/addHotel', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setSuccessMessage('Hotel added successfully!');
            setShowPopup(true); // Show popup on successful submission
            setErrorMessage('');
            setHotelDetails({ ...initialHotelDetails }); // Reset form fields
        } catch (error) {
            console.error('Error adding hotel:', error);
            setErrorMessage('Failed to add hotel. Please try again.');
            setSuccessMessage('');
        }
    };

    const handlePopupClose = () => {
        setShowPopup(false); // Hide popup
        navigate('/admin'); // Navigate to admin page
    };

    return (
        <div className='addhotel'>
            <div className="container_add">
                <h2>ADD HOTEL</h2>
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="hotelName">Hotel Name</label>
                        <input
                            type="text"
                            id="hotelName"
                            name="hotelName"
                            value={hotelDetails.hotelName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="hotelDescription">Hotel Description</label>
                        <textarea
                            id="hotelDescription"
                            name="hotelDescription"
                            rows="4"
                            value={hotelDetails.hotelDescription}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={hotelDetails.location}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={hotelDetails.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={hotelDetails.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={hotelDetails.phoneNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="singleRoomPrice">Single Room Price</label>
                        <input
                            type="text"
                            id="singleRoomPrice"
                            name="singleRoomPrice"
                            value={hotelDetails.singleRoomPrice}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="deluxeRoomPrice">Deluxe Room Price</label>
                        <input
                            type="text"
                            id="deluxeRoomPrice"
                            name="deluxeRoomPrice"
                            value={hotelDetails.deluxeRoomPrice}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="presidentialSuitePrice">Presidential Suite Price</label>
                        <input
                            type="text"
                            id="presidentialSuitePrice"
                            name="presidentialSuitePrice"
                            value={hotelDetails.presidentialSuitePrice}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="penthousePrice">Penthouse Price</label>
                        <input
                            type="text"
                            id="penthousePrice"
                            name="penthousePrice"
                            value={hotelDetails.penthousePrice}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="coverImage">Cover Image</label>
                        <input
                            type="file"
                            id="coverImage"
                            name="coverImage"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="hotelImages">Hotel Images</label>
                        <input
                            type="file"
                            id="hotelImages"
                            name="hotelImages"
                            onChange={handleFileChange}
                            multiple
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>

            {/* Popup for hotel addition confirmation */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3>Hotel Added Successfully!</h3>
                        <p>Your hotel has been added. Thank you!</p>
                        <button onClick={handlePopupClose}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddHotel;
