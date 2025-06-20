import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from "../../../assets/images/logo.png"; // Adjust the path to your logo image
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo Section */}
        <div className="footer-section logo-section">
          <img src={logo} alt="Company Logo" className="footer-logo" />
          <p className="footer-description">
            We are dedicated to providing top-notch educational resources and personalized learning experiences.
          </p>
        </div>

        {/* Contact Information */}
        <div className="footer-section contact-section">
          <h3>Contact Us</h3>
          <p>
            <strong>Email:</strong> <a href="mailto:topicwiseinstitute@gmail.com">topicwiseinstitute.com</a>
          </p>
          <p>
            <strong>Phone:</strong> <a href="tel:+91-9911412558">+91-9911-412-558</a>
          </p>
          <p>
            <strong>Address:</strong> 123 Education Lane, Knowledge City, Country
          </p>
        </div>

        {/* Social Media */}
        <div className="footer-section social-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Topicwise Institute. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
