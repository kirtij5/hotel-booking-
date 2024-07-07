const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const bodyParser = require('body-parser');
const app = express();
const verifyToken = require('./utils/auth'); 

app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // Parse JSON requests
 // Parse JSON requests

app.use('/uploads', express.static('uploads')); // Serving uploaded files

// MySQL connection configuration
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hotel_booking",
});

// Connect to MySQL database
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// File upload configuration using Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Home route
app.get('/', (req, res) => {
    return res.json("From Backend Side");
});

// Sign up route for users
app.post('/user', (req, res) => {
    const { username, email, password } = req.body;
    const sql = 'INSERT INTO user(username, email, password) VALUES (?, ?, ?)';
    const values = [username, email, password];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, error: 'Internal server error' });
        }
        return res.json({ success: true, message: 'User added successfully', data });
    });
});

// Admin login route
app.post('/admin', (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM admin WHERE username = ? AND password = ?";
    const values = [username, password];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, error: 'Internal server error' });
        }
        if (data.length > 0) {
            console.log('Login successful:', data);
            return res.json({ success: true, message: 'Login successful' });
        } else {
            console.log('Login failed: No record found');
            return res.json({ success: false, message: 'No record found' });
        }
    });
});

// User login route
app.post('/user2', (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM user WHERE username = ? AND password = ?";
    const values = [username, password];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, error: 'Internal server error' });
        }
        if (data.length > 0) {
            console.log('Login successful:', data);
            return res.json({ success: true, message: 'Login successful' });
        } else {
            console.log('Login failed: No record found');
            return res.json({ success: false, message: 'No record found' });
        }
    });
});

//user listing

app.get('/user', (req, res) => {
    const sql = "SELECT username, email FROM user"; // Add more fields as needed
    db.query(sql, (err, data) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ success: false, error: 'Internal server error' });
      }
      return res.json(data);
    });
  });

