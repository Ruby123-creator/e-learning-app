import React, { useEffect } from "react";
import Layout from "./components/common";
import HomeCom from "./Pages/Home";
import About from "./Pages/About";
import Dashboard from "./Pages/Dashboard"; // main dashboard page
import UserList from "./Pages/Dashboard/userList"; // new page for users
// import CoursesPage from "./Pages/Dashboard/coursesPage"; // new page for courses
import ContactPage from "./Pages/ContactUs";
import ResetPasswordPage from "./components/Modals/Auth/resetPassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import { useUI } from "./context/ui.context";
import "./assets/style/style.css";


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
        {/* Routes wrapped in Layout */}
        <Route path="/" element={<Layout><HomeCom /></Layout>} />
        <Route path="/about-us" element={<Layout><About /></Layout>} />
        <Route path="/contact-us" element={<Layout><ContactPage /></Layout>} />

        {/* Dashboard routes */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />          {/* AdminDashboard */}
        <Route path="/dashboard/userList" element={<Layout><UserList /></Layout>} />  {/* Users List */}
        {/* <Route path="/dashboard/courses" element={<Layout><CoursesPage /></Layout>} />     Courses */}

        {/* Standalone route without Layout */}
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      </Routes>
    </Router>
  );
};

export default App;
