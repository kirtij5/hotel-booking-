import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import avatar1 from './avatars/avatar1.jpg';
import avatar2 from './avatars/avatar2.jpg';
import avatar3 from './avatars/avatar3.jpg';
import avatar4 from './avatars/avatar4.jpg';
import avatar5 from './avatars/avatar5.jpg';
import avatar6 from './avatars/avatar6.jpg';
import avatar7 from './avatars/avatar7.jpg';
import avatar8 from './avatars/avatar8.jpg';
import avatar9 from './avatars/avatar9.jpg';
import avatar10 from './avatars/avatar10.jpg';
import avatar11 from './avatars/avatar11.jpg';
import avatar12 from './avatars/avatar12.jpg';
import avatar13 from './avatars/avatar13.jpg';
import avatar14 from './avatars/avatar14.jpg';
import './FeedbackList.css';

function FeedbackList() {
    const [feedbackList, setFeedbackList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const testimonialsPerPage = 3;
    const sliderRef = useRef(null);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:8081/feedback')
            .then(response => {
                setFeedbackList(response.data); // Check if response.data contains multiple items
            })
            .catch(error => {
                console.error('There was an error fetching the feedback!', error);
            });
    }, []);

    // Function to select avatar image based on index
    const selectAvatar = (index) => {
        switch (index % 14) { // Assuming 14 avatars based on imported avatars
            case 0:
                return avatar1;
            case 1:
                return avatar2;
            case 2:
                return avatar3;
            case 3:
                return avatar4;
            case 4:
                return avatar5;
            case 5:
                return avatar6;
            case 6:
                return avatar7;
            case 7:
                return avatar8;
            case 8:
                return avatar9;
            case 9:
                return avatar10;
            case 10:
                return avatar11;
            case 11:
                return avatar12;
            case 12:
                return avatar13;
            case 13:
                return avatar14;
            default:
                return avatar1;
        }
    };

    // Function to render star ratings with yellow stars
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;

        // Render full stars
        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={i} className="fas fa-star star-yellow"></i>);
        }

        // Render half star if applicable
        if (halfStar) {
            stars.push(<i key="half-star" className="fas fa-star-half-alt star-yellow"></i>);
        }

        // Render empty stars to complete 5 stars
        const remainingStars = 5 - stars.length;
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<i key={`empty-${i}`} className="far fa-star star-yellow"></i>);
        }

        return stars;
    };

    // Handle touch events for slider effect
    const handleTouchStart = (e) => {
        const slider = sliderRef.current;
        setStartX(e.touches[0].clientX - slider.offsetLeft);
        setScrollLeft(slider.scrollLeft);
    };

    const handleTouchMove = (e) => {
        const slider = sliderRef.current;
        const x = e.touches[0].clientX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Adjust sensitivity here
        slider.scrollLeft = scrollLeft - walk;
    };

    return (
        <div className="feedback-list-container">
        
            <div
                ref={sliderRef}
                className="testimonial-slider"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
            >
                <div className="testimonial-cards">
                    {feedbackList.map((feedback, index) => (
                        <div className="testimonial-card" key={feedback.id}>
                            <div className="avatar">
                                <img
                                    src={selectAvatar(index)}
                                    alt="Avatar"
                                />
                            </div>
                            <div className="content">
                                <p className="feedback">{feedback.feedback}</p>
                                <p className="username">{feedback.username}</p>
                                <div className="rating">
                                    {renderStars(feedback.rating)}
                                </div>
                               
                            </div>
                            
                        </div>
                        
                    ))} 
                </div>
            </div>
        </div>
    );
}

export default FeedbackList;