// Endpoint to add a hotel
app.post('/addHotel', upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'hotelImages', maxCount: 10 }
]), (req, res) => {
    const {
        hotelName, hotelDescription, location, address, email, phoneNumber,
        singleRoomPrice, deluxeRoomPrice, presidentialSuitePrice, penthousePrice
    } = req.body;

    const coverImage = req.files.coverImage ? req.files.coverImage[0].path : null;
    const hotelImages = req.files.hotelImages ? req.files.hotelImages.map(file => file.path) : [];

    const hotelDetailsSql = `INSERT INTO hotel_details 
                             (name, description, location, address, email, phone_number, cover_image, hotel_images, single_room_price, deluxe_room_price, presidential_suite_price, penthouse_price)
                             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const hotelDetailsValues = [
        hotelName, hotelDescription, location, address, email, phoneNumber,
        coverImage, JSON.stringify(hotelImages), singleRoomPrice, deluxeRoomPrice, presidentialSuitePrice, penthousePrice
    ];

    db.query(hotelDetailsSql, hotelDetailsValues, (err, result) => {
        if (err) {
            console.error('Error inserting hotel details:', err);
            return res.status(500).json({ success: false, error: 'Failed to add hotel. Please try again.' });
        }

        return res.json({ success: true, message: 'Hotel added successfully', hotelId: result.insertId });
    });
});

// Endpoint to update hotel details
app.put('/hotels/:id', (req, res) => {
    const hotelId = req.params.id;
    const {
        hotelName, hotelDescription, location, address, email, phoneNumber,
        singleRoomPrice, deluxeRoomPrice, presidentialSuitePrice, penthousePrice
    } = req.body;

    const query = `
        UPDATE hotel_details SET
        name = ?, description = ?, location = ?, address = ?, email = ?, phone_number = ?,
        single_room_price = ?, deluxe_room_price = ?, presidential_suite_price = ?, penthouse_price = ?
        WHERE id = ?
    `;

    const values = [
        hotelName, hotelDescription, location, address, email, phoneNumber,
        singleRoomPrice, deluxeRoomPrice, presidentialSuitePrice, penthousePrice, hotelId
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating hotel details:', err);
            return res.status(500).json({ success: false, error: 'Failed to update hotel details.' });
        }

        return res.json({ success: true, message: 'Hotel updated successfully' });
    });
});



// Endpoint to delete hotel by ID
app.delete('/hotels/:id', (req, res) => {
    const { id } = req.params;
    const deleteHotelSql = "DELETE FROM hotel_details WHERE id = ?";

    // Delete hotel details
    db.query(deleteHotelSql, id, (err, result) => {
        if (err) {
            console.error('Error deleting hotel:', err);
            return res.status(500).json({ success: false, error: 'Internal server error' });
        }

        // Return success message
        return res.json({ success: true, message: 'Hotel deleted successfully' });
    });
});

// Endpoint to fetch hotel details
app.get('/hotels', (req, res) => {
    const sql = "SELECT id, name, location, cover_image FROM hotel_details";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, error: 'Internal server error' });
        }
        return res.json(data);
    });
});

// Endpoint to fetch a single hotel details by ID
app.get('/hotels/:id', (req, res) => {
    const hotelId = req.params.id;

    const getHotelSql = 'SELECT * FROM hotel_details WHERE id = ?';

    db.query(getHotelSql, [hotelId], (err, results) => {
        if (err) {
            console.error('Error fetching hotel details:', err);
            return res.status(500).json({ success: false, error: 'Failed to fetch hotel details. Please try again.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Hotel not found' });
        }

        const hotel = results[0];
        // Parse hotel_images from JSON string to array
        hotel.hotel_images = JSON.parse(hotel.hotel_images);

        return res.json(hotel);
    });
});
// server.js
app.get('/user', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1]; // Extract token from Bearer header
    if (!token) {
      return res.status(400).json({ success: false, error: 'Token missing' });
    }
  
    // Assuming you have a function to verify the token and get the user info
    const userInfo = verifyToken(token); // Implement this function to return user info from token
  
    if (!userInfo) {
      return res.status(401).json({ success: false, error: 'Invalid token' });
    }
  
    const sql = "SELECT id FROM user WHERE username = ?";
    db.query(sql, [userInfo.username], (err, data) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ success: false, error: 'Internal server error' });
      }
      if (data.length > 0) {
        return res.json({ success: true, user_id: data[0].id });
      } else {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
    });
  });
  
// Handle bookings insertion
app.post('/bookings', (req, res) => {
    const { hotel_id, username, check_in_date, check_out_date, adults, children, room_type, total_price } = req.body;
  
    const sql = `INSERT INTO bookings 
                 (hotel_id, username, check_in_date, check_out_date, adults, children, room_type, total_price) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  
    const values = [hotel_id, username, check_in_date, check_out_date, adults, children, room_type, total_price];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting booking details:', err);
        return res.status(500).json({ success: false, error: 'Failed to book. Please try again.' });
      }
  
      console.log('Booking inserted:', result);
      return res.json({ success: true, message: 'Booking successful', bookingId: result.insertId });
    });
  });
// Fetch all bookings with hotel names
app.get('/bookings', (req, res) => {
    const sql = `
        SELECT b.*, h.name
        FROM bookings b
        INNER JOIN hotel_details h ON b.hotel_id = h.id
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching bookings:', err);
            return res.status(500).json({ success: false, error: 'Failed to fetch bookings. Please try again.' });
        }

        return res.status(200).json({ success: true, bookings: results });
    });
});



  
//feedback

app.post('/submit-feedback', (req, res) => {
    const { username, feedback, rating } = req.body;

    const query = 'INSERT INTO feedback (username, feedback, rating) VALUES (?, ?, ?)';
    db.query(query, [username, feedback, rating], (error, results) => {
        if (error) {
            res.status(500).send('Error saving feedback');
        } else {
            res.status(200).send('Feedback saved successfully');
        }
    });
});

//Feedback listing

app.get('/feedback', (req, res) => {
    const sql = 'SELECT * FROM feedback';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
