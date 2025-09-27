import React from 'react';
import { Cloud, Share2 } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Cloud className="logo-icon" />
          <span className="logo-text">ShareFlow</span>
        </div>
        
        <nav className="nav">
          <button className="nav-button">
            <Share2 size={18} />
            Share
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
