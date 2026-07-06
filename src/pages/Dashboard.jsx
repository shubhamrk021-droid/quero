import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  Home,
  Search,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  BookOpen,
  Zap,
  BarChart3,
  Users,
  Trophy,
  ChevronRight,
  Heart,
  Share2,
} from 'lucide-react'
import './Dashboard.css'

const Dashboard = () => {
  const { user, signOut, loading } = useAuth()
  const navigate = useNavigate()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activePage, setActivePage] = useState('home')
  const [selectedExam, setSelectedExam] = useState('NEET UG')

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

  const fullName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
  ]

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage selectedExam={selectedExam} user={user} fullName={fullName} />
      case 'search':
        return <SearchPage />
      case 'notifications':
        return <NotificationsPage />
      case 'profile':
        return <ProfilePage user={user} fullName={fullName} initials={initials} />
      default:
        return <HomePage selectedExam={selectedExam} user={user} fullName={fullName} />
    }
  }

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-box">Q</div>
            {sidebarOpen && <span className="logo-text">quero</span>}
          </div>
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
              title={item.label}
            >
              <item.icon size={24} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button
            className="logout-btn"
            onClick={handleLogout}
            disabled={isSigningOut}
            title="Sign out"
          >
            <LogOut size={20} />
            {sidebarOpen && (
              <span>{isSigningOut ? 'Signing out...' : 'Sign Out'}</span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Navigation Bar */}
        <div className="top-nav">
          <div className="top-nav-left">
            <button
              className="mobile-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="top-nav-right">
            <div className="user-profile">
              <div className="user-avatar-small">{initials}</div>
              <span className="user-name-display">{fullName}</span>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="page-content">
          {renderPage()}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="bottom-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`bottom-nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => setActivePage(item.id)}
            title={item.label}
          >
            <item.icon size={24} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

// Home Page Component
const HomePage = ({ selectedExam, user, fullName }) => {
  const [selectedYear, setSelectedYear] = useState(2024)

  const subjects = [
    { name: 'Physics', icon: '⚛️', color: '#FF6B6B' },
    { name: 'Chemistry', icon: '🧪', color: '#4ECDC4' },
    { name: 'Biology', icon: '🧬', color: '#45B7D1' },
    { name: 'Zoology', icon: '🦁', color: '#FFA07A' },
  ]

  const mockTests = [
    { title: 'Full Test', color: '#6c5ce7' },
    { title: 'Subject Test', color: '#a29bfe' },
    { title: 'Chapter Test', color: '#b19cd9' },
  ]

  return (
    <div className="home-page">
      {/* Header Section */}
      <div className="home-header">
        <div className="header-left">
          <h1 className="header-title">Welcome, {fullName}! 👋</h1>
          <p className="header-subtitle">Keep your learning streak going!</p>
        </div>
        <div className="header-right">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="exam-year-select"
          >
            <option value={2024}>2024</option>
            <option value={2025}>2025</option>
            <option value={2026}>2026</option>
          </select>
        </div>
      </div>

      {/* Daily PYQ Challenge */}
      <section className="section daily-challenge">
        <h2 className="section-title">Daily PYQ Challenge</h2>
        <div className="challenge-card">
          <div className="challenge-content">
            <div className="challenge-icon">📝</div>
            <div className="challenge-text">
              <h3>Today's Question</h3>
              <p>NEET UG 2023 - Biology</p>
            </div>
            <div className="challenge-xp">
              <span className="xp-label">+10 XP</span>
            </div>
          </div>
          <div className="challenge-actions">
            <button className="btn-icon">
              <Heart size={20} />
            </button>
            <button className="btn-primary-small">Solve</button>
          </div>
        </div>
      </section>

      {/* Continue Studying */}
      <section className="section continue-studying">
        <h2 className="section-title">Continue Studying</h2>
        <button className="resume-btn">Resume Last Session</button>
      </section>

      {/* Subjects */}
      <section className="section subjects-section">
        <h2 className="section-title">Subjects</h2>
        <div className="subjects-grid">
          {subjects.map((subject, idx) => (
            <div key={idx} className="subject-card" style={{ borderTopColor: subject.color }}>
              <div className="subject-icon">{subject.icon}</div>
              <h3>{subject.name}</h3>
              <div className="subject-arrow">
                <ChevronRight size={20} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mock Tests */}
      <section className="section mock-tests-section">
        <div className="section-header-with-link">
          <h2 className="section-title">Mock Tests</h2>
          <a href="#" className="view-all-link">
            View Rank <ChevronRight size={18} />
          </a>
        </div>
        <div className="mock-tests-tabs">
          {['Full Test', 'Subject Test', 'Chapter Test', 'Chapter'].map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${tab === 'Full Test' ? 'active' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="mock-tests-grid">
          <div className="pyq-library-card">
            <div className="card-icon">📚</div>
            <h3>PYQ Library</h3>
            <ChevronRight size={20} className="card-arrow" />
          </div>
          <div className="card-item">
            <div className="card-icon">📇</div>
            <h3>Flashcards</h3>
            <ChevronRight size={20} className="card-arrow" />
          </div>
          <div className="card-item">
            <div className="card-icon">📋</div>
            <h3>Revision Planner</h3>
            <ChevronRight size={20} className="card-arrow" />
          </div>
          <div className="card-item">
            <div className="card-icon">❓</div>
            <h3>Doubt Solver</h3>
            <ChevronRight size={20} className="card-arrow" />
          </div>
          <div className="card-item">
            <div className="card-icon">👥</div>
            <h3>Study Groups</h3>
            <ChevronRight size={20} className="card-arrow" />
          </div>
        </div>
      </section>

      {/* Leaderboard & Daily Streak */}
      <section className="section leaderboard-section">
        <div className="leaderboard-row">
          <div className="leaderboard-card">
            <h3 className="card-title">Leaderboard</h3>
            <div className="leaderboard-item">
              <span className="rank">1st</span>
              <span className="name">You</span>
              <span className="score">1250</span>
            </div>
            <div className="leaderboard-item">
              <span className="rank">2nd</span>
              <span className="name">Rahul</span>
              <span className="score">1180</span>
            </div>
            <div className="leaderboard-item">
              <span className="rank">3rd</span>
              <span className="name">Priya</span>
              <span className="score">1120</span>
            </div>
          </div>
          <div className="streak-card">
            <h3 className="card-title">Daily Streak</h3>
            <div className="streak-display">
              <span className="streak-number">15</span>
              <span className="streak-label">days</span>
            </div>
            <p className="streak-description">Keep it up! 🔥</p>
          </div>
        </div>
      </section>
    </div>
  )
}

// Search Page Component
const SearchPage = () => {
  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Search</h1>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search questions, topics, notes, videos..."
          className="search-input"
        />
        <div className="search-filters">
          <button className="filter-chip">Questions</button>
          <button className="filter-chip">Topics</button>
          <button className="filter-chip">Notes</button>
          <button className="filter-chip">Videos</button>
        </div>
      </div>
      <div className="search-results">
        <p>No search results. Try searching for something!</p>
      </div>
    </div>
  )
}

// Notifications Page Component
const NotificationsPage = () => {
  const notifications = [
    { type: 'reminder', title: 'Daily Reminder', desc: 'Do your daily practice' },
    { type: 'test', title: 'New PYQs Added', desc: 'NEET UG 2023 Physics added' },
    { type: 'alert', title: 'Mock Test Alert', desc: 'Most trending test this week' },
  ]

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <h1>Notifications</h1>
      </div>
      <div className="notifications-list">
        {notifications.map((notif, idx) => (
          <div key={idx} className="notification-item">
            <div className="notif-icon">{notif.type === 'reminder' ? '🔔' : notif.type === 'test' ? '📝' : '⚠️'}</div>
            <div className="notif-content">
              <h3>{notif.title}</h3>
              <p>{notif.desc}</p>
            </div>
            <div className="notif-close">×</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Profile Page Component
const ProfilePage = ({ user, fullName, initials }) => {
  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar-large">{initials}</div>
        <h1>{fullName}</h1>
        <p>{user.email}</p>
      </div>

      <div className="profile-sections">
        <div className="profile-section">
          <h2>Performance Analytics</h2>
          <div className="section-item">
            <span>Total Tests</span>
            <span className="value">24</span>
          </div>
          <div className="section-item">
            <span>Average Score</span>
            <span className="value">78%</span>
          </div>
          <div className="section-item">
            <span>Best Subject</span>
            <span className="value">Biology</span>
          </div>
        </div>

        <div className="profile-section">
          <h2>Progress Report</h2>
          <div className="section-item">
            <span>Questions Solved</span>
            <span className="value">456</span>
          </div>
          <div className="section-item">
            <span>Accuracy</span>
            <span className="value">82%</span>
          </div>
        </div>

        <div className="profile-section">
          <h2>Account</h2>
          <div className="section-item">
            <span>Subscription</span>
            <span className="value">Premium</span>
          </div>
          <div className="section-item">
            <span>Joined</span>
            <span className="value">
              {new Date(user.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="profile-section">
          <h2>Bookmarks</h2>
          <button className="section-link">View saved questions</button>
          <ChevronRight size={18} />
        </div>

        <div className="profile-section">
          <h2>Achievements</h2>
          <button className="section-link">View achievements</button>
          <ChevronRight size={18} />
        </div>

        <div className="profile-section">
          <h2>Subscription</h2>
          <button className="section-link">Upgrade plan</button>
          <ChevronRight size={18} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
