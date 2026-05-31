import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Mail, Lock, Chrome } from 'lucide-react'
import './Auth.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const { signInWithGoogle, signIn, user, error: authError } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setLocalError(null)

    if (!email || !password) {
      setLocalError('Please fill in all fields')
      return
    }

    setIsLoading(true)
    const { error } = await signIn(email, password)

    if (error) {
      setLocalError(error.message)
    } else {
      navigate('/dashboard')
    }
    setIsLoading(false)
  }

  const handleGoogleLogin = async () => {
    setLocalError(null)
    setIsLoading(true)
    const { error } = await signInWithGoogle()

    if (error) {
      setLocalError(error.message)
    }
    // Note: Google auth redirects, so navigation happens after redirect
    setIsLoading(false)
  }

  const displayError = localError || authError

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          {/* Header */}
          <div className="auth-header">
            <div className="auth-logo-box">
              <span className="auth-logo">Q</span>
            </div>
            <h1 className="auth-title">Welcome Back to Quero</h1>
            <p className="auth-subtitle">
              Sign in to continue your exam preparation journey
            </p>
          </div>

          {/* Error Message */}
          {displayError && (
            <div className="error-alert">
              <p>{displayError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleEmailLogin} className="auth-form">
            {/* Email Input */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="form-input"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="form-input"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="form-remember">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="checkbox-input"
              />
              <label htmlFor="rememberMe" className="checkbox-label">
                Remember me
              </label>
              <a href="#" className="forgot-link">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="auth-button primary"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <span>OR</span>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="auth-button google"
          >
            <Chrome size={20} />
            Continue with Google
          </button>

          {/* Sign Up Link */}
          <p className="auth-footer">
            Don't have an account?{' '}
            <a href="/signup" className="auth-link">
              Sign up now
            </a>
          </p>
        </div>

        {/* Side Decoration */}
        <div className="auth-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-text">
            <h2>Your Journey to Success</h2>
            <p>Start practicing with Quero and ace your exams!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
