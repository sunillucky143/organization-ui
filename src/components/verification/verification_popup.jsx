import React, { useState } from "react";
import './verification-popup.css'; // New CSS for a modern popup design

const VerificationPopup = ({ closePopup, storeConfidentialDocument, postDocument }) => {
  const [canPost, setCanPost] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setCanPost(value.toLowerCase() === "post");
  };

  const handlePost = () => {
    if (canPost) {
      postDocument();
      closePopup();
    }
  };

  const handleContinue = () => {
    storeConfidentialDocument();
    closePopup();
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2 className="popup-title">Publish Document</h2>
        <p className="popup-text">
          Type "post" to enable the Post button, or click "Continue" to save it as confidential.
        </p>
        <input
          type="text"
          className="popup-input"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type 'post' here"
        />
        <div className="popup-buttons">
          <button
            disabled={!canPost}
            className={`popup-btn post-btn ${canPost ? "enabled" : ""}`}
            onClick={handlePost}
          >
            Post
          </button>
          <button className="popup-btn continue-btn" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationPopup;
