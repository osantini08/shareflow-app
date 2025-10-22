import React from 'react';
import { Cloud, Upload, Link, FileText, Archive } from 'lucide-react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

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
          <span className="logo-text">ShareFlow</span>
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
      </div>
    </header>
  );
};

export default Header;
