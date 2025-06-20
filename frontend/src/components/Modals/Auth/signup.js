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
  });
  const [login, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token,setToken] = useState('');
 const [openVerify, setOpenVerify] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const endpoint = login ? API_ENDPOINTS.LOGIN : API_ENDPOINTS.REGISTER;
      const response = await axios.post(endpoint, formData);

      if (response.status === 200) {
        console.log("Response data:", response.data);
        setToken(response?.data?.activationToken);
        // Handle success logic, e.g., close modal, show success message
        setOpen(false);

        setOpenVerify(true);
       
      }
    } catch (error) {
      console.error("Error during sign-up/login:", error);
      // Show error feedback to the user
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

            <label htmlFor="email">{login ? "Email/Username" : "Email"}</label>
            <input
              type={login ? "text" : "email"}
              name={login ? "username" : "email"}
              value={formData[login ? "username" : "email"]}
              onChange={handleChange}
              required
            />

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
      <Otpverify open={openVerify} setOpen = {(e)=>setOpenVerify(e)} token={token}/>
    </div>
  );
};



export default SignUpModal;
