import React, { useEffect, useState } from "react";
import "./Keymetrics-styling.css";

const KeyMetrics = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    fetch("/api/metrics")
      .then(response => response.json())
      .then(data => setMetrics(data));
  }, []);

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
