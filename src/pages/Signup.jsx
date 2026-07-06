import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Mail, Lock, User, Chrome } from 'lucide-react'
import './Auth.css'

const Signup = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [localError, setLocalError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const { signInWithGoogle, signUp, user, error: authError } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const validateForm = () => {
    setLocalError(null)

    if (!fullName.trim()) {
      setLocalError('Please enter your full name')
      return false
    }

    if (!email.trim()) {
      setLocalError('Please enter your email address')
      return false
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setLocalError('Please enter a valid email address')
      return false
    }

    if (!password) {
      setLocalError('Please enter a password')
      return false
    }

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters long')
      return false
    }

    if (!confirmPassword) {
      setLocalError('Please confirm your password')
      return false
    }

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match')
      return false
    }

    if (!agreeToTerms) {
      setLocalError('Please agree to the Terms of Service and Privacy Policy')
      return false
    }

    return true
  }

  const handleEmailSignup = async (e) => {
    e.preventDefault()
    setLocalError(null)
    setSuccessMessage(null)

    if (!validateForm()) return

    setIsLoading(true)
    try {
      const { data, error } = await signUp(email, password)

      if (error) {
        setLocalError(error.message || 'Failed to create account. Please try again.')
      } else if (data) {
        setSuccessMessage('Account created successfully! Redirecting to login...')
        setFullName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setAgreeToTerms(false)
        
        setTimeout(() => {
          navigate('/login', {
            state: { message: 'Sign up successful! Please sign in with your credentials.' },
          })
        }, 2000)
      }
    } catch (err) {
      setLocalError(err.message || 'An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    setLocalError(null)
    setSuccessMessage(null)
    setIsLoading(true)
    try {
      const { error } = await signInWithGoogle()

      if (error) {
        setLocalError(error.message || 'Failed to sign up with Google. Please try again.')
      }
    } catch (err) {
      setLocalError(err.message || 'An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
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
            <h1 className="auth-title">Join Quero Today</h1>
            <p className="auth-subtitle">
              Create an account to start your exam preparation journey
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
          <form onSubmit={handleEmailSignup} className="auth-form">
            {/* Full Name Input */}
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="form-input"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

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
                  required
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
                  required
                />
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="form-input"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="form-agreement">
              <input
                id="agreeToTerms"
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="checkbox-input"
              />
              <label htmlFor="agreeToTerms" className="checkbox-label">
                I agree to the{' '}
                <a href="#" className="auth-link">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="auth-link">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="auth-button primary"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <span>OR</span>
          </div>

          {/* Google Signup Button */}
          <button
            onClick={handleGoogleSignup}
            disabled={isLoading}
            className="auth-button google"
          >
            <Chrome size={20} />
            Sign up with Google
          </button>

          {/* Sign In Link */}
          <p className="auth-footer">
            Already have an account?{' '}
            <a href="/login" className="auth-link">
              Sign in
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

export default Signup
