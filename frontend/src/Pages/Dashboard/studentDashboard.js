import React from "react";
import { useUI } from "../../context/ui.context";
import toaster from "../../components/common/toaster";
import { useNavigate } from "react-router-dom";
import "./style.css"; // make sure to import styles

const StudentDashboard = ({ user }) => {
  const { setUserData } = useUI();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setUserData({});
    toaster("Logged out successfully");
    navigate("/"); // redirect to home page
  };

  return (
    <div className="dashboard-wrapper">
      <h2 className="dashboard-title">Student Dashboard</h2>

      <div className="student-card">
        <div className="student-info">
          <div className="info-row">
            <span className="label">Username:</span>
            <span className="value">{user.username}</span>
          </div>
          <div className="info-row">
            <span className="label">Email:</span>
            <span className="value">{user.email}</span>
          </div>
          <div className="info-row">
            <span className="label">Phone:</span>
            <span className="value">{user.phone}</span>
          </div>
          <div className="info-row">
            <span className="label">Class:</span>
            <span className="value">{user.class}</span>
          </div>
          <div className="info-row">
            <span className="label">Status:</span>
            <span className="value">{user.status}</span>
          </div>
          <div className="info-row">
            <span className="label">Created At:</span>
            <span className="value">{new Date(user.createdAt).toLocaleString()}</span>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default StudentDashboard;
