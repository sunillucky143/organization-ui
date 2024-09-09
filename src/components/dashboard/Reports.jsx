import React, { useState, useEffect } from "react";
import "./Reports-styling.css";

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch("/api/reports")
      .then(response => response.json())
      .then(data => setReports(data))
      .catch(err => console.error("Failed to load reports", err));
  }, []);

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
