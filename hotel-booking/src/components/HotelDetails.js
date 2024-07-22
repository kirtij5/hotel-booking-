// HotelDetails.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './HotelDetails.css'; // Optional: Add your own CSS for styling

const HotelDetails = () => {
    const { Hotel_id } = useParams(); // Get the hotel ID from the URL parameter
    const [hotel, setHotel] = useState(null); // State to hold hotel details

    useEffect(() => {
        fetchHotelDetails(); // Fetch hotel details when the component mounts
    }, []);

    const fetchHotelDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/hotels/${Hotel_id}`); // Fetch hotel details by ID
            setHotel(response.data); // Set fetched hotel details to state
        } catch (error) {
            console.error('Error fetching hotel details:', error); // Error handling
        }
    };

    const handleDeleteHotel = async () => {
        try {
            await axios.delete(`http://localhost:8081/hotels/${Hotel_id}`); // Delete hotel by ID
            // Redirect to hotel list or any other page after deletion
            // Example: navigate('/hotels');
        } catch (error) {
            console.error('Error deleting hotel:', error); // Error handling
        }
    };

    if (!hotel) {
        return <p>Loading...</p>; // Display loading message until hotel details are fetched
    }

    return (
        <div className="hotel-details-container">
            <h2>{hotel.name}</h2>
            <div className="hotel-details">
                <img src={`http://localhost:8081/${hotel.cover_image}`} alt={hotel.name} />
                <div className="hotel-info">
                    <p>Location: {hotel.location}</p>
                    <p>Description: {hotel.description}</p>
                    <p>Address: {hotel.address}</p>
                    <p>Email: {hotel.email}</p>
                    <p>Phone Number: {hotel.phone_number}</p>
                    <p>Single Room Price: {hotel.single_room_price}</p>
                    <p>Deluxe Room Price: {hotel.deluxe_room_price}</p>
                    <p>Presidential Suite Price: {hotel.presidential_suite_price}</p>
                    <p>Penthouse Price: {hotel.penthouse_price}</p>
                </div>
                <div className="hotel-images">
                        {JSON.parse(hotel.hotel_images).map((img, index) => (
                            <img key={index} src={`http://localhost:8081/${img}`} alt={`Hotel ${index + 1}`} />
                        ))}
                    </div>
            </div>
            
        </div>
    );
};

export default HotelDetails;
