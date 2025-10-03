import React from "react";
import { Bounce, toast } from "react-toastify";

const toaster = (message) => {
  return toast(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Bounce,
    style: {
      backgroundColor: "#ffffff", // white background
      color: "#000000", // black text
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    },
    closeButton: true, // keep default close button
  });
};

export default toaster;
