# 🔐 Share Space - Authentication Setup Guide

This guide will help you set up Google Authentication for Share Space using Firebase.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Firebase Setup](#firebase-setup)
3. [Local Development Setup](#local-development-setup)
4. [Testing the Login](#testing-the-login)
5. [Deployment](#deployment)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, make sure you have:

- ✅ Node.js installed (v14 or higher)
- ✅ npm or yarn package manager
- ✅ A Google account
- ✅ Git installed

## Firebase Setup

### Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `share-space` (or your preferred name)
4. Click **Continue**
5. (Optional) Disable Google Analytics if not needed
6. Click **Create project**
7. Wait for the project to be created, then click **Continue**

### Step 2: Register Your Web App

1. In the Firebase Console, click the **web icon** `</>` (Add app)
2. Register app:
   - App nickname: `Share Space Web`
   - ☑️ Also set up Firebase Hosting (optional)
3. Click **Register app**
4. **Copy your Firebase configuration** - you'll need this in the next step
5. Click **Continue to console**

Your config will look like this:

```javascript
{
  apiKey: "AIzaSyXxXxXxXxXxXxXxXxXxXxXxXxXxXxX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
}
```

### Step 3: Enable Google Authentication

1. In the Firebase Console sidebar, click **"Authentication"**
2. Click **"Get started"** (if first time)
3. Click the **"Sign-in method"** tab
4. Find **"Google"** in the list of providers
5. Click on **Google**
6. Toggle the **Enable** switch to ON
7. Select a **Project support email** (your email address)
8. Click **Save**

### Step 4: Configure Authorized Domains

1. Still in **Authentication > Settings**
2. Click the **"Authorized domains"** tab
3. Verify `localhost` is listed (it should be by default)
4. For production, click **"Add domain"** and add your production domain (e.g., `yourdomain.com`)

---

## Local Development Setup

### Step 1: Install Dependencies

```bash
npm install
```

All required packages including Firebase are already in `package.json`.

### Step 2: Configure Environment Variables

1. **Copy the example environment file:**

```bash
# On Windows (PowerShell)
Copy-Item .env.example .env.local

# On Mac/Linux
cp .env.example .env.local
```

2. **Open `.env.local` and add your Firebase credentials:**

```env
REACT_APP_FIREBASE_API_KEY=AIzaSyXxXxXxXxXxXxXxXxXxXxXxXxXxXxX
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789012
REACT_APP_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
```

> ⚠️ **IMPORTANT**: Never commit `.env.local` to Git! It's already in `.gitignore`.

### Step 3: Start the Development Server

```bash
npm start
```

The app will open at `http://localhost:3000` and redirect you to the login page.

---

## Testing the Login

1. Navigate to `http://localhost:3000`
2. You should be automatically redirected to `/login`
3. Click **"Continue with Google"**
4. Sign in with your Google account
5. Grant permissions when prompted
6. You should be redirected back to the home page
7. Your profile picture and name should appear in the header
8. Click your profile to see the logout option

### Test Logout

1. Click on your profile picture/name in the header
2. Click **"Log Out"**
3. You should be redirected back to the login page

---

## Deployment

### Environment Variables for Production

When deploying to production (Vercel, Netlify, etc.), add these environment variables in your hosting platform's dashboard:

```
REACT_APP_FIREBASE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID
```

### Platform-Specific Instructions

#### Vercel

1. Go to your project settings
2. Navigate to **Environment Variables**
3. Add each variable (Name and Value)
4. Redeploy your application

#### Netlify

1. Go to **Site settings > Build & deploy > Environment**
2. Click **Edit variables**
3. Add each variable
4. Trigger a new deploy

#### Firebase Hosting

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Run: `firebase login`
3. Run: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

> **Note**: Environment variables for Firebase Hosting need to be set differently. Consider using Firebase Functions or environment configuration files.

---

## Troubleshooting

### Problem: "Firebase: Error (auth/configuration-not-found)"

**Solution**: 
- Make sure you created the `.env.local` file
- Verify all Firebase config values are correctly copied
- Restart the development server after changing `.env.local`

### Problem: "Firebase: Error (auth/unauthorized-domain)"

**Solution**:
- Go to Firebase Console > Authentication > Settings > Authorized domains
- Add your domain (e.g., `localhost` for development or `yourdomain.com` for production)

### Problem: Google sign-in popup doesn't appear

**Solution**:
- Check if popup blockers are enabled in your browser
- Try a different browser
- Check browser console for errors

### Problem: "Module not found: Can't resolve 'firebase'"

**Solution**:
- Run `npm install` to ensure all dependencies are installed
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

### Problem: Changes to `.env.local` not working

**Solution**:
- Stop the development server (Ctrl+C)
- Restart with `npm start`
- React requires a restart to pick up environment variable changes

### Problem: App redirects to login immediately after signing in

**Solution**:
- Clear browser cache and cookies
- Check browser console for authentication errors
- Verify Firebase config is correct

---

## 🔒 Security Best Practices

1. ✅ **Never commit `.env.local`** - It's in `.gitignore`
2. ✅ **Never commit Firebase credentials directly in code**
3. ✅ **Use environment variables** for all sensitive data
4. ✅ **Rotate your Firebase API keys** if accidentally exposed
5. ✅ **Enable Firebase Security Rules** for production
6. ✅ **Monitor Firebase Console** for suspicious activity

---

## 📂 Authentication File Structure

```
shareflow-app/
├── src/
│   ├── components/
│   │   ├── Login.js              # Login page component
│   │   ├── Login.css             # Login page styles
│   │   ├── PrivateRoute.js       # Protected route wrapper
│   │   └── Header.js             # Updated with user menu
│   ├── context/
│   │   └── AuthContext.js        # Authentication state management
│   ├── firebase/
│   │   └── config.js             # Firebase initialization
│   └── App.js                    # Updated with auth routing
├── .env.example                  # Template for environment variables
├── .env.local                    # Your actual credentials (DO NOT COMMIT)
└── .gitignore                    # Ensures .env.local is not committed
```

---

## 🎯 Features Included

✅ Google OAuth Authentication
✅ Protected Routes (authentication required)
✅ User Profile Display (name + avatar)
✅ Logout Functionality
✅ Persistent Login Sessions
✅ Responsive Design (mobile & desktop)
✅ Error Handling
✅ Loading States
✅ Beautiful Modern UI

---

## 📚 Additional Resources

- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [React Context API](https://react.dev/reference/react/useContext)
- [React Router Protected Routes](https://reactrouter.com/en/main)
- [Firebase Console](https://console.firebase.google.com/)

---

## 🆘 Need Help?

If you encounter issues not covered in this guide:

1. Check the [Firebase Documentation](https://firebase.google.com/docs)
2. Search [Stack Overflow](https://stackoverflow.com/questions/tagged/firebase)
3. Check browser console for error messages
4. Review Firebase Console for authentication logs

---

**Made with ❤️ for Share Space**

