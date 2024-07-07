import React from "react";
import "./adminPage.css";
import { useNavigate } from 'react-router-dom';
import { FaHome, FaSignOutAlt, FaHotel, FaEdit, FaHistory, FaUsers, FaComments } from "react-icons/fa";
import addHotelGif from '../components/images/add4.gif'; // Ensure you have these GIFs in the appropriate folder
import editHotelGif from '../components/images/upd2.gif';
import viewUsersGif from '../components/images/user3.gif';
import viewBookingsGif from '../components/images/book1.gif';
import viewFeedbackGif from '../components/images/feed2.gif';

const AdminPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const handleAddHotel = () => {
    navigate('/addhotel');
  };
const handleEdithotel = ()=>{
  navigate('/Edithotel');
};
  const handleViewUsers = () => {
    navigate('/userlist');
  };

  const handleViewBookings = () => {
    navigate('/bookings');
  };

  const handleViewFeedback = () => {
    navigate('/feedbacklist');
  };

  return (
     <div className="admin-page">
      <header className="admin-header">
        <nav className="admin-nav">
          <a href="/" className="active">
            <FaHome className="admin-icon" />
          </a>
          <a href="#" className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt className="admin-icon" />
          </a>
        </nav>
      </header>
      <div className="admin-container">
        <h1 className="admin-title">Admin Dashboard</h1>
        <div className="admin-actions">
          <div className="admin-card" onClick={handleAddHotel}>
            <FaHotel className="option-icon" />
            <img src={addHotelGif} alt="Add Hotel" className="admin-card-gif" />
            <p>Add New Hotel</p>
          </div>
          <div className="admin-card" onClick={handleEdithotel}>
            <FaEdit className="option-icon" />
            <img src={editHotelGif} alt="Edit Hotel" className="admin-card-gif" />
            <p>Edit Existing Hotel</p>
          </div>
          <div className="admin-card" onClick={handleViewUsers}>
            <FaUsers className="option-icon" />
            <img src={viewUsersGif} alt="View Users" className="admin-card-gif" />
            <p>View Users</p>
          </div>
          <div className="admin-card" onClick={handleViewBookings}>
            <FaHistory className="option-icon" />
            <img src={viewBookingsGif} alt="View Bookings" className="admin-card-gif" />
            <p>View User Bookings</p>
          </div>
          <div className="admin-card" onClick={handleViewFeedback}>
            <FaComments className="option-icon" />
            <img src={viewFeedbackGif} alt="View Feedback" className="admin-card-gif" />
            <p>View Feedback</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
