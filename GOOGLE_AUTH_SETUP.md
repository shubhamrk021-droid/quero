# Supabase Google Authentication Setup Guide

Complete guide to set up Google OAuth authentication for your Quero application.

## Prerequisites

- Supabase project created at [supabase.com](https://supabase.com)
- Google Cloud Console account
- Your application credentials in `.env.local`

## Step 1: Verify Supabase Credentials

Your `.env.local` file should contain:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

These are already configured in your project. If you need to update them:
1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to Settings → API
4. Copy the Project URL and Anon Key

## Step 2: Configure Google OAuth Provider

### A. Create Google OAuth Application

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the "Google+ API":
   - Click "Enable APIs and Services"
   - Search for "Google+ API"
   - Click "Enable"

### B. Create OAuth 2.0 Credentials

1. Go to "Credentials" in the left sidebar
2. Click "Create Credentials" → "OAuth 2.0 Client ID"
3. Choose "Web application"
4. Configure:
   - **Name**: Quero (or your app name)
   - **Authorized JavaScript origins**: Add both:
     - `http://localhost:5173` (for development)
     - `https://yourdomain.com` (for production)
   - **Authorized redirect URIs**: Add both:
     - `http://localhost:5173/auth/callback` (for development)
     - `https://yourdomain.com/auth/callback` (for production)

5. Click "Create"
6. Copy your **Client ID** and **Client Secret**

### C. Configure Supabase with Google OAuth

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Navigate to: Authentication → Providers
3. Find "Google" and click it
4. Enable the provider (toggle on)
5. Paste your Google **Client ID** and **Client Secret**
6. Click "Save"

### D. Set Redirect URL (if needed)

In Supabase, go to: Authentication → URL Configuration
- Add your callback URLs:
  - `http://localhost:5173/auth/callback` (development)
  - `https://yourdomain.com/auth/callback` (production)

## Step 3: Test the Integration

### Local Development

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:5173`

3. Click on "Continue with Google" button in the navbar or login page

4. You should be redirected to Google login

5. After successful authentication, you'll be redirected to the dashboard

### Features

- ✅ Google OAuth Sign In
- ✅ User session persistence (localStorage)
- ✅ User profile display (name and email)
- ✅ Logout functionality
- ✅ Protected routes (dashboard only accessible after login)
- ✅ Automatic redirect to dashboard after login
- ✅ Landing page remains accessible without authentication

## Step 4: Verify User Information Display

After successful Google login, you should see:

1. **In Navbar**: User avatar with initials, name, and email
2. **User Menu Dropdown**: 
   - Full name and email
   - Link to Dashboard
   - Logout button
3. **In Dashboard**: Full user profile with email

## Troubleshooting

### Issue: "Invalid Client ID"
- Verify your Google Client ID is correct
- Check that Google+ API is enabled in Google Cloud Console

### Issue: "Redirect URI mismatch"
- Ensure your redirect URL matches exactly:
  - In Google Cloud Console authorized redirect URIs
  - In Supabase URL Configuration
  - In the code: `http://localhost:5173/auth/callback`

### Issue: User not showing after login
- Check browser console for errors
- Verify .env.local variables are correct
- Clear browser cache and localStorage
- Check that session is being stored in localStorage

### Issue: Google login button not working
- Check that Google provider is enabled in Supabase
- Verify internet connection
- Check browser console for CORS errors
- Clear browser cache

## Environment Variables

### Development (.env.local)
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Production
Set the same environment variables in your deployment platform:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Build & Deploy → Environment
- Other platforms: Follow their documentation

## File Structure

```
src/
├── lib/
│   └── supabase.js           # Supabase client initialization
├── context/
│   └── AuthContext.jsx       # Auth state management
├── components/
│   └── Navbar.jsx            # Navbar with user menu
├── pages/
│   ├── Login.jsx             # Login page with Google button
│   ├── Dashboard.jsx         # Protected dashboard
│   └── Callback.jsx          # OAuth callback handler
└── App.jsx                   # Main app with routes
```

## Key Features Implemented

1. **Supabase Client** (`src/lib/supabase.js`)
   - Initialized with environment credentials
   - Reads from `.env.local` (VITE_ prefix for Vite)

2. **Auth Context** (`src/context/AuthContext.jsx`)
   - Global state management for user and auth methods
   - Persists session in localStorage
   - Provides `useAuth()` hook

3. **Google OAuth**
   - `signInWithOAuth({ provider: 'google' })`
   - Redirects to `localhost:5173/auth/callback`
   - Automatic session storage

4. **Navbar Integration**
   - Shows user avatar and name when logged in
   - Dropdown menu with Dashboard link and Logout
   - Sign In/Sign Up buttons when not logged in

5. **Protected Routes**
   - Dashboard only accessible with valid session
   - Automatic redirect to login if not authenticated

6. **Session Persistence**
   - Session stored in localStorage
   - Restored on page reload
   - Auth state listener for automatic updates

## Security Notes

- Anon Key is safe to expose (it has limited permissions)
- Session is stored client-side and automatically managed by Supabase
- Protected routes prevent unauthorized access
- Logout clears session from both Supabase and localStorage

## Next Steps

1. ✅ Configure Google OAuth credentials
2. ✅ Enable Google provider in Supabase
3. ✅ Test local authentication flow
4. ✅ Deploy to production with updated environment variables
5. Deploy your application with production redirect URLs

## Support

For issues with:
- **Supabase**: [Supabase Docs](https://supabase.com/docs)
- **Google OAuth**: [Google OAuth Docs](https://developers.google.com/identity/protocols/oauth2)
- **React Router**: [React Router Docs](https://reactrouter.com/)
