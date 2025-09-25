import React from "react";
import "./style.css";
import StudentDashboard from "./studentDashboard";
import { useUI } from "../../context/ui.context";
import AdminDashboard from "./adminDashboard";


const Dashboard = () => {
  const { userData } = useUI(); // Get logged-in user data

  if (!userData || !userData.email) {
    return <p>Please login to access dashboard</p>;
  }

  return (
    <div className="dashboard-container">
      {/* {userData.isAdmin ? <AdminDashboard /> : <StudentDashboard user={userData} />} */}
      {userData.isAdmin ? <AdminDashboard /> : <AdminDashboard /> }

    </div>
  );
};

export default Dashboard;
