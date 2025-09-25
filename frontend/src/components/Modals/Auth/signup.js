import React, { useState } from "react";

import axios from "axios";
import { Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./style.css";
import Otpverify from "./otpverify";
import { API_ENDPOINTS } from "../../../utils/api-endpoints";
import { useUI } from "../../../context/ui.context";

import toaster from "../../common/toaster";

const SignUpModal = ({ open, setOpen }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    class: "",
    isAdmin: false,
  });
  const { userData, setUserData, isLogin } = useUI();
  console.log(userData, "MINKAIIII");
  const [login, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const [openVerify, setOpenVerify] = useState(false);
  const [otpData, setOtpData] = useState({});
  const [openLoginModal, setOpenLoginModal] = useState(false);

  //forgot password
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  // Add this state at the top
  const [isForgotLoading, setIsForgotLoading] = useState(false);

  // Update handleForgotPassword function
  const handleForgotPassword = async () => {
    if (!forgotEmail) return toaster("Please enter your email");
    setIsForgotLoading(true);
    try {
      const response = await axios.post(`${API_ENDPOINTS.FORGET_PASSWORD}`, {
        email: forgotEmail,
      });
      console.log("Email sent response:", response.data);
      toaster("Check your email for reset link");
      setOpenForgotPassword(false);
      setForgotEmail("");
    } catch (error) {
      console.error("Error sending email:", error?.response?.data?.message);
      toaster(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsForgotLoading(false);
    }
  };

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
      ? { loginId: formData.email, password: formData.password }
      : formData;

    const response = await axios.post(endpoint, payload);
    console.log("Response data:", response.data);

    // Handle registration flow
    if (!login) {
      if (response.status === 200 && response.data?.activationToken) {
        setToken(response.data.activationToken);
        setOtpData(formData);
        setOpen(false);
        setOpenVerify(true);
        toaster("Registration successfull");
      } else {
        toaster(response.data?.message || "Registration failed");
      }
      return; // stop further execution
    }

    // Handle login flow
    if (login) {
      if (response.status === 200 && response.data?.user) {
        localStorage.setItem("loginData", JSON.stringify(response.data.user));
        setUserData(response.data.user);
        toaster("Welcome back " + response.data.user.username);
        setOpen(false);
        window.location.reload();

      } else {
        toaster(response.data?.message || "Invalid email or password");
      }
    }

  } catch (error) {
    console.error("Error during sign-up/login:", error?.response?.data?.message);
    toaster(error?.response?.data?.message || "Something went wrong");
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
          <CloseIcon className="closeIcon" onClick={() => setOpen(false)} />

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
                <label>Are you?</label>
                <div className="radioGroup">
                  <label>
                    <input
                      type="radio"
                      name="isAdmin"
                      value={false}
                      checked={formData.isAdmin === false}
                      onChange={() =>
                        setFormData({ ...formData, isAdmin: false })
                      }
                    />
                    Student
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="isAdmin"
                      value={true}
                      checked={formData.isAdmin === true}
                      onChange={() =>
                        setFormData({ ...formData, isAdmin: true })
                      }
                    />
                    Admin
                  </label>
                </div>
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

            {login && (
              <p style={{ textAlign: "center", marginTop: "10px" }}>
                <span
                  onClick={() => {
                    setOpen(false);
                    setOpenForgotPassword(true);
                  }}
                  style={{ color: "#03897e", cursor: "pointer" }}
                >
                  Forgot Password?
                </span>
              </p>
            )}

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

      {/* Forgot Password Modal */}
      <Modal
        open={openForgotPassword}
        onClose={() => setOpenForgotPassword(false)}
        aria-labelledby="forgot-password-title"
      >
        <div className="modalStyle">
          <CloseIcon
            className="closeIcon"
            onClick={() => setOpenForgotPassword(false)}
          />
          <h4>Forgot Password</h4>
          <label htmlFor="forgotEmail">Email</label>
          <input
            type="email"
            name="forgotEmail"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            required
          />
          <button
            className="common-btn"
            onClick={handleForgotPassword}
            disabled={isForgotLoading}
          >
            {isForgotLoading ? "Sending..." : "Update Password"}
          </button>
        </div>
      </Modal>

      <Otpverify
        openVerify={openVerify}
        setOpenVerify={setOpenVerify}
        token={token}
        formData={otpData}
      />
    </div>
  );
};

export default SignUpModal;
