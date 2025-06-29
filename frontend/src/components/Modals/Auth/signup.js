import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Modal } from "@mui/material";
import profile from "../../../assets/images/profile.png";
import "./style.css";
import Otpverify from "./otpverify";
import { API_ENDPOINTS } from "../../../utils/api-endpoints";

const SignUpModal = ({ open, setOpen }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    class: "",
  });
  const [login, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const [openVerify, setOpenVerify] = useState(false);
  const [otpData, setOtpData] = useState({});
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const endpoint = login ? API_ENDPOINTS.LOGIN : API_ENDPOINTS.REGISTER;

    const payload = login
      ? {
          loginId: formData.email,
          password: formData.password,
        }
      : formData;

    const response = await axios.post(endpoint, payload);

    if (response.status === 200) {
      console.log("Response data:", response.data);

      if (!login) {
        // If register, proceed with OTP verify
        setToken(response?.data?.activationToken);
        setOpen(false);
        setOtpData(formData);
        setOpenVerify(true);
      } else {
        // If login, handle success
        alert("Login successful!");
        setOpen(false);
      }
    }
  } catch (error) {
    console.error("Error during sign-up/login:", error);
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="modalStyle">
          <div className="modal-header">
            <img src={profile} alt="profile" width={60} />
          </div>
          <h4>{login ? "Login" : "Register"}</h4>

          <form onSubmit={handleSubmit}>
            {!login && (
              <>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </>
            )}

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {!login && (
              <>
                <label htmlFor="phone">Phone No.</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </>
            )}

            {!login && (
              <>
                <label htmlFor="class">Class</label>

                <select
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                >
                  <option value="">-- Select --</option>
                  <option value="VI">Class 6</option>
                  <option value="VII">Class 7</option>
                  <option value="VIII">Class 8</option>
                  <option value="IX">Class 9</option>
                  <option value="X">Class 10</option>
                  <option value="XI">Class 11</option>
                  <option value="XII">Class 12</option>
                </select>
              </>
            )}

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={isLoading} className="common-btn">
              {isLoading ? "Please Wait..." : login ? "Login" : "Register"}
            </button>
          </form>

          <p>
            {login ? "Don't have an account?" : "Have an account?"}{" "}
            <span onClick={() => setLogin(!login)} className="toggle-link">
              {login ? "Register" : "Login"}
            </span>
          </p>
        </div>
      </Modal>
      <Otpverify
        open={openVerify}
        setOpenVerify={setOpenVerify}
        token={token}
        formData={otpData}
       
      />
    </div>
  );
};

export default SignUpModal;
