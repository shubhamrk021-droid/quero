import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Mail, Lock, Chrome, ArrowLeft } from 'lucide-react'
import './Auth.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [showForgotForm, setShowForgotForm] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotLoading, setForgotLoading] = useState(false)
  const { signInWithGoogle, signIn, resetPassword, user, error: authError } = useAuth()
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
    setSuccessMessage(null)

    if (!email || !password) {
      setLocalError('Please fill in all fields')
      return
    }

    setIsLoading(true)
    const { error } = await signIn(email, password)

    if (error) {
      setLocalError(error.message || 'Failed to sign in. Please try again.')
    } else {
      setSuccessMessage('Sign in successful! Redirecting...')
      setTimeout(() => navigate('/dashboard'), 1000)
    }
    setIsLoading(false)
  }

  const handleGoogleLogin = async () => {
    setLocalError(null)
    setSuccessMessage(null)
    setIsLoading(true)
    const { error } = await signInWithGoogle()

    if (error) {
      setLocalError(error.message || 'Failed to sign in with Google')
    }
    setIsLoading(false)
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    setLocalError(null)
    setSuccessMessage(null)

    if (!forgotEmail) {
      setLocalError('Please enter your email address')
      return
    }

    setForgotLoading(true)
    const { error } = await resetPassword(forgotEmail)

    if (error) {
      setLocalError(error.message || 'Failed to send reset email. Please try again.')
    } else {
      setSuccessMessage('Password reset email sent! Check your inbox.')
      setForgotEmail('')
      setTimeout(() => setShowForgotForm(false), 2000)
    }
    setForgotLoading(false)
  }

  const displayError = localError || authError

  if (showForgotForm) {
    return (
      <div className="auth-container">
        <div className="auth-wrapper">
          <div className="auth-card">
            {/* Header */}
            <div className="auth-header">
              <div className="auth-logo-box">
                <span className="auth-logo">Q</span>
              </div>
              <h1 className="auth-title">Reset Password</h1>
              <p className="auth-subtitle">
                Enter your email to receive a password reset link
              </p>
            </div>

            {/* Error Message */}
            {displayError && (
              <div className="error-alert">
                <p>{displayError}</p>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="success-alert">
                <p>{successMessage}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleForgotPassword} className="auth-form">
              {/* Email Input */}
              <div className="form-group">
                <label htmlFor="forgotEmail" className="form-label">
                  Email Address
                </label>
                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input
                    id="forgotEmail"
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="form-input"
                    disabled={forgotLoading}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={forgotLoading}
                className="auth-button primary"
              >
                {forgotLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            {/* Back to Login */}
            <button
              onClick={() => {
                setShowForgotForm(false)
                setLocalError(null)
                setSuccessMessage(null)
                setForgotEmail('')
              }}
              className="back-to-login"
            >
              <ArrowLeft size={18} />
              Back to Sign In
            </button>
          </div>

          {/* Side Decoration */}
          <div className="auth-decoration">
            <div className="decoration-circle circle-1"></div>
            <div className="decoration-circle circle-2"></div>
            <div className="decoration-text">
              <h2>Forgot Your Password?</h2>
              <p>No worries! We'll help you reset it in minutes.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

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

          {/* Success Message */}
          {successMessage && (
            <div className="success-alert">
              <p>{successMessage}</p>
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

            {/* Remember Me & Forgot Password */}
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
              <button
                type="button"
                onClick={() => setShowForgotForm(true)}
                className="forgot-link"
              >
                Forgot password?
              </button>
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
