import React from 'react';
import './procedure-ele.css';

const Procedure = ({ response, isUpdateMode }) => {
  const formatResponse = (text) => {
    // Basic replacement for markdown-like formatting
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // Bold text
      .replace(/\n/g, '<br />'); // Newline to <br />
  };

  return (
    <div 
      className="procedure-content" 
      dangerouslySetInnerHTML={{ __html: formatResponse(response) }} 
      contentEditable={!isUpdateMode} // Disable editing if in update mode
    />
  );
};

export default Procedure;
