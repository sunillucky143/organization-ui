import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import KeyMetrics from "./Keymetrics";
import Workflow from "./Workflow";
import Monitoring from "./Monitoring";
import Map from "./Map";
import Reports from "./Reports";
import "./Dashboard-styling.css";

const Home = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="dashboard-content">
          <KeyMetrics />
          <Workflow />
          <Monitoring />
          <Map />
          <Reports />
        </div>
      </div>
    </div>
  );
};

export default Home;
