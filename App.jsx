import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import PreferenceQuiz from './pages/PreferenceQuiz'

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
    return !isAuthenticated ? children : <Navigate to="/dashboard" />
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