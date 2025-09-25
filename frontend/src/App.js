import React from "react";
import Layout from "./components/common";
import HomeCom from "./Pages/Home";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import About from "./Pages/About";
import { Bounce, ToastContainer, toast } from "react-toastify";
import Dashboard from "./Pages/Dashboard";
import ContactPage from "./Pages/ContactUs";
import { useUI } from "./context/ui.context";
import { useEffect } from "react";
import "./assets/style/style.css";
import Courses from "./Pages/Lectures";
import ResetPasswordPage from "./components/Modals/Auth/resetPassword";
const App = () => {
  const { setUserData } = useUI();
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("loginData") || "{}"));
  }, []);
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <Routes>
        {/* Routes with Layout (header + footer) */}
        <Route
          path="/"
          element={
            <Layout>
              <HomeCom />
            </Layout>
          }
        />
        <Route
          path="/about-us"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/contact-us"
          element={
            <Layout>
              <ContactPage />
            </Layout>
          }
        />
        <Route
          path="/courses"
          element={
            <Layout>
              <Courses />
            </Layout>
          }
        />

        {/* Standalone route without Layout */}
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      </Routes>
    </Router>
  );
};

export default App;
