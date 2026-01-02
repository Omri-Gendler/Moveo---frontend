import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../style/auth.css'

function PreferenceQuiz({ setIsAuthenticated }) {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(false)

  const questions = [
    {
      id: 'assets',
      question: 'What crypto assets are you interested in?',
      options: [
        { value: 'bitcoin', label: 'Bitcoin (BTC)' },
        { value: 'ethereum', label: 'Ethereum (ETH)' },
        { value: 'altcoins', label: 'Altcoins & Emerging Projects' },
        { value: 'stablecoins', label: 'Stablecoins' },
        { value: 'all', label: 'All Cryptocurrencies' }
      ]
    },
    {
      id: 'investorType',
      question: 'What type of investor are you?',
      options: [
        { value: 'hodler', label: 'HODLer - Long-term holder' },
        { value: 'daytrader', label: 'Day Trader - Active trading' },
        { value: 'nft', label: 'NFT Collector - Digital art enthusiast' },
        { value: 'defi', label: 'DeFi Explorer - Decentralized finance' },
        { value: 'casual', label: 'Casual Investor - Learning & exploring' }
      ]
    },
    {
      id: 'content',
      question: 'What kind of content would you like to see?',
      options: [
        { value: 'news', label: 'Market News - Latest updates' },
        { value: 'charts', label: 'Charts & Technical Analysis' },
        { value: 'social', label: 'Social Trends & Community' },
        { value: 'fun', label: 'Fun - Memes & Entertainment' },
        { value: 'all', label: 'All Content Types' }
      ]
    }
  ]

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      submitPreferences(newAnswers)
    }
  }

  const submitPreferences = async (finalAnswers) => {
    setLoading(true)
    
    try {
      const response = await fetch('http://localhost:5000/api/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ preferences: finalAnswers }),
      })

      if (response.ok) {
        // Update user data with preferences
        const userData = JSON.parse(localStorage.getItem('user'))
        userData.preferences = finalAnswers
        localStorage.setItem('user', JSON.stringify(userData))
        
        navigate('/dashboard')
      } else {
        console.error('Failed to save preferences')
        navigate('/dashboard')
      }
    } catch (error) {
      console.error('Error saving preferences:', error)
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleSkip = () => {
    navigate('/dashboard')
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="auth-page">
      <div className="auth-container quiz-container">
        <div className="auth-header">
          <h1> Personalize Your Experience</h1>
          <p>Help us understand your crypto journey</p>
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="quiz-content">
          <div className="question-counter">
            Question {currentQuestion + 1} of {questions.length}
          </div>

          <h2 className="question-text">{questions[currentQuestion].question}</h2>

          <div className="options-list">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option.value}
                className="option-button"
                onClick={() => handleAnswer(option.value)}
                disabled={loading}
              >
                {option.label}
              </button>
            ))}
          </div>

          <button className="btn-skip" onClick={handleSkip} disabled={loading}>
            Skip for now
          </button>
        </div>
      </div>
    </div>
  )
}

export default PreferenceQuiz
