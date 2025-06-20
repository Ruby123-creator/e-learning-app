import React, { useState } from "react";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enquiry Submitted:", formData);
    // Here you can send data to your backend or display a success message
    alert("Your enquiry has been submitted!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      studentClass: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="form-container">
      <h4>Enquiry Form</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="name"
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
            id="email"
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
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div className="form-group">
          <select
            id="studentClass"
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
            id="message"
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
  );
};

export default EnquiryForm;
