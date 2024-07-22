import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookingsList.css';

const BookingList = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get('http://localhost:8081/bookings');
            setBookings(response.data.bookings);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="booking-list">
            <h2>Booking List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>Username</th>
                        <th>Hotel Name</th>
                        <th>Check-in Date</th>
                        <th>Check-out Date</th>
                        <th>Adults</th>
                        <th>Children</th>
                        <th>Room Type</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.booking_id}>
                            <td>{booking.booking_id}</td>
                            <td>{booking.username}</td>
                            <td>{booking.name}</td>
                            <td>{formatDate(booking.check_in_date)}</td>
                            <td>{formatDate(booking.check_out_date)}</td>
                            <td>{booking.adults}</td>
                            <td>{booking.children}</td>
                            <td>{booking.room_type}</td>
                            <td>${booking.total_price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingList;
