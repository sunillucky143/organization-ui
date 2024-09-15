import React, { useState } from "react";
import './verification-popup.css'; // Ensure this CSS file includes styles for a modern popup design
import { useVerification } from "../../context/Verification_context";
import MediaPost from "../api_interactions/api";
import { useNavigate } from "react-router-dom";

const VerificationPopup = ({ closePopup, storeConfidentialDocument, postDocument }) => {
  const navigate = useNavigate();
  const [canPost, setCanPost] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { backendResponse } = useVerification();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setCanPost(value.trim().toLowerCase() === "post");
  };

  const handlePost = async () => {
    if (canPost) {
      try {
        await MediaPost(backendResponse, "public"); // Pass the backend response here
        console.log("Document posted:", backendResponse);
        navigate("/dashboard");
      } catch (error) {
        console.error("Failed to post document:", error);
      } finally {
        closePopup();
      }
    }
  };

  const handleContinue = async () => {
    try {
      await MediaPost(backendResponse, "private"); // Pass the backend response here
      console.log("Document posted:", backendResponse);
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to post document:", error);
    } finally {
      closePopup();
    }
  };

  return (
    <div className="popup-overlay" role="dialog" aria-labelledby="popup-title" aria-modal="true">
      <div className="popup">
        <h2 id="popup-title" className="popup-title">Publish Document</h2>
        <p className="popup-text">
          Type "post" to enable the Post button, or click "Continue" to save it as confidential.
        </p>
        <input
          type="text"
          className="popup-input"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type 'post' here"
          aria-describedby="post-instructions"
        />
        <div id="post-instructions" className="popup-text">
          The Post button will be enabled when you type "post".
        </div>
        <div className="popup-buttons">
          <button
            disabled={!canPost}
            className={`popup-btn post-btn ${canPost ? "enabled" : ""}`}
            onClick={handlePost}
            aria-disabled={!canPost}
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
