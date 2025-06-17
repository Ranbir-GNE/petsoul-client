// src/pages/Dashboard.jsx
import React from "react";
import DashboardLayout from "../pages/DashboardLayout";
import Grid from "../components/dashboard/Grid";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Grid />
    </DashboardLayout>
  );
};

export default Dashboard;
