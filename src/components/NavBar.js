// components/NavBar.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../styles/images/white_logo.png';
import '../styles/css/NavBar.css';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__left">
          <span className="navbar__text">Start Learning Today</span>
        </div>
        <div className="navbar__middle">
          <Link to="/" className="navbar__logo">
            <img alt="logo" src={logo} className="navbar__logo-img" />
          </Link>
        </div>
        <div className="navbar__right">
          <div
            className="navbar__user"
            onMouseEnter={() => setShowLogout(true)}
            onMouseLeave={() => setShowLogout(false)}
          >
            <span className="navbar__username">{user?.username}</span>
            {showLogout && (
              <div className="navbar__logout-popup">
                <button className="navbar__logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
