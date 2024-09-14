import React from 'react';
import './verification-action.css'; // Optional: Custom styles for this component

const VerificationActions = ({ onVerifyClick, onUpdateClick }) => { // Add onUpdateClick prop
  const handleUpdateClick = () => {
    if (onUpdateClick) onUpdateClick(); // Call the prop function
  };

  const handleShareClick = () => {
    console.log("Document shared."); // Handle the share logic
  };

  return (
    <div className="actions-container">
      <button className="share-btn" onClick={handleShareClick}>
        Share
      </button>
      <button className="update-btn" onClick={handleUpdateClick}>
        Update
      </button>
      <button className="verify-btn" onClick={onVerifyClick}>
        Verify
      </button>
    </div>
  );
};

export default VerificationActions;
