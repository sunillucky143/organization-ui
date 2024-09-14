import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Procedure from "./procedure_ele";
import SafetyProtocols from "./saftey_protocols";
import LawsAndRegulations from "./laws_and_regulations";
import VerificationActions from "./verification_actions";
import VerificationPopup from "./verification_popup";
import { useVerification } from "../../context/Verification_context";
import './verification-page.css';


const VerificationPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false); // New state for update mode
  const { backendResponse } = useVerification();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleVerifyClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const postDocument = () => {
    console.log("Document posted to social media.");
  };

  const storeConfidentialDocument = () => {
    console.log("Confidential document stored in the database.");
  };

  const handleUpdateClick = () => {
    setIsUpdateMode(true);
    console.log("Document updated."); // Handle the update logic
  };

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="verification-container">
      <button className="back-btn" onClick={handleBackClick}>Back</button> {/* Back button */}

      <h1 className="verification-title">Verification Page</h1>

      {/* Share Icon */}
      <div className="share-icon">
        <i className="fas fa-share-alt"></i>
      </div>

      {/* Main Content Layout */}
      <div className="content-layout">
        {/* Left side with Procedure */}
        <div className="left-side">
          <h2>Procedure Section</h2>
          <div className="procedure-section">
            <Procedure 
              response={backendResponse["procedure"]}
              isUpdateMode={isUpdateMode} // Pass update mode state
            />
          </div>
        </div>

        <div className="right-side">
          <div className="right-top">
            <h2>Safety Protocols</h2>
            <div className="safety-section">
              <SafetyProtocols 
                response={backendResponse["safetyProtocols"]}
                isUpdateMode={isUpdateMode} 
              />
            </div>
            <h2>Laws & Regulations</h2>
            <div className="laws-section">
              <LawsAndRegulations 
                response={backendResponse["lawsAndRegulations"]}
                isUpdateMode={isUpdateMode} 
              />
            </div>
          </div>
          <div className="actions-section">
            <VerificationActions 
              onVerifyClick={handleVerifyClick} 
              onUpdateClick={handleUpdateClick} 
            />
          </div>
        </div>
      </div>

      {showPopup && (
        <VerificationPopup
          closePopup={closePopup}
          storeConfidentialDocument={storeConfidentialDocument}
          postDocument={postDocument}
        />
      )}
    </div>
  );
};

export default VerificationPage;
