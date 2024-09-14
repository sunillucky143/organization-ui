import React from 'react';
import './safety-protocols.css'; // Add relevant styles

const SafetyProtocols = ({ response, isUpdateMode }) => {
  const formatResponse = (text) => {
    
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // Bold text
      .replace(/\n/g, '<br />'); // Newline to <br />
  };

  return (
    <div 
      className="safety-protocols-content" 
      dangerouslySetInnerHTML={{ __html: formatResponse(response) }} 
      contentEditable={!isUpdateMode} // Disable editing if in update mode
    />
  );
};

export default SafetyProtocols;
