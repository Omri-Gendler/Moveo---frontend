function Header({ user, onLogout, scrolled, hideNavbar }) {
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${hideNavbar ? 'navbar-hidden' : ''}`}>
      <div className="nav-left">
        <div className="logo">
          <span className="logo-icon"><img src="/Img/moveo-logo.svg" alt="Moveo Logo" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /></span>
          <span className="logo-text">AI Crypto Advisor</span>
        </div>
        <div className="nav-links">
          <a href="#" className="nav-link active">
            <span className="nav-icon">📊</span>
            Dashboard
          </a>
          <a href="#" className="nav-link">
            <span className="nav-icon">📈</span>
            Analytics
          </a>
          <a href="#" className="nav-link">
            <span className="nav-icon">⚙️</span>
            Settings
          </a>
        </div>
      </div>
      <div className="nav-right">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search..." />
        </div>
        <div className="user-menu">
          <div className="user-avatar">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <span className="user-name">{user?.name || 'User'}</span>
          <button className="btn-logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Header
