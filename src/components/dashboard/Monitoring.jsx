import React, { useEffect, useState } from "react";
import "./Monitoring-styling.css";

const Monitoring = () => {
  const [monitoringData, setMonitoringData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/monitoring")
      .then(response => response.json())
      .then(data => setMonitoringData(data))
      .catch(err => setError("Failed to load monitoring data"));
  }, []);

  if (error) {
    return (
      <div className="monitoring">
        <h2>Real-Time Monitoring</h2>
        <p className="error">{error}</p>
      </div>
    );
  }

  if (monitoringData === null) {
    return (
      <div className="monitoring">
        <h2>Real-Time Monitoring</h2>
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="monitoring">
      <h2>Real-Time Monitoring</h2>
      <div className="charts">
        <div className="chart">
          <h3>Contaminants</h3>
          <p>{monitoringData.contaminants}</p>
        </div>
        <div className="chart">
          <h3>Environmental Metrics</h3>
          <p>{monitoringData.environmentalMetrics}</p>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
