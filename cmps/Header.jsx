import { useState, useRef, useEffect } from 'react';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';

function Header({ user, onLogout, scrolled, hideNavbar }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${hideNavbar ? 'navbar-hidden' : ''}`}>
      <div className="nav-left">
        <div className="logo">
          <span className="logo-icon"><img src="/Img/moveo-logo.svg" alt="Moveo Logo" style={{ width: '55px', height: '55px', borderRadius: '50%' }} /></span>
        </div>
        <div className="nav-links">
          <a href="#" className="nav-link active">
            <span className="nav-icon"><SpaceDashboardIcon /></span>
            Dashboard
          </a>
        </div>
      </div>
      <div className="nav-right">
        <div className="user-menu" ref={dropdownRef}>
          <div className="user-avatar" onClick={() => setShowDropdown(!showDropdown)} style={{ cursor: 'pointer' }}>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <span className="user-name">{user?.name || ''}</span>
          {showDropdown && (
            <div className="user-dropdown">
              <button className="dropdown-item" onClick={onLogout}>
                <LogoutIcon />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Header
