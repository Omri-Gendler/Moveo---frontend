function Header({ user, onLogout }) {
  return (
    <div className="chat-header">
      <h1>🤖 AI Crypto Advisor</h1>
      <div className="user-info">
        <span className="user-name">Hello, {user?.name || 'User'}</span>
        <button className="btn-logout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Header
