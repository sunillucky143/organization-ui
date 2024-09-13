import React from 'react';
import './laws-and-regulations.css'; // Add relevant styles

const LawsAndRegulations = ({ response }) => {
  const formatResponse = (text) => {
    // Basic replacement for markdown-like formatting
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // Bold text
      .replace(/\n/g, '<br />'); // Newline to <br />
  };

  return (
    <div className="laws-regulations-content" dangerouslySetInnerHTML={{ __html: formatResponse(response) }} />
  );
};

export default LawsAndRegulations;
