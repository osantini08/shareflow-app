# 📋 Deployment Checklist - Share Space

Use this checklist before deploying your app to production.

## Pre-Deployment Checklist

### 🔒 Security

- [ ] Verify `.env.local` is in `.gitignore`
- [ ] Never committed Firebase credentials to Git
- [ ] All sensitive data uses environment variables
- [ ] Reviewed all console.log statements (remove sensitive data)
- [ ] Firebase Security Rules configured (if using Firestore/Storage)

### 🔥 Firebase Configuration

- [ ] Created production Firebase project (separate from dev if needed)
- [ ] Google Authentication enabled in Firebase Console
- [ ] Added production domain to Authorized domains:
  - Firebase Console → Authentication → Settings → Authorized domains
- [ ] Set up Firebase project for production environment
- [ ] Verified API keys and credentials for production

### 🌐 Environment Variables

- [ ] Added all required environment variables to hosting platform:
  - `REACT_APP_FIREBASE_API_KEY`
  - `REACT_APP_FIREBASE_AUTH_DOMAIN`
  - `REACT_APP_FIREBASE_PROJECT_ID`
  - `REACT_APP_FIREBASE_STORAGE_BUCKET`
  - `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
  - `REACT_APP_FIREBASE_APP_ID`

### 🛠️ Build & Test

- [ ] Run `npm run build` successfully
- [ ] No build errors or warnings
- [ ] Test production build locally:
  ```bash
  npm install -g serve
  serve -s build
  ```
- [ ] Test authentication flow in production build
- [ ] Test logout functionality
- [ ] Verify protected routes work correctly

### 📱 Cross-Browser Testing

- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Tested in Edge
- [ ] Tested on mobile devices (iOS/Android)
- [ ] Google sign-in popup works in all browsers

### 🎨 UI/UX Check

- [ ] Login page displays correctly
- [ ] Header shows user profile after login
- [ ] Logout dropdown menu works
- [ ] Responsive design works on mobile
- [ ] All navigation links work
- [ ] No console errors in browser

## Platform-Specific Deployment

### For Vercel

- [ ] Connected GitHub repository
- [ ] Set environment variables in Vercel dashboard
- [ ] Configured build settings (default React settings)
- [ ] Added production domain to Firebase Authorized domains
- [ ] Deployed and tested

### For Netlify

- [ ] Connected GitHub repository
- [ ] Set environment variables in Netlify dashboard
- [ ] Build command: `npm run build`
- [ ] Publish directory: `build`
- [ ] Added production domain to Firebase Authorized domains
- [ ] Deployed and tested

### For Firebase Hosting

- [ ] Installed Firebase CLI: `npm install -g firebase-tools`
- [ ] Logged in: `firebase login`
- [ ] Initialized: `firebase init hosting`
- [ ] Built app: `npm run build`
- [ ] Deployed: `firebase deploy`
- [ ] Tested live site

## Post-Deployment Checklist

### ✅ Verification

- [ ] Visit production URL
- [ ] Verify redirect to login page when not authenticated
- [ ] Test Google sign-in flow
- [ ] Verify user profile appears in header
- [ ] Test all navigation routes
- [ ] Test logout functionality
- [ ] Verify protected routes are actually protected
- [ ] Check mobile responsiveness

### 📊 Monitoring

- [ ] Check Firebase Console for authentication events
- [ ] Monitor error logs in hosting platform
- [ ] Check browser console for errors
- [ ] Test with different Google accounts
- [ ] Verify no 404 errors on page refresh

### 🔍 Security Audit

- [ ] Confirmed no API keys visible in browser source
- [ ] Environment variables not exposed in client bundle
- [ ] HTTPS enabled (required for production)
- [ ] Check Firebase Console for any security alerts

## Common Deployment Issues

| Issue | Solution |
|-------|----------|
| 404 on page refresh | Add redirect rules (see platform docs) |
| Env variables not working | Restart build after adding variables |
| Google auth fails | Check Authorized domains in Firebase |
| Build errors | Clear cache: `rm -rf node_modules package-lock.json && npm install` |

## Rollback Plan

If deployment fails:

1. Keep previous version running
2. Check error logs
3. Fix issues in development
4. Test locally before redeploying
5. Use platform's rollback feature if needed

## Documentation for Team

- [ ] Updated README with production URL
- [ ] Documented environment variables needed
- [ ] Shared Firebase project access with team
- [ ] Created deployment runbook
- [ ] Documented any platform-specific configurations

---

## 🎉 Ready to Deploy!

Once all items are checked:

```bash
# Build the app
npm run build

# Deploy (platform-specific command)
# Vercel: vercel --prod
# Netlify: netlify deploy --prod
# Firebase: firebase deploy
```

---

**Good luck with your deployment! 🚀**

