import React, { useState } from "react";
import './verification-popup.css'; // Ensure this CSS file is correctly styled for the popup

const VerificationPopup = ({ closePopup, storeConfidentialDocument, postDocument }) => {
  const [canPost, setCanPost] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value.trim(); // Trim whitespace from input
    setInputValue(value);
    setCanPost(value.toLowerCase() === "post");
  };

  const sendDocumentToServer = async (actionType) => {
    const documentContent = `
      Action: ${actionType}
      Input Value: ${inputValue}
    `;

    try {
      await fetch("/api/save-document", { // Replace with your backend endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: documentContent,
          action: actionType,
        }),
      });
    } catch (error) {
      console.error("Error sending document to server:", error);
    }
  };

  const handlePost = async () => {
    if (canPost) {
      await postDocument(); // Ensure postDocument is async if it involves server communication
      await sendDocumentToServer("Post"); // Send document with the action type "Post"
      closePopup();
    }
  };

  const handleContinue = async () => {
    await storeConfidentialDocument(); // Ensure storeConfidentialDocument is async if it involves server communication
    await sendDocumentToServer("Continue"); // Send document with the action type "Continue"
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
