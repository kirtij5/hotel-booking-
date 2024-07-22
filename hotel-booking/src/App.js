// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AdminLogin from './components/AdminLogin';
import Home2 from './components/Home2';
import AdminPage from './components/AdminPage';
import AddHotel from './components/AddHotel';
import UserList from './components/UserList';
import BookingList from './components/BookingList';
import FeedbackList from './components/FeedbackList';
import HotelLista from './components/HotelLista';
import HotelDetails from './components/HotelDetails';
import HotelList from './components/HotelList';
import HotelInfo from './components/HotelInfo';
import ConfirmationPage from './components/ConfirmationPage';
import PaymentSuccess from './components/PaymentSuccess';
import FeedbackForm from './components/FeedbackForm';
import { UserProvider } from './context/UserContext';
import UpdateHotel from './components/UpdateHotel';


function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home2" element={<Home2 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/userList" element={<UserList />} />
          <Route path="/bookings" element={<BookingList />} />
          <Route path="/feedbacklist" element={<FeedbackList />} />
          <Route path="/AddHotel" element={<AddHotel />} />
          <Route path="/hotels/:Hotel_id" element={<HotelDetails />} />
          <Route path="/hotel-info" element={<HotelList />} />
          <Route path="/EditHotel" element={<HotelLista />} /> <Route path="/updateHotel/:Hotel_id" element={<UpdateHotel />} />
          <Route path="/hotel-info/:Hotel_id" element={<HotelInfo />} />
          <Route path="/confirmation/:hotelName/:roomType/:roomPrice" element={<ConfirmationPage />} />
          <Route path="/confirmation-success" element={<PaymentSuccess />} />
          <Route path="/feedback" element={<FeedbackForm />} />
 
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
