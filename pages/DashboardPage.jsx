import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../cmps/Header'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import { CurrencyBitcoin as CurrencyBitcoinIcon, Newspaper as NewspaperIcon } from '@mui/icons-material'
import RefreshIcon from '@mui/icons-material/Refresh';
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
  const [scrolled, setScrolled] = useState(false)
  const [hideNavbar, setHideNavbar] = useState(false)
  const lastScrollY = useRef(0)
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
    loadDashboardContent()
  }, [])

  useEffect(() => {
    const handleScroll = (e) => {
      const container = e.target
      const currentScrollY = container.scrollTop

      // Show shadow when scrolled
      setScrolled(currentScrollY > 20)

      // Hide/show navbar based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down
        setHideNavbar(true)
      } else {
        // Scrolling up
        setHideNavbar(false)
      }

      lastScrollY.current = currentScrollY
    }

    const container = document.querySelector('.dashboard-container')
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
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
        {
          id: 'bitcoin',
          name: 'Bitcoin',
          symbol: 'BTC',
          price: 45234.56,
          change24h: 2.5,
          chartData: [
            { time: '00:00', price: 44200 },
            { time: '04:00', price: 44800 },
            { time: '08:00', price: 44500 },
            { time: '12:00', price: 45000 },
            { time: '16:00', price: 44700 },
            { time: '20:00', price: 45234 }
          ]
        },
        {
          id: 'ethereum',
          name: 'Ethereum',
          symbol: 'ETH',
          price: 3234.78,
          change24h: -1.2,
          chartData: [
            { time: '00:00', price: 3280 },
            { time: '04:00', price: 3260 },
            { time: '08:00', price: 3240 },
            { time: '12:00', price: 3220 },
            { time: '16:00', price: 3250 },
            { time: '20:00', price: 3234 }
          ]
        },
        {
          id: 'cardano',
          name: 'Cardano',
          symbol: 'ADA',
          price: 0.56,
          change24h: 5.3,
          chartData: [
            { time: '00:00', price: 0.52 },
            { time: '04:00', price: 0.53 },
            { time: '08:00', price: 0.54 },
            { time: '12:00', price: 0.55 },
            { time: '16:00', price: 0.54 },
            { time: '20:00', price: 0.56 }
          ]
        }
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
      <Header
        user={user}
        onLogout={handleLogout}
        scrolled={scrolled}
        hideNavbar={hideNavbar}
      />

      <div className="dashboard-container">
        <div className="dashboard-header-section">
          <div className="header-left">
            <h1>Your Daily Crypto Dashboard</h1>
            <p>Curated content based on your preferences</p>
          </div>
          <div className="header-actions">
            <button className="btn-refresh-icon" onClick={loadDashboardContent} title="Refresh">
              <RefreshIcon />
            </button>
          </div>
        </div>

        <div className="dashboard-grid">
          {/* Coin Prices Cards with Charts */}
          <div className="cards-section coins-section">
            <div className="section-header-simple">
              <h2><CurrencyBitcoinIcon /> Coin Prices</h2>
              <div className="vote-buttons">
                <button
                  className={`vote-btn ${feedback.prices === 'up' ? 'active' : ''}`}
                  onClick={() => handleVote('prices', feedback.prices === 'up' ? null : 'up')}
                >
                  <ThumbUpOffAltOutlinedIcon />
                </button>
                <button
                  className={`vote-btn ${feedback.prices === 'down' ? 'active' : ''}`}
                  onClick={() => handleVote('prices', feedback.prices === 'down' ? null : 'down')}
                >
                  <ThumbDownOffAltOutlinedIcon />
                </button>
              </div>
            </div>
            <div className="cards-grid">
              {dashboardData.coins.map((coin) => (
                <div key={coin.id} className="card coin-card">
                  <div className="card-header">
                    <div className="coin-info">
                      <h3>{coin.name}</h3>
                      <span className="coin-symbol">{coin.symbol}</span>
                    </div>
                    <span className={`status-badge ${coin.change24h >= 0 ? 'success' : 'error'}`}>
                      {coin.change24h >= 0 ? '▲' : '▼'} {Math.abs(coin.change24h)}%
                    </span>
                  </div>
                  <div className="coin-price-display">
                    ${coin.price.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cards-section">
            <div className="section-header-simple">
              <h2><NewspaperIcon /> Market News</h2>
              <div className="vote-buttons">
                <button
                  className={`vote-btn ${feedback.news === 'up' ? 'active' : ''}`}
                  onClick={() => handleVote('news', feedback.news === 'up' ? null : 'up')}
                >
                  <ThumbUpOffAltOutlinedIcon />
                </button>
                <button
                  className={`vote-btn ${feedback.news === 'down' ? 'active' : ''}`}
                  onClick={() => handleVote('news', feedback.news === 'down' ? null : 'down')}
                >
                  <ThumbDownOffAltOutlinedIcon />
                </button>
              </div>
            </div>
            <div className="news-cards-grid">
              {dashboardData.news.map((article, index) => (
                <a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer" className="card news-card-item">
                  <div className="news-card-indicator" style={{ background: ['#0ECB81', '#F0B90B', '#3CBAFF'][index % 3] }}></div>
                  <div className="news-card-content">
                    <h4>{article.title}</h4>
                    <span className="news-source">{article.source}</span>
                  </div>
                  <span className="status-badge trending">Trending</span>
                </a>
              ))}
            </div>
          </div>

          {/* AI Insight Card */}
          <div className="card large-card insight-card">
            <div className="card-header-row">
              <h2> AI Insight of the Day</h2>
              <div className="vote-buttons">
                <button
                  className={`vote-btn ${feedback.insight === 'up' ? 'active' : ''}`}
                  onClick={() => handleVote('insight', feedback.insight === 'up' ? null : 'up')}
                >
                  <ThumbUpOffAltOutlinedIcon />
                </button>
                <button
                  className={`vote-btn ${feedback.insight === 'down' ? 'active' : ''}`}
                  onClick={() => handleVote('insight', feedback.insight === 'down' ? null : 'down')}
                >
                  <ThumbDownOffAltOutlinedIcon />
                </button>
              </div>
            </div>
            <div className="insight-content">
              <p className="ai-insight-text">{dashboardData.aiInsight}</p>
              <span className="status-badge priority-high">AI Generated</span>
            </div>
          </div>

          {/* Fun Crypto Meme Card */}
          <div className="card large-card meme-card">
            <div className="card-header-row">
              <h2>Fun Crypto Meme</h2>
              <div className="vote-buttons">
                <button
                  className={`vote-btn ${feedback.meme === 'up' ? 'active' : ''}`}
                  onClick={() => handleVote('meme', feedback.meme === 'up' ? null : 'up')}
                >
                  <ThumbUpOffAltOutlinedIcon />
                </button>
                <button
                  className={`vote-btn ${feedback.meme === 'down' ? 'active' : ''}`}
                  onClick={() => handleVote('meme', feedback.meme === 'down' ? null : 'down')}
                >
                  <ThumbDownOffAltOutlinedIcon />
                </button>
              </div>
            </div>
            <div className="meme-content-card">
              <img src={dashboardData.meme} alt="Crypto Meme" className="meme-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
