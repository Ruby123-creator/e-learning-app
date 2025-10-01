import React, { useEffect } from "react";
import Layout from "./components/common";
import HomeCom from "./Pages/Home";
import About from "./Pages/About";
import Dashboard from "./Pages/Dashboard";
import UserList from "./Pages/Dashboard/userList";
import Courses from "./Pages/Dashboard/courses";
import ContactPage from "./Pages/ContactUs";
import ResetPasswordPage from "./components/Modals/Auth/resetPassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import { useUI } from "./context/ui.context";
import "./assets/style/style.css";
import SubjectPage from "./Pages/Dashboard/subjectPage";
import Modules from "./Pages/Modules";
import ModuleChapter from "./Pages/Modules/ModuleChapter";
import Content from "./Pages/Modules/Content";

const App = () => {
  const { setUserData } = useUI();

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("loginData") || "{}"));
  }, []);

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={50000000000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <Routes>
        {/* Routes wrapped in Layout */}
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
          path="/contact-us"
          element={
            <Layout>
              <ContactPage />
            </Layout>
          }
        />
        <Route
          path="/modules"
          element={
            <Layout>
              <Modules/>
            </Layout>
          }
        />

         <Route
          path="/modules/:subjectName/:subjectId" 
          element={
            <Layout>
              <ModuleChapter/>
            </Layout>
          }
        />

        <Route
          path="/modules/:subjectName/:subjectId/:chapterName" 
          element={
            <Layout>
              <Content/>
            </Layout>
          }
        />
        
        {/* Dashboard routes */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />{" "}
        {/* AdminDashboard */}
        <Route
          path="/dashboard/userList"
          element={
            <Layout>
              <UserList />
            </Layout>
          }
        />{" "}
        {/* Users List */}
        <Route
          path="/dashboard/courses"
          element={
            <Layout>
              <Courses />
            </Layout>
          }
        />
        <Route
          path="/dashboard/courses/:subjectName/:id"
          element={
            <Layout>
              <SubjectPage />
            </Layout>
          }
        />
        {/* Standalone route without Layout */}
       
        <Route path="/reset-password/:token" element={<Layout><ResetPasswordPage /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;
