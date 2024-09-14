import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import "./Header-styling.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const announcementCount = 120;
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };
  return (
    <header className="header">
      <h1>Mining Organization Dashboard</h1>
      <Link to="/announcements" className="announcements-icon">
        <FaBell />
        {announcementCount > 0 && (
          <span className="notification-badge">{announcementCount}</span>
        )}
      </Link>
      <div className="user-profile">
        <button onClick={() => setMenuOpen(!menuOpen)}>Menu</button>
        {menuOpen && (
          <div className="profile-menu">
            <a href="#">Profile</a>
            <a href="#">Settings</a>
            <a href="#" onClick={handleLogout}>Logout</a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
