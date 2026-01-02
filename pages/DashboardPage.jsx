import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../cmps/Header'
import '../style/dashboard.css'

function DashboardPage({ setIsAuthenticated }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState({
    news: [],
    coins: [],
    aiInsight: '',
    meme: ''
  })
  const [feedback, setFeedback] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
    loadDashboardContent()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
    navigate('/login')
  }

  const loadDashboardContent = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/dashboard', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })

      if (response.status === 401) {
        handleLogout()
        return
      }

      if (response.ok) {
        const data = await response.json()
        setDashboardData(data)
      } else {
        loadFallbackData()
      }
    } catch (error) {
      console.error('Error loading dashboard:', error)
      loadFallbackData()
    } finally {
      setLoading(false)
    }
  }

  const loadFallbackData = () => {
    setDashboardData({
      news: [
        { id: 1, title: 'Bitcoin Reaches New All-Time High', source: 'CryptoNews', url: '#' },
        { id: 2, title: 'Ethereum Upgrade Successfully Deployed', source: 'CoinDesk', url: '#' },
        { id: 3, title: 'Major Institution Adopts Crypto Payments', source: 'Bloomberg', url: '#' }
      ],
      coins: [
        { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 45234.56, change24h: 2.5 },
        { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 3234.78, change24h: -1.2 },
        { id: 'cardano', name: 'Cardano', symbol: 'ADA', price: 0.56, change24h: 5.3 }
      ],
      aiInsight: 'Based on market trends, diversification across major cryptocurrencies remains a solid strategy. Consider DCA (Dollar Cost Averaging) for long-term positions.',
      meme: 'https://i.imgflip.com/7kqcfl.jpg'
    })
  }

  const handleVote = async (section, vote) => {
    setFeedback({ ...feedback, [section]: vote })

    try {
      await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ section, vote }),
      })
    } catch (error) {
      console.error('Error saving feedback:', error)
    }
  }

  if (loading) {
    return (
      <div className="dashboard-page">
        <Header user={user} onLogout={handleLogout} />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading your personalized dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-page">
      <Header user={user} onLogout={handleLogout} />
      
      <div className="dashboard-container">
        <div className="dashboard-header-section">
          <div className="header-left">
            <h1>Your Daily Crypto Dashboard</h1>
            <p>Curated content based on your preferences</p>
          </div>
          <div className="header-actions">
            <button className="btn-new-item">+ New Item</button>
            <button className="btn-refresh-icon" onClick={loadDashboardContent} title="Refresh">
              🔄
            </button>
          </div>
        </div>

        <div className="dashboard-table">
          {/* Market News Section */}
          <div className="table-section">
            <div className="section-header">
              <div className="section-title">
                <span className="section-indicator green"></span>
                <h2>📰 Market News</h2>
              </div>
              <div className="vote-buttons">
                <button 
                  className={`vote-btn ${feedback.news === 'up' ? 'active' : ''}`}
                  onClick={() => handleVote('news', feedback.news === 'up' ? null : 'up')}
                >
                  👍
                </button>
                <button 
                  className={`vote-btn ${feedback.news === 'down' ? 'active' : ''}`}
                  onClick={() => handleVote('news', feedback.news === 'down' ? null : 'down')}
                >
                  👎
                </button>
              </div>
            </div>
            <div className="table-content">
              {dashboardData.news.map((article, index) => (
                <div key={article.id} className="table-row">
                  <div className="row-color" style={{ background: ['#00c875', '#fdab3d', '#0073ea'][index % 3] }}></div>
                  <div className="row-content">
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      <span className="row-title">{article.title}</span>
                      <span className="row-meta">{article.source}</span>
                    </a>
                  </div>
                  <span className="status-badge trending">Trending</span>
                </div>
              ))}
            </div>
          </div>

          {/* Coin Prices Section */}
          <div className="table-section">
            <div className="section-header">
              <div className="section-title">
                <span className="section-indicator yellow"></span>
                <h2>💰 Coin Prices</h2>
              </div>
              <div className="vote-buttons">
                <button 
                  className={`vote-btn ${feedback.prices === 'up' ? 'active' : ''}`}
                  onClick={() => handleVote('prices', feedback.prices === 'up' ? null : 'up')}
                >
                  👍
                </button>
                <button 
                  className={`vote-btn ${feedback.prices === 'down' ? 'active' : ''}`}
                  onClick={() => handleVote('prices', feedback.prices === 'down' ? null : 'down')}
                >
                  👎
                </button>
              </div>
            </div>
            <div className="table-content">
              {dashboardData.coins.map((coin, index) => (
                <div key={coin.id} className="table-row">
                  <div className="row-color" style={{ background: ['#fdab3d', '#00c875', '#a25ddc'][index % 3] }}></div>
                  <div className="row-content coin-row">
                    <div className="coin-info">
                      <span className="row-title">{coin.name}</span>
                      <span className="row-meta">{coin.symbol}</span>
                    </div>
                    <div className="coin-details">
                      <span className="coin-price">${coin.price.toLocaleString()}</span>
                      <span className={`status-badge ${coin.change24h >= 0 ? 'success' : 'error'}`}>
                        {coin.change24h >= 0 ? '▲' : '▼'} {Math.abs(coin.change24h)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insight Section */}
          <div className="table-section">
            <div className="section-header">
              <div className="section-title">
                <span className="section-indicator blue"></span>
                <h2>🤖 AI Insight of the Day</h2>
              </div>
              <div className="vote-buttons">
                <button 
                  className={`vote-btn ${feedback.insight === 'up' ? 'active' : ''}`}
                  onClick={() => handleVote('insight', feedback.insight === 'up' ? null : 'up')}
                >
                  👍
                </button>
                <button 
                  className={`vote-btn ${feedback.insight === 'down' ? 'active' : ''}`}
                  onClick={() => handleVote('insight', feedback.insight === 'down' ? null : 'down')}
                >
                  👎
                </button>
              </div>
            </div>
            <div className="table-content">
              <div className="table-row insight-row">
                <div className="row-color blue"></div>
                <div className="row-content">
                  <p className="ai-insight">{dashboardData.aiInsight}</p>
                </div>
                <span className="status-badge priority-high">AI Generated</span>
              </div>
            </div>
          </div>

          {/* Fun Crypto Meme Section */}
          <div className="table-section">
            <div className="section-header">
              <div className="section-title">
                <span className="section-indicator pink"></span>
                <h2>😂 Fun Crypto Meme</h2>
              </div>
              <div className="vote-buttons">
                <button 
                  className={`vote-btn ${feedback.meme === 'up' ? 'active' : ''}`}
                  onClick={() => handleVote('meme', feedback.meme === 'up' ? null : 'up')}
                >
                  👍
                </button>
                <button 
                  className={`vote-btn ${feedback.meme === 'down' ? 'active' : ''}`}
                  onClick={() => handleVote('meme', feedback.meme === 'down' ? null : 'down')}
                >
                  👎
                </button>
              </div>
            </div>
            <div className="table-content">
              <div className="table-row meme-row">
                <div className="row-color pink"></div>
                <div className="row-content meme-content">
                  <img src={dashboardData.meme} alt="Crypto Meme" className="meme-image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
