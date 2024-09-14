import React, { useState } from "react";
import { FaHome, FaChartLine, FaCogs, FaUsers, FaFileAlt, FaRecycle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "./Sidebar-styling.css";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <button onClick={toggleSidebar} className="toggle-button">
        {isExpanded ? '<' : '>'}
      </button>
      <ul>
        <li><a href="#"><FaHome /> {isExpanded && 'Home'}</a></li>
        <li><a href="#"><FaChartLine /> {isExpanded && 'Reports'}</a></li>
        <li><a href="#"><FaFileAlt /> {isExpanded && 'Monitoring'}</a></li>
        <li><a href="#"><FaCogs /> {isExpanded && 'Sustainability'}</a></li>
        <li><a href="#"><FaUsers /> {isExpanded && 'User Management'}</a></li>
        <li><Link to="/tailing-form"><FaRecycle /> {isExpanded && 'Tailing Treatment'}</Link></li>
        <li><Link to="/Documents"><FaRecycle /> {isExpanded && 'Documents'}</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
