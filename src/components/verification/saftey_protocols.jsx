import React from 'react';
import './safety-protocols.css'; // Add relevant styles

const SafetyProtocols = ({ response }) => {
  const formatResponse = (text) => {
    // Basic replacement for markdown-like formatting
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // Bold text
      .replace(/\n/g, '<br />'); // Newline to <br />
  };

  return (
    <div className="safety-protocols-content" dangerouslySetInnerHTML={{ __html: formatResponse(response) }} />
  );
};

export default SafetyProtocols;