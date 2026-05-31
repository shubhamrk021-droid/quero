import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogOut, User, Mail, Calendar } from 'lucide-react'
import './Dashboard.css'

const Dashboard = () => {
  const { user, signOut, loading } = useAuth()
  const navigate = useNavigate()
  const [isSigningOut, setIsSigningOut] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
  }, [user, loading, navigate])

  const handleLogout = async () => {
    setIsSigningOut(true)
    const { error } = await signOut()
    if (!error) {
      navigate('/login')
    }
    setIsSigningOut(false)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const initials = user.user_metadata?.full_name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() || user.email?.charAt(0).toUpperCase()

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        {/* Navbar */}
        <nav className="dashboard-navbar">
          <div className="navbar-container">
            <div className="navbar-brand">
              <div className="brand-logo">Q</div>
              <span className="brand-text">quero</span>
            </div>
            <button
              onClick={handleLogout}
              disabled={isSigningOut}
              className="logout-button"
              title="Sign out"
            >
              <LogOut size={20} />
              {isSigningOut ? 'Signing out...' : 'Sign Out'}
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="dashboard-main">
          <div className="dashboard-content">
            {/* Welcome Section */}
            <div className="welcome-section">
              <div className="welcome-header">
                <div className="avatar-large">{initials}</div>
                <div className="welcome-text">
                  <h1 className="welcome-title">
                    Welcome, {user.user_metadata?.full_name || 'User'}!
                  </h1>
                  <p className="welcome-subtitle">
                    You're all set to start your exam preparation journey
                  </p>
                </div>
              </div>
            </div>

            {/* User Info Cards */}
            <div className="info-grid">
              {/* User Details Card */}
              <div className="info-card">
                <div className="card-header">
                  <User size={24} />
                  <h2>Account Information</h2>
                </div>
                <div className="card-content">
                  {user.user_metadata?.full_name && (
                    <div className="info-row">
                      <span className="info-label">Full Name:</span>
                      <span className="info-value">
                        {user.user_metadata.full_name}
                      </span>
                    </div>
                  )}
                  <div className="info-row">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{user.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">User ID:</span>
                    <span className="info-value info-monospace">
                      {user.id.substring(0, 12)}...
                    </span>
                  </div>
                </div>
              </div>

              {/* Account Stats Card */}
              <div className="info-card">
                <div className="card-header">
                  <Calendar size={24} />
                  <h2>Account Status</h2>
                </div>
                <div className="card-content">
                  <div className="info-row">
                    <span className="info-label">Status:</span>
                    <span className="info-value status-active">Active</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Joined:</span>
                    <span className="info-value">
                      {new Date(user.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Last Sign In:</span>
                    <span className="info-value">
                      {user.last_sign_in_at
                        ? new Date(user.last_sign_in_at).toLocaleDateString()
                        : 'Now'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="features-section">
              <h2>What's Next?</h2>
              <div className="features-grid">
                <div className="feature-box">
                  <div className="feature-icon">📝</div>
                  <h3>Mock Tests</h3>
                  <p>Take full-length mock tests and track your progress</p>
                  <button className="feature-button">Start Testing</button>
                </div>
                <div className="feature-box">
                  <div className="feature-icon">📚</div>
                  <h3>Previous Year Questions</h3>
                  <p>Practice with actual exam questions from past years</p>
                  <button className="feature-button">Explore PYQs</button>
                </div>
                <div className="feature-box">
                  <div className="feature-icon">📊</div>
                  <h3>Performance Analysis</h3>
                  <p>Get detailed insights into your strengths and weaknesses</p>
                  <button className="feature-button">View Analytics</button>
                </div>
                <div className="feature-box">
                  <div className="feature-icon">🏆</div>
                  <h3>Leaderboard</h3>
                  <p>Compete with other students and climb the rankings</p>
                  <button className="feature-button">View Rankings</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
