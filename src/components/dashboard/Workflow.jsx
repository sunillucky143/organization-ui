import React, { useEffect, useState } from "react";
import "./Workflow-styling.css";

const Workflow = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/workflow")
      .then(response => response.json())
      .then(data => setProgress(data.progress))
      .catch(err => setError("Failed to load workflow data"));
  }, []);

  return (
    <div className="workflow">
      <h2>Procedure Workflow</h2>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}
    </div>
  );
};

export default Workflow;
