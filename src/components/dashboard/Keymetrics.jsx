import React, { useEffect, useState } from "react";
import "./Keymetrics-styling.css";

const KeyMetrics = () => {
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/key-metrics")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => setMetrics(data))
      .catch(error => {
        console.error("Error fetching metrics:", error);
        setError("Failed to load metrics");
      });
  }, []);

  if (error) {
    return (
      <div className="key-metrics">
        <h2>Key Metrics</h2>
        <p className="error">{error}</p>
      </div>
    );
  }

  if (metrics === null) {
    return (
      <div className="key-metrics">
        <h2>Key Metrics</h2>
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="key-metrics">
      <h2>Key Metrics</h2>
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Tailings Volume</h3>
          <p>{metrics.tailingsVolume}</p>
        </div>
        <div className="metric-card">
          <h3>Environmental Impact</h3>
          <p>{metrics.environmentalImpact}</p>
        </div>
        <div className="metric-card">
          <h3>Safety Status</h3>
          <p>{metrics.safetyStatus}</p>
        </div>
      </div>
    </div>
  );
};

export default KeyMetrics;
