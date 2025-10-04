import React, { useState } from "react";
import header from "../../../assets/images/logo.png";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import MenuIcon from "@mui/icons-material/Menu";
import SignUpModal from "../../Modals/Auth/signup.js";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useUI } from "../../../context/ui.context.js";
import { useNavigate } from "react-router-dom";

const HeaderComp = () => {
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isLogin, userData } = useUI();
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleProfileClick = () => {
    const loginData = JSON.parse(localStorage.getItem("loginData") || "{}");

    if (loginData?.email) {
      navigate("/dashboard"); // Navigate if logged in
    } else {
      setOpen(true); // Open SignUpModal if not logged in
    }
  };

  const menuItems = [
    { label: "Home", link: "/" },
    { label: "About Us", link: "/about-us" },
    { label: "Contact Us", link: "/contact-us" },
    { label: "Modules", link: "/modules" },
  ];

  return (
    <div className="menu-header">
      <div className="header">
        <div
          className="logo"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <span>
            <img src={header} alt="logo" width={60} />
          </span>
          <span className="logo_name">Topicwise Institute</span>
        </div>

        {/* Desktop Menu */}
        <div className="subMenu desktop-menu">
          <ul>
            {menuItems.map((item) => (
              <li key={item.label}>
                <a href={item.link}>{item.label}</a>
              </li>
            ))}
            <li>
              {isLogin ? (
                <span onClick={handleProfileClick}>
                  <span>
                    <AccountCircleRoundedIcon />
                  </span>{" "}
                  <span>{userData?.username}</span>
                </span>
              ) : (
                <span>
                  <AccountCircleRoundedIcon onClick={handleProfileClick} />
                </span>
              )}
            </li>
          </ul>
        </div>

        {/* Mobile Hamburger */}
        <div className="mobile-menu">
          <IconButton onClick={toggleDrawer(true)} sx={{ color: "white" }}>
            <MenuIcon />
          </IconButton>
        </div>
      </div>

      {/* Drawer for mobile */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        className="drawer"
      >
        <div className="drawerContent" onClick={toggleDrawer(false)}>
          <div
            className="drawerLogo"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "16px",
              cursor: "pointer",
            }}
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <img src={header} alt="logo" width={30} />
            <span
              style={{
                marginLeft: "10px",
                fontSize: "16px",
                fontWeight: "600",
                color: "#ffffffff",
              }}
            >
              Topicwise Institute
            </span>
          </div>
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.label} component="a" href={item.link}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
            <ListItem button onClick={handleProfileClick}>
              <ListItemText
                primary={
                  JSON.parse(localStorage.getItem("loginData") || "{}")
                    ?.username
                    ? JSON.parse(localStorage.getItem("loginData")).username
                    : "Login / Signup"
                }
                sx={{ cursor: "pointer" }}
              />
            </ListItem>
          </List>
        </div>
      </Drawer>

      <SignUpModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default HeaderComp;
