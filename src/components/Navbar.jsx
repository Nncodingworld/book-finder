import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className="navbar navbar-expand-lg px-4"
      style={{
        position: 'fixed',
        top: '0',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        color: '#F5F5F5',
        border: '1px solid rgba(255,255,255,0.2)',
        zIndex: 1000,
      }}
    >
      <Link className="navbar-brand fw-bold text-white" to="/">
        Boo<span>kF</span>inder
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleMenu}
        style={{ borderColor: '#F5F5F5' }}
      >
        <span className="navbar-toggler-icon" style={{ color: '#F5F5F5' }}></span>
      </button>

      <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
        <ul className="navbar-nav ms-auto align-items-center">
          <li className="nav-item">
            <NavLink
              className="nav-link text-white"
              to="/"
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link text-white"
              to="/about"
              onClick={() => setIsOpen(false)}
            >
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              style={{ color: '#FFD700' }}
              to="/favourites"
              onClick={() => setIsOpen(false)}
            >
              <FaStar />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
