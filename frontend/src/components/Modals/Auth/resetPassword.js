import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../../utils/api-endpoints";
import "./style.css";
import toaster from "../../common/toaster"; // make sure this import is correct

const ResetPasswordPage = () => {
  const { token } = useParams(); // get token from URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async () => {
    if (!password || !confirmPassword) return toaster("Please fill both fields");
    if (password !== confirmPassword) return toaster("Passwords do not match");

    setIsLoading(true);
    try {
      const res = await axios.post(API_ENDPOINTS.RESET_PASSWORD, {
        token,
        newPassword: password,
      });
      console.log(res.data);
      toaster("Password updated successfully");
      navigate("/"); // redirect to login or home
    } catch (err) {
      console.error(err.response?.data);
      toaster(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
   <div style={{height:"400px"}}>
     <div className="modalStyle">
      <h4>Reset Password</h4>
      <form>
        <label>New Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          type="button"
          className="common-btn"
          onClick={handleReset}
          disabled={isLoading}
          style={{marginTop: "10px"}}
        >
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
   </div>
  );
};

export default ResetPasswordPage;
