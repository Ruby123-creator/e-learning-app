import React from "react";
import { useUI } from "../../context/ui.context";
import toaster from "../../components/common/toaster";
import { useNavigate } from "react-router-dom";
import "./style.css"; // make sure to import styles

const AdminProfile = () => {
  const { userData, setUserData } = useUI(); // Get logged-in user data from context


  if (!userData) return null; 

  return (
    <div className="dashboard-wrapper">
      <h2 className="dashboard-title">Admin Profile</h2>

      <div className="student-card">
        <div className="student-info">
          <div className="info-row">
            <span className="label">Username:</span>
            <span className="value">{userData.username}</span>
          </div>
          <div className="info-row">
            <span className="label">Email:</span>
            <span className="value">{userData.email}</span>
          </div>
          <div className="info-row">
            <span className="label">Phone:</span>
            <span className="value">{userData.phone}</span>
          </div>
          <div className="info-row">
            <span className="label">Status:</span>
            <span className="value">{userData.status}</span>
          </div>
          <div className="info-row">
            <span className="label">Created At:</span>
            <span className="value">{new Date(userData.createdAt).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
