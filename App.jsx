import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import PreferenceQuiz from './pages/PreferenceQuiz'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const isDevelopment = import.meta.env.NODE_ENV === 'development'

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
    return !isAuthenticated ? children : <Navigate to="/dashboard" />
  }

  return (
    <Router>
      {isDevelopment && (
        <div style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          background: '#ff9800',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 'bold',
          zIndex: 9999,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}>
          DEV MODE
        </div>
      )}
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
          path="/quiz"
          element={
            <PrivateRoute>
              <PreferenceQuiz setIsAuthenticated={setIsAuthenticated} />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage setIsAuthenticated={setIsAuthenticated} />
            </PrivateRoute>
          }
        />
        <Route path="/chat" element={<Navigate to="/dashboard" replace />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App