import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Callback = () => {
  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if the URL has any error parameters
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const urlError = hashParams.get('error')
    const errorDescription = hashParams.get('error_description')

    if (urlError) {
      setError(decodeURIComponent(errorDescription || urlError))
      // Redirect to login after showing error
      setTimeout(() => {
        navigate('/login')
      }, 3000)
      return
    }

    // Wait for user to be loaded, then redirect
    if (!loading && user) {
      navigate('/dashboard')
    } else if (!loading && !user && !urlError) {
      // If no user and no error, redirect to login
      navigate('/login')
    }
  }, [user, loading, navigate])

  return (
    <div style={{
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
    }}>
      <div style={{
        textAlign: 'center',
        color: 'white',
      }}>
        {error ? (
          <div>
            <h2>Authentication Error</h2>
            <p>{error}</p>
            <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
              Redirecting to login...
            </p>
          </div>
        ) : (
          <div>
            <div style={{
              width: '50px',
              height: '50px',
              border: '4px solid rgba(255, 255, 255, 0.3)',
              borderTop: '4px solid white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 2rem',
            }} />
            <h2>Completing your sign in...</h2>
            <p>Please wait while we redirect you to your dashboard.</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default Callback
