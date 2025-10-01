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
          color: "rgba(255, 255, 255, 1)",
          marginTop: "0px",
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
      border-bottom: 1px solid rgba(255, 255, 255, 0.15); /* Lighter, visible border */
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
          background: "rgb(14,17,17)", // Dark card background
          borderRadius: "8px",
          padding: "20px",
          border: "2px solid grey",
          boxShadow: "0 2px 6px rgba(167, 167, 167, 0.5)",
        }}
      >
        <div>
          {[
            { label: "Username:", value: userData.username },
            { label: "Email:", value: userData.email },
            { label: "Phone:", value: userData.phone },
            { label: "Status:", value: userData.status },
            {
              label: "Created At:",
              value: new Date(userData.createdAt).toLocaleString(),
            },
          ].map((item, index) => (
            <div className="info-row" key={index}>
              <span style={{ fontWeight: "500", color: "#bbb" }}>
                {item.label}
              </span>{" "}
              {/* Light grey */}
              <span style={{ fontWeight: "600", color: "#fff" }}>
                {item.value}
              </span>{" "}
              {/* White */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
