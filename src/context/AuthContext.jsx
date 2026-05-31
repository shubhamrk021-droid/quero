import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      try {
        const {
          data: { user: currentUser },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError && userError.status !== 400) {
          console.error('Error fetching user:', userError)
          setError(userError.message)
        }

        setUser(currentUser || null)
      } catch (err) {
        console.error('Unexpected error:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    checkUser()

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
      setLoading(false)

      // Store session in localStorage for persistence
      if (session) {
        localStorage.setItem('supabase_session', JSON.stringify(session))
      } else {
        localStorage.removeItem('supabase_session')
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const signInWithGoogle = async () => {
    try {
      setError(null)
      const redirectUrl = `${window.location.origin}/auth/callback`
      
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (signInError) {
        setError(signInError.message)
        return { error: signInError }
      }
    } catch (err) {
      setError(err.message)
      return { error: err }
    }
  }

  const signUp = async (email, password) => {
    try {
      setError(null)
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (signUpError) {
        setError(signUpError.message)
        return { data: null, error: signUpError }
      }

      return { data, error: null }
    } catch (err) {
      setError(err.message)
      return { data: null, error: err }
    }
  }

  const signIn = async (email, password) => {
    try {
      setError(null)
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message)
        return { data: null, error: signInError }
      }

      return { data, error: null }
    } catch (err) {
      setError(err.message)
      return { data: null, error: err }
    }
  }

  const signOut = async () => {
    try {
      setError(null)
      const { error: signOutError } = await supabase.auth.signOut()

      if (signOutError) {
        setError(signOutError.message)
        return { error: signOutError }
      }

      setUser(null)
      localStorage.removeItem('supabase_session')
      return { error: null }
    } catch (err) {
      setError(err.message)
      return { error: err }
    }
  }

  const resetPassword = async (email) => {
    try {
      setError(null)
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email)

      if (resetError) {
        setError(resetError.message)
        return { error: resetError }
      }

      return { error: null }
    } catch (err) {
      setError(err.message)
      return { error: err }
    }
  }

  const value = {
    user,
    loading,
    error,
    signInWithGoogle,
    signUp,
    signIn,
    signOut,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
