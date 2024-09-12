// Procedure.jsx

import React from 'react';
import './procedure-ele.css'

const Procedure = ({ response }) => {
  const formatResponse = (text) => {
    // Basic replacement for markdown-like formatting
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // Bold text
      .replace(/\n/g, '<br />'); // Newline to <br />
  };

  return (
    <div className="procedure-content" dangerouslySetInnerHTML={{ __html: formatResponse(response) }} />
  );
};

export default Procedure;
