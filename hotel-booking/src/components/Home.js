import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSignInAlt,
  faInfoCircle,
  faComments,
  faPhone,
  faEnvelope,
  faFax,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin
} from "react-icons/fa";
import BookingImage from "../components/images/giphy.gif";
import bestPricesImage from "../components/images/Price.gif";
import customerReviewsImage from "../components/images/ratings.gif";
import FeedbackList from './FeedbackList';
import { TimelineLite, SlowMo, Elastic } from 'gsap/all';
const Home = () => {
  const navigate = useNavigate();
  const aboutSectionRef = useRef(null);
  const testimonialsSectionRef = useRef(null); // Ref for testimonials section
  const contactSectionRef = useRef(null); // Ref for contact section
  const [activeLink, setActiveLink] = useState(null); // State for active link

  const handleLogin = () => {
    navigate("/login");
  };

  const scrollToAbout = () => {
    const aboutSectionOffset = aboutSectionRef.current.offsetTop;
    window.scrollTo({
      top: aboutSectionOffset - 100,
      behavior: "smooth"
    });
  };

  const scrollToTestimonials = () => {
    const testimonialsSectionOffset = testimonialsSectionRef.current.offsetTop;
    window.scrollTo({
      top: testimonialsSectionOffset - 100,
      behavior: "smooth"
    });
  };

  const scrollToContact = () => {
    const contactSectionOffset = contactSectionRef.current.offsetTop;
    window.scrollTo({
      top: contactSectionOffset - 100,
      behavior: "smooth"
    });
  };


  return (
    <div className="home-container">
      <header>
        <nav>
          <div
            className={`nav-link ${activeLink === "home" ? "active" : ""}`}
            onMouseEnter={() => setActiveLink("home")}
            onMouseLeave={() => setActiveLink(null)}
          >
            <span className="nav-text">Home</span>
            <FontAwesomeIcon icon={faHome} className="icon" />
          </div>
          <div
            className={`nav-link ${activeLink === "login" ? "active" : ""}`}
            onClick={handleLogin}
            onMouseEnter={() => setActiveLink("login")}
            onMouseLeave={() => setActiveLink(null)}
          >
            <span className="nav-text">Login</span>
            <FontAwesomeIcon icon={faSignInAlt} className="icon" />
          </div>
          <div
            className={`nav-link ${activeLink === "about" ? "active" : ""}`}
            onClick={scrollToAbout} // Scroll to About Us section
            onMouseEnter={() => setActiveLink("about")}
            onMouseLeave={() => setActiveLink(null)}
          >
            <span className="nav-text">About Us</span>
            <FontAwesomeIcon icon={faInfoCircle} className="icon" />
          </div>
          <div
            className={`nav-link ${
              activeLink === "testimonials" ? "active" : ""
            }`}
            onClick={scrollToTestimonials} // Scroll to Testimonials section
            onMouseEnter={() => setActiveLink("testimonials")}
            onMouseLeave={() => setActiveLink(null)}
          >
            <span className="nav-text">Testimonials</span>
            <FontAwesomeIcon icon={faComments} className="icon" />
          </div>
          <div
            className={`nav-link ${activeLink === "contact" ? "active" : ""}`}
            onClick={scrollToContact} // Scroll to Contact Us section
            onMouseEnter={() => setActiveLink("contact")}
            onMouseLeave={() => setActiveLink(null)}
          >
            <span className="nav-text">Contact Us</span>
            <FontAwesomeIcon icon={faPhone} className="icon" />
          </div>
        </nav>
      </header>

      <section className="home-section">
        <div className="home-content">
          <h1>InstaStay</h1>
          <p>Your ultimate destination for finding the perfect stay for your next adventure.</p>
          <div className="explore-button" onClick={handleLogin}>
  Explore Hotels
  <div className="fizzy-particles"></div>
  <div className="fizzy-particles1"></div>  
  <div className="fizzy-particles2"></div>  
  <div className="fizzy-particles3"></div>  
  <div className="fizzy-particles4"></div>  
  <div className="fizzy-particles5"></div>  
  <div className="fizzy-particles6"></div>  
  <div className="fizzy-particles7"></div>  
  <div className="fizzy-particles8"></div>  
  <div className="fizzy-particles9"></div>  
  <div className="fizzy-particles10"></div>  
  <div className="fizzy-particles11"></div>  
  <div className="fizzy-particles12"></div> 
  <div className="fizzy-particles13"></div>  
  <div className="fizzy-particles14"></div>  
  <div className="fizzy-particles15"></div> 
</div>

        </div>
      </section>

      <section ref={aboutSectionRef} className="about-section">
        <div className="about-content">
          <h2>About Us</h2>
          <p>
            InstaStay is your go-to platform for discovering and booking the ideal accommodations tailored to your needs. Whether it's a luxurious hotel suite or a cozy bed and breakfast, we ensure your stay is as memorable as your destination.
          </p>
        </div>

        <div className="about-features">
          <div className="feature-card">
            <h3>Easy Booking</h3>
            <img src={BookingImage} alt="Approximate Image" className="approx-image" />
            <p>Effortlessly find and book your perfect stay with a few clicks.</p>
          </div>

          <div className="feature-card">
            <h3>Best Prices</h3>
            <img src={bestPricesImage} alt="Approximate Image" className="approx-image" />
            <p>Get the best rates available with our price comparison feature.</p>
          </div>

          <div className="feature-card">
            <h3>Customer Reviews</h3>
            <img src={customerReviewsImage} alt="Approximate Image" className="approx-image" />
            <p>Explore genuine reviews from fellow travelers to make informed decisions.</p>
          </div>
        </div>
      </section>

      <section ref={testimonialsSectionRef} className="testimonials-section">
        <div className="testimonials-content">
          <h2>Testimonials</h2>
          <div className="testimonials-slider">
            <FeedbackList />
          </div>
        </div>
      </section>
      
      <section ref={contactSectionRef} className="contact-section">
        <div className="contact-content glassmorphism">
          <div className="closing-line">
            <h2>Contact Us</h2>
            <p>
              We're here to help. Reach out to us for any inquiries or support.
            </p>
          </div>
          <div className="contact-info">
            <div className="info-item">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="info-icon" />
              <p>High Cliff Tower,Los Angeles,USA</p>
            </div>
            <div className="info-item">
              <FontAwesomeIcon icon={faPhone} className="info-icon" />
              <p>+91 123456789</p>
            </div>
            <div className="info-item">
              <FontAwesomeIcon icon={faEnvelope} className="info-icon" />
              <p>contact@instastay.com</p>
            </div>
            <div className="info-item">
              <FontAwesomeIcon icon={faFax} className="info-icon" />
              <p>+91 987654321</p>
            </div>
          </div>
          <div className="social-media">
            <h3>Get Connected with Us</h3>
            <div className="social-icons">
              <a href="#">
                <FaFacebook className="social-icon" />
              </a>
              <a href="#">
                <FaInstagram className="social-icon" />
              </a>
              <a href="#">
                <FaLinkedin className="social-icon" />
              </a>
            </div>
          </div>
        </div>
        <div className="copyright-section">
          <p>&copy; 2024 All rights reserved || @INSTASTAY__</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
