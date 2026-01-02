import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';

function Header({ user, onLogout, scrolled, hideNavbar }) {
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${hideNavbar ? 'navbar-hidden' : ''}`}>
      <div className="nav-left">
        <div className="logo">
          <span className="logo-icon"><img src="/Img/moveo-logo.svg" alt="Moveo Logo" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /></span>
        </div>
        <div className="nav-links">
          <a href="#" className="nav-link active">
            <span className="nav-icon"><SpaceDashboardIcon /></span>
            Dashboard
          </a>
          <a href="#" className="nav-link">
            <span className="nav-icon"><BarChartIcon /></span>
            Analytics
          </a>
        </div>
      </div>
      <div className="nav-right">
        <div className="user-menu">
          <div className="user-avatar">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <span className="user-name">{user?.name || ''}</span>
          <button className="btn-logout" onClick={onLogout}>
            <LogoutIcon />
            
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Header
