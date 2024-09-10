import React, { useState } from "react";
import Procedure from "./procedure_ele";
import SafetyProtocols from "./saftey_protocols";
import LawsAndRegulations from "./laws_and_regulations";
import VerificationActions from "./verification_actions";
import VerificationPopup from "./verification_popup";
import './verification-page.css';

const VerificationPage = () => {
  const [showPopup, setShowPopup] = useState(false);

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

  return (
    <div className="verification-container">
      <h1 className="verification-title">Verification Page</h1>

      {/* Share Icon */}
      <div className="share-icon">
        <i className="fas fa-share-alt"></i>
      </div>

      {/* Main Content Layout */}
      <div className="content-layout">
        {/* Left side with Procedure */}
        <div className="left-side">
          <div className="procedure-section">
            <Procedure />
          </div>
        </div>

        {/* Right side with Safety Protocols, Laws & Regulations, and Actions */}
        <div className="right-side">
          <div className="right-top">
            <div className="safety-section">
              <SafetyProtocols />
            </div>
            <div className="laws-section">
              <LawsAndRegulations />
            </div>
          </div>
          <div className="actions-section">
            <VerificationActions onVerifyClick={handleVerifyClick} />
          </div>
        </div>
      </div>

      {/* Popup for verification */}
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
