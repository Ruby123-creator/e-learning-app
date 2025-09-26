import React from "react";
import { useUI } from "../../context/ui.context";

const AdminProfile = () => {
  const { userData } = useUI();

  if (!userData) return null;

  return (
    <div>
      {/* Title */}
      <h2
        style={{
          fontSize: "22px",
          fontWeight: "600",
          marginBottom: "15px",
          color: "rgb(2,84,79)",
          marginTop: "0px"
        }}
      >
        Admin Profile
      </h2>

      {/* Responsive styles for mobile */}
      <style>
        {`
          .info-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #eee;
          }

          .info-row:last-child {
            border-bottom: none;
          }

          @media (max-width: 600px) {
            .info-row {
              flex-direction: column;
              align-items: flex-start;
              gap: 4px;
            }
          }
        `}
      </style>

      {/* Card */}
      <div
        style={{
          background: "#fff",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <div>
          {[
            { label: "Username:", value: userData.username },
            { label: "Email:", value: userData.email },
            { label: "Phone:", value: userData.phone },
            { label: "Status:", value: userData.status },
            { label: "Created At:", value: new Date(userData.createdAt).toLocaleString() },
          ].map((item, index) => (
            <div className="info-row" key={index}>
              <span style={{ fontWeight: "500", color: "#555" }}>{item.label}</span>
              <span style={{ fontWeight: "600", color: "#333" }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
