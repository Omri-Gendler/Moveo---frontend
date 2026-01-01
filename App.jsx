import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ChatPage from './pages/ChatPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)
    setLoading(false)
  }, [])

  const PrivateRoute = ({ children }) => {
    if (loading) return <div className="spinner"></div>
    return isAuthenticated ? children : <Navigate to="/login" />
  }

  const PublicRoute = ({ children }) => {
    if (loading) return <div className="spinner"></div>
    return !isAuthenticated ? children : <Navigate to="/chat" />
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage setIsAuthenticated={setIsAuthenticated} />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage setIsAuthenticated={setIsAuthenticated} />
            </PublicRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatPage setIsAuthenticated={setIsAuthenticated} />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App