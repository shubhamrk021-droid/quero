import { useState } from 'react'
import { Menu, X, LogOut, User, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { user, signOut, loading } = useAuth()
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)
    const { error } = await signOut()
    if (!error) {
      setIsUserMenuOpen(false)
      navigate('/')
    }
    setIsLoggingOut(false)
  }

  const getUserName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
    }
    return user?.email?.split('@')[0] || 'User'
  }

  const getUserInitials = () => {
    const name = getUserName()
    if (name.includes(' ')) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-logo">Q</div>
          <span className="brand-text">quero</span>
        </div>

        <button className="hamburger" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <a href="/" className="nav-link active">Home</a>
          <div className="nav-dropdown">
            <a href="#" className="nav-link">NEET UG <span className="dropdown-arrow">▼</span></a>
          </div>
          <div className="nav-dropdown">
            <a href="#" className="nav-link">NEET PG <span className="dropdown-arrow">▼</span></a>
          </div>
          <div className="nav-dropdown">
            <a href="#" className="nav-link">Other Exams <span className="dropdown-arrow">▼</span></a>
          </div>
          <a href="#" className="nav-link">PYQs</a>
          <a href="#" className="nav-link">Pricing</a>
          <a href="#" className="nav-link">Leaderboard</a>
        </div>

        <div className="navbar-actions">
          {!loading && user ? (
            <div className="user-menu">
              <button className="user-menu-trigger" onClick={toggleUserMenu}>
                <div className="user-avatar">{getUserInitials()}</div>
                <div className="user-info-quick">
                  <span className="user-name-quick">{getUserName()}</span>
                  <span className="user-email-quick">{user.email}</span>
                </div>
                <ChevronDown size={18} className={`chevron ${isUserMenuOpen ? 'open' : ''}`} />
              </button>

              {isUserMenuOpen && (
                <div className="user-dropdown-menu">
                  <div className="user-dropdown-header">
                    <div className="user-avatar-large">{getUserInitials()}</div>
                    <div>
                      <p className="user-name-full">{getUserName()}</p>
                      <p className="user-email-full">{user.email}</p>
                    </div>
                  </div>
                  <a href="/dashboard" className="user-dropdown-item">
                    <User size={16} />
                    Dashboard
                  </a>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="user-dropdown-item logout-item"
                  >
                    <LogOut size={16} />
                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <a href="/login" className="btn-login">Login</a>
              <a href="/signup" className="btn btn-primary">Sign Up</a>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
