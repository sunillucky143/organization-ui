import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Header-styling.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [announcementCount, setAnnouncementCount] = useState(0);
  
  useEffect(() => {
    const fetchAnnouncementCount = async () => {
      try {
        const response = await axios.get('http://tailings-treatment.westus2.cloudapp.azure.com/api/comment_count/');
        setAnnouncementCount(response.data.count);
      } catch (error) {
        console.error('Error fetching announcement count:', error);
      }
    };

    fetchAnnouncementCount();
  }, []);

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
