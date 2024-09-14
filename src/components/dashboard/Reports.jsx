import React, { useState, useEffect } from "react";
import "./Reports-styling.css";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    fetch("http://localhost:3001/api/reports")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setReports(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load reports", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading reports: {error.message}</p>;
  }

  return (
    <div className="reports">
      <h2>Reports & Compliance</h2>
      <div className="report-list">
        {reports.length > 0 ? (
          reports.map(report => (
            <div className="report-item" key={report.id}>
              <a href={report.url}>{report.title}</a>
            </div>
          ))
        ) : (
          <p>No reports available</p>
        )}
      </div>
    </div>
  );
};

export default Reports;
