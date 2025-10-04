import React, { useState } from "react";
import axios from "axios";
import { Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./style.css";
import Otpverify from "./otpverify";
import { API_ENDPOINTS } from "../../../utils/api-endpoints";
import { useUI } from "../../../context/ui.context";
import toaster from "../../common/toaster";

const SignUpModal = ({ open, setOpen }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    class: "",
    isAdmin: false,
  });

  const [errors, setErrors] = useState({});
  const [login, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // OTP state
  const [token, setToken] = useState("");
  const [openVerify, setOpenVerify] = useState(false);
  const [otpData, setOtpData] = useState({});

  // Forgot password
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [isForgotLoading, setIsForgotLoading] = useState(false);

  const { setUserData } = useUI();

  /** ---------------- Form Validations ---------------- */
  const validateForm = () => {
    let newErrors = {};

    if (!login) {
      if (!formData.username.trim())
        newErrors.username = "Username is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.class) newErrors.class = "Please select a class";
    }

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email";

    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!login) {
      if (!formData.confirmPassword.trim())
        newErrors.confirmPassword = "Confirm password is required";
      else if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** ---------------- Forgot Password ---------------- */
  const handleForgotPassword = async () => {
    if (!forgotEmail) return toaster("Please enter your email");

    setIsForgotLoading(true);
    try {
      const res = await axios.post(API_ENDPOINTS.FORGET_PASSWORD, {
        email: forgotEmail,
      });
      toaster("Check your email for reset link");
      setOpenForgotPassword(false);
      setForgotEmail("");
    } catch (err) {
      toaster(err?.response?.data?.message || "Something went wrong");
    } finally {
      setIsForgotLoading(false);
    }
  };

  /** ---------------- Handle Change ---------------- */
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "radio" ? value === "true" : value,
    });
  };

  /** ---------------- Handle Submit ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const endpoint = login ? API_ENDPOINTS.LOGIN : API_ENDPOINTS.REGISTER;

      const payload = login
        ? { loginId: formData.email, password: formData.password }
        : {
            username: formData.username,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            class: formData.class,
            isAdmin: formData.isAdmin,
            status: (formData?.isAdmin ? "deactive":"active")
          };

      const res = await axios.post(endpoint, payload);

      if (!login) {
        // Registration
        if (res.status === 200 && res.data?.activationToken) {
          setToken(res.data.activationToken);
          setOtpData(formData);
          setOpen(false);
          setOpenVerify(true);
          toaster("Registration successful! Verify OTP.");

          setFormData({
            username: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            class: "",
            isAdmin: false,
          });
        } else toaster(res.data?.message || "Registration failed");
      } else {
        // Login
        if (res.status === 200 && res.data?.user) {
          localStorage.setItem("loginData", JSON.stringify(res.data.user));
          setUserData(res.data.user);
          toaster("Welcome back " + res.data.user.username);
          setOpen(false);
          window.location.reload();
        } else toaster(res.data?.message || "Invalid credentials");
      }
    } catch (err) {
      toaster(err?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* ---------------- Register / Login Modal ---------------- */}
      <Modal open={open}     // ✅ allows background scroll
 onClose={() => setOpen(false)}>
        <div className="modalStyle">
          <CloseIcon className="closeIcon" onClick={() => setOpen(false)} />
          <h3>{login ? "Login" : "Register"}</h3>

          <form onSubmit={handleSubmit}>
            {!login && (
              <>
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <span className="error">{errors.username}</span>
                )}
              </>
            )}

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}

            {!login && (
              <>
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span className="error">{errors.phone}</span>}
              </>
            )}

            {!login && (
              <>
                <label>Register as?</label>
                <div className="radioGroup">
                  <label>
                    <input
                      type="radio"
                      name="isAdmin"
                      value="false"
                      checked={formData.isAdmin === false}
                      onChange={handleChange}
                    />
                    Student
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="isAdmin"
                      value="true"
                      checked={formData.isAdmin === true}
                      onChange={handleChange}
                    />
                    Admin
                  </label>
                </div>
              </>
            )}

            {!login && (
              <>
                <label>Class</label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                >
                  <option value="">-- Select --</option>
                  {["uPSC","Current Affairs","Other Competitive Exams","VI", "VII", "VIII", "IX", "X", "XI", "XII"].map((cls) => (
                    <option key={cls} value={cls}>
                      Class {cls}
                    </option>
                  ))}
                </select>
                {errors.class && <span className="error">{errors.class}</span>}
              </>
            )}

            <label>Password</label>
            <div className="passwordField">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <IconButton
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}

            {!login && (
              <>
                <label>Confirm Password</label>
                <div className="passwordField">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                {errors.confirmPassword && (
                  <span className="error">{errors.confirmPassword}</span>
                )}
              </>
            )}

            {login && (
              <p style={{ textAlign: "center", marginTop: "10px" }}>
                <span
                  onClick={() => {
                    setOpen(false);
                    setOpenForgotPassword(true);
                  }}
                  style={{ color: "#0E1111", cursor: "pointer" }}
                >
                  Forgot Password?
                </span>
              </p>
            )}

            <button type="submit" className="common-btn" disabled={isLoading}>
              {isLoading ? "Please Wait..." : login ? "Login" : "Register"}
            </button>
          </form>

          <p>
            {login ? "Don't have an account?" : "Already have an account?"}{" "}
            <span className="toggle-link" onClick={() => setLogin(!login)}>
              {login ? "Register" : "Login"}
            </span>
          </p>
        </div>
      </Modal>

      {/* ---------------- Forgot Password Modal ---------------- */}
      <Modal
        open={openForgotPassword}
        onClose={() => setOpenForgotPassword(false)}
      >
        <div className="modalStyle">
          <CloseIcon
            className="closeIcon"
            onClick={() => setOpenForgotPassword(false)}
          />
          <h4>Forgot Password</h4>
          <label style={{margin: "0"}}>Email</label>
          <input
            type="email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            style={{marginTop: "10px"}}
          />
          <button
            className="update-btn"
            onClick={handleForgotPassword}
            disabled={isForgotLoading}
          >
            {isForgotLoading ? "Sending..." : "Update Password"}
          </button>
        </div>
      </Modal>

      {/* OTP Modal */}
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
