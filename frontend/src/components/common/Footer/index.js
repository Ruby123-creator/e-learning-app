import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaTelegram, FaWhatsapp } from "react-icons/fa";
import logo from "../../../assets/images/logo.png";

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

        {/* Contact Section */}
        <div className="footer-section contact-section">
          <h3>Contact Us</h3>
          <p><strong>Email:</strong> <a href="mailto:topicwiseinstitute@gmail.com">topicwiseinstitute@gmail.com</a></p>
          <p><strong>Phone:</strong> <a href="tel:+919717073123">+91-97170 73123</a></p>
          <p><strong>Address:</strong> Chotpur Rd, Sector 63, Noida, UP 201307</p>
        </div>

        {/* Social Section */}
        <div className="footer-section social-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/profile.php?id=61580439363580&rdid=vSddJsTpCYEZC24W&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AwGtoVzqs%2F#" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://youtube.com/@topicwiseinstitute?si=HWTnt94dRzdl7YfY" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            <a href="https://www.instagram.com/topicwiseinstitute?igsh=MTU0bzZlMTBzcm1pZg==" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://t.me/topicwiseinstitute" target="_blank" rel="noopener noreferrer"><FaTelegram /></a>
            <a href="https://chat.whatsapp.com/FSqheTz2PWG7ZMwNVZRWbS?mode=ems_share_t" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>

          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Topicwise Institute. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
