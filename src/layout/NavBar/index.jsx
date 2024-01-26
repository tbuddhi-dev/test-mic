import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';

const NavBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <nav className={`left-navbar ${collapsed ? 'collapsed' : ''}`}>
      <div className="navbar-toggler" onClick={toggleNavbar}>
        <span className="navbar-toggler-icon"></span>
      </div>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/document"> My Documents </Link>
        </li>
        <li className="nav-item">
          <Link to="/schedule">My Schedule</Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard">My Activity</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
