import React, { useState } from "react";
import { API_ENDPOINTS } from "../../utils/api-endpoints";
import axios from "axios";
import toaster from "../../components/common/toaster";

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    studentClass: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // destructure formData to match your backend payload
    const { name, email, phone, studentClass, message } = formData;
    const payload = {
      name,
      email,
      phoneNumber: phone,      // backend expects phoneNumber
      class: studentClass,     // backend expects class
      message,
    };

    // send POST request
    const response = await axios.post(API_ENDPOINTS.ADD_ENQUERY, payload);

    console.log("Enquiry Submitted:", response.data);
    
    toaster("Your enquiry has been submitted!");

    // reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      studentClass: "",
      subject: "",
      message: "",
    });
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    alert("Something went wrong. Please try again.");
  }
};

  return (
    <div className="enquiry-form">
      <div className="form-container">
        <h4>Enquiry Form</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="form-group">
            <select
              name="studentClass"
              value={formData.studentClass}
              onChange={handleChange}
              required
            >
              <option value="">Select your class</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={`Class ${i + 1}`}>
                  Class {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here"
              rows="5"
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryForm;
