import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'file:\\\..\..\contexts\AuthContext';
import 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\styles\header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <img src="/assets/logo.png" alt="Yukti Logo" />
          <span>Yukti</span>
        </Link>
        
        <button 
          className="menu-toggle" 
          aria-expanded={isMenuOpen}
          aria-controls="main-menu"
          onClick={toggleMenu}
        >
          <span className="sr-only">Menu</span>
          <span className="hamburger"></span>
        </button>
        
        <nav id="main-menu" className={`main-nav ${isMenuOpen ? 'is-open' : ''}`}>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/how-it-works">How It Works</Link></li>
            {currentUser ? (
              <>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><button onClick={handleLogout} className="nav-button">Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register" className="btn btn-primary">Sign Up</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
