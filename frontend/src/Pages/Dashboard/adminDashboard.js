import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUI } from "../../context/ui.context";
import AdminProfile from "./adminProfile";
import toaster from "../../components/common/toaster";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { setUserData } = useUI();
  const themeColor = "rgba(255, 255, 255, 1)";

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setUserData({});
    toaster("Logged out successfully");
    navigate("/");
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        my: 5,
        display: "flex",
        flexDirection: "column",
        px: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 3, fontWeight: "bold", color: themeColor }}
      >
        Admin Dashboard
      </Typography>

      {/* Buttons */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <Button
          variant="outlined"
          onClick={() => navigate("/dashboard/userList")}
          sx={{
            textTransform: "none",
            py: 1.5,
            px: 3,
            color: "#ffffffff",
            borderColor: "#ffffffff",
            "&:hover": { borderColor: "#939393ff", color: "#939393ff" },
          }}
        >
          User's List
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate("/dashboard/courses")}
          sx={{
            textTransform: "none",
            py: 1.5,
            px: 3,
            color: "#ffffffff",
            borderColor: "#ffffffff",
            "&:hover": { borderColor: "#939393ff", color: "#939393ff" },
          }}
        >
          Courses
        </Button>
        <Button
          variant="outlined"
          onClick={handleLogout}
          sx={{
            textTransform: "none",
            py: 1.5,
            px: 3,
            color: "#ffffffff",
            borderColor: "#ffffffff",
            "&:hover": { borderColor: "#fd0000ff", color: "#fd0404ff" },
          }}
        >
          Logout
        </Button>
      </Box>

      {/* Profile always visible */}
      <AdminProfile />
    </Box>
  );
};

export default AdminDashboard;
