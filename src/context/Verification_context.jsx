// VerificationContext.js
import React, { createContext, useState, useContext } from 'react';

const VerificationContext = createContext();

export const VerificationProvider = ({ children }) => {
  const [backendResponse, setBackendResponse] = useState(null);

  return (
    <VerificationContext.Provider value={{ backendResponse, setBackendResponse }}>
      {children}
    </VerificationContext.Provider>
  );
};

export const useVerification = () => {
  const context = useContext(VerificationContext);
  if (!context) {
    throw new Error('useVerification must be used within a VerificationProvider');
  }
  return context;
};
