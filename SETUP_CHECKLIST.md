# 🚀 Quick Setup Checklist

Complete this checklist to finalize your Google Authentication setup.

## ✅ Code Implementation (DONE)

- [x] Supabase client initialized (`src/lib/supabase.js`)
- [x] Auth context with useAuth hook (`src/context/AuthContext.jsx`)
- [x] Google OAuth signInWithOAuth configured
- [x] Navbar updated with user menu and logout
- [x] OAuth callback handler created (`src/pages/Callback.jsx`)
- [x] Routes updated with callback route (`src/App.jsx`)
- [x] Session persistence implemented
- [x] Protected routes working
- [x] Login and Signup pages with Google buttons
- [x] Dashboard with user info display

## ⚙️ Configuration Steps (DO THIS)

### Step 1: Verify Supabase Credentials
- [ ] Check `.env.local` has your Supabase credentials:
  ```
  VITE_SUPABASE_URL=your-url
  VITE_SUPABASE_ANON_KEY=your-key
  ```
- [ ] Credentials are correct and accessible

### Step 2: Set Up Google OAuth in Google Cloud Console
- [ ] Create Google Cloud project
- [ ] Enable Google+ API
- [ ] Create OAuth 2.0 credentials (Web application type)
- [ ] Save your **Client ID** and **Client Secret**
- [ ] Add authorized origins:
  - `http://localhost:5173` (development)
  - `https://yourdomain.com` (production)
- [ ] Add authorized redirect URIs:
  - `http://localhost:5173/auth/callback`
  - `https://yourdomain.com/auth/callback`

### Step 3: Configure Supabase Google Provider
- [ ] Go to Supabase Dashboard
- [ ] Navigate to: Authentication → Providers
- [ ] Enable Google provider
- [ ] Paste Google **Client ID** and **Client Secret**
- [ ] Click Save

### Step 4: Set Redirect URLs in Supabase
- [ ] Go to: Authentication → URL Configuration
- [ ] Add redirect URL: `http://localhost:5173/auth/callback`
- [ ] Add redirect URL (production): `https://yourdomain.com/auth/callback`
- [ ] Save configuration

## 🧪 Testing (DO THIS)

### Local Testing
- [ ] Start dev server: `npm run dev`
- [ ] Go to `http://localhost:5173`
- [ ] Click "Login" in navbar
- [ ] Click "Continue with Google"
- [ ] Google login page appears
- [ ] After login, redirected to dashboard
- [ ] User name and email shown in navbar
- [ ] Can see dropdown menu with logout
- [ ] Logout button works
- [ ] Refreshing page keeps session

### Verify Features
- [ ] Landing page works without login
- [ ] Can access login/signup pages
- [ ] Dashboard only accessible after login
- [ ] User avatar shows in navbar when logged in
- [ ] User menu shows correct information
- [ ] Logout removes session
- [ ] Session persists after page refresh

## 🐛 Troubleshooting If Issues Arise

### "Invalid Client ID" or "Client ID mismatch"
- [ ] Verify Google Client ID is correct in Supabase
- [ ] Check Google+ API is enabled in Google Cloud
- [ ] Ensure OAuth credentials are Web application type

### "Redirect URI mismatch"
- [ ] Check exact URL matches in 3 places:
  1. Supabase URL Configuration
  2. Google Cloud Console authorized URIs
  3. Code: `http://localhost:5173/auth/callback`
- [ ] No trailing slashes or extra characters

### "User not showing after login"
- [ ] Check localStorage for session (DevTools → Application)
- [ ] Check browser console for errors
- [ ] Verify AuthProvider wraps entire App
- [ ] Check network tab for failed requests

### "Navbar not updating after login"
- [ ] Clear browser cache and localStorage
- [ ] Check that useAuth hook is properly imported
- [ ] Verify AuthProvider context is working
- [ ] Check browser console for errors

### "Can't access dashboard"
- [ ] Login first with Google
- [ ] Check that ProtectedRoute is properly configured
- [ ] Verify session is saved in localStorage

## 📚 Files to Review

If something doesn't work, check these files:

1. **Authentication Logic**
   - `src/context/AuthContext.jsx` - Auth methods and state
   - `src/lib/supabase.js` - Supabase initialization

2. **UI Components**
   - `src/components/Navbar.jsx` - User menu and logout
   - `src/components/Navbar.css` - Styling
   - `src/pages/Callback.jsx` - OAuth redirect handler

3. **Routing**
   - `src/App.jsx` - Route configuration
   - `src/components/ProtectedRoute.jsx` - Route protection

4. **Auth Pages**
   - `src/pages/Login.jsx` - Login with Google button
   - `src/pages/Signup.jsx` - Signup with Google button
   - `src/pages/Dashboard.jsx` - Protected dashboard

## 📞 Quick Reference URLs

- Local app: `http://localhost:5173`
- Login page: `http://localhost:5173/login`
- Signup page: `http://localhost:5173/signup`
- Dashboard: `http://localhost:5173/dashboard`
- Callback: `http://localhost:5173/auth/callback`

## 🎯 Success Criteria

You'll know it's working when:

✅ Can login with Google  
✅ User name appears in navbar  
✅ User email shows in navbar dropdown  
✅ Dashboard is accessible after login  
✅ Dashboard shows user profile  
✅ Can logout from navbar  
✅ Session persists after refresh  
✅ Landing page works without login  
✅ Redirected to dashboard after Google login  

## 🚀 Ready to Deploy?

When deploying to production:

1. [ ] Update `.env` files with production Supabase credentials
2. [ ] Update redirect URLs in Supabase to production domain
3. [ ] Update Google OAuth credentials for production domain
4. [ ] Test on production domain before going live
5. [ ] Run `npm run build`
6. [ ] Deploy built files

## 📖 Documentation

- **Complete Setup Guide**: See `GOOGLE_AUTH_SETUP.md`
- **Implementation Details**: See `IMPLEMENTATION_SUMMARY.md`
- **Code Comments**: Check individual component files
- **Supabase Docs**: https://supabase.com/docs/guides/auth
- **Google OAuth**: https://developers.google.com/identity/protocols/oauth2

---

**Status**: ✅ Implementation Complete - Ready for Configuration & Testing

Next Step: Follow the **Configuration Steps** above to complete setup.
