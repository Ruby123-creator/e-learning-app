import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toaster from "../../components/common/toaster";
import { useUI } from "../../context/ui.context";
import AdminProfile from "./adminProfile";
import UserList from "./userList";


const Courses = () => (
  <Box>
    <Typography variant="h4">Courses Component</Typography>
  </Box>
);

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const navigate = useNavigate();
  const themeColor = "rgb(2,84,79)";
  const { setUserData } = useUI();

  const handleClick = (component) => {
    if (component === "logout") {
      localStorage.removeItem("loginData");
      setUserData({});
      toaster("Logged out successfully");
      navigate("/"); // redirect to home page
      return;
    }
    setActiveComponent(component);
  };

  // Render the selected component
  if (activeComponent === "users") return <UserList />;
  if (activeComponent === "courses") return <Courses />;
  if (activeComponent === "profile") return <AdminProfile />;

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        my: 5,
        display: "flex",
        flexDirection: "column",
        px: 2,
      }}
    >
      {["Profile", "User's List", "Courses", "Logout"].map((text) => (
        <Button
          key={text}
          fullWidth
          variant="outlined"
          onClick={() =>
            handleClick(
              text === "Profile"
                ? "profile"
                : text === "User's List"
                ? "users"
                : text === "Courses"
                ? "courses"
                : "logout"
            )
          }
          sx={{
            textTransform: "none",
            justifyContent: "space-between",
            py: 2,
            mb: 2,
            color: text === "Logout" ? "#b71c1c" : "black",
            borderColor: text === "Logout" ? "#b71c1c" : "#ccc",
            "&:hover": {
              backgroundColor: text === "Logout" ? "#b71c1c" : themeColor,
              color: "#fff",
              borderColor: text === "Logout" ? "#b71c1c" : themeColor,
            },
          }}
        >
          <Typography>{text}</Typography>
          <Typography>{text !== "Logout" ? ">" : ""}</Typography>
        </Button>
      ))}
    </Box>
  );
};

export default AdminDashboard;
