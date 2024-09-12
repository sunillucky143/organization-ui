import React, { useState } from "react";
import Procedure from "./procedure_ele";
import SafetyProtocols from "./saftey_protocols";
import LawsAndRegulations from "./laws_and_regulations";
import VerificationActions from "./verification_actions";
import VerificationPopup from "./verification_popup";
import { useVerification } from "../../context/Verification_context";
import './verification-page.css';

const VerificationPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { backendResponse } = useVerification();

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
          <h2>Procedure Section</h2>
          <div className="procedure-section">
            <Procedure response={backendResponse}/>
          </div>
        </div>

        {/* Right side with Safety Protocols, Laws & Regulations, and Actions */}
        <div className="right-side">
          <div className="right-top">
            <h2>Safety Protocols</h2>
            <div className="safety-section">
              <SafetyProtocols />
            </div>
            <h2>Laws & Regulations</h2>
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