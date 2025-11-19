import React, { useState } from 'react';
import { Cloud, Upload, Link, FileText, Archive, LogOut, User } from 'lucide-react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const navItems = [
    { path: '/', label: 'Upload Files', icon: Upload },
    { path: '/url-shortener', label: 'URL Shortener', icon: Link },
    { path: '/document-editor', label: 'Document Editor', icon: FileText },
    { path: '/saved-documents', label: 'Saved Documents', icon: Archive }
  ];

  return (
    <header className="header">
      <div className="header-container">
        <RouterLink to="/" className="logo">
          <Cloud className="logo-icon" />
          <span className="logo-text">Share Space</span>
        </RouterLink>
        
        <nav className="nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <RouterLink
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </RouterLink>
            );
          })}
        </nav>

        {currentUser && (
          <div className="user-menu">
            <button 
              className="user-button"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {currentUser.photoURL ? (
                <img 
                  src={currentUser.photoURL} 
                  alt={currentUser.displayName || 'User'}
                  className="user-avatar"
                />
              ) : (
                <User size={20} />
              )}
              <span className="user-name">{currentUser.displayName || currentUser.email}</span>
            </button>

            {showDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-item user-info">
                  <p className="user-email">{currentUser.email}</p>
                </div>
                <button 
                  className="dropdown-item logout-button"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
