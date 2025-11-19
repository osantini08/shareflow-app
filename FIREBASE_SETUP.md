# Firebase Setup Guide for Share Space

## 🔥 Firebase Configuration

Follow these steps to set up Google Authentication for your Share Space app:

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter your project name (e.g., "share-space")
4. Follow the setup wizard (you can disable Google Analytics if you don't need it)
5. Click "Create Project"

### Step 2: Register Your Web App

1. In your Firebase project dashboard, click the **Web icon** (`</>`) to add a web app
2. Register your app with a nickname (e.g., "Share Space Web")
3. **Don't check** "Also set up Firebase Hosting" (unless you want to use it)
4. Click "Register app"
5. You'll see your Firebase configuration object - **keep this page open**

### Step 3: Enable Google Authentication

1. In the Firebase Console, click **"Authentication"** in the left sidebar
2. Click **"Get Started"** if this is your first time
3. Go to the **"Sign-in method"** tab
4. Click on **"Google"** in the providers list
5. Toggle the **"Enable"** switch
6. Select a **Project support email** (your email)
7. Click **"Save"**

### Step 4: Configure Your App

1. Open the file `src/firebase/config.js` in your project
2. Replace the placeholder values with your Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

3. You can find these values in:
   - Firebase Console → Project Settings → General → Your apps → Web app → SDK setup and configuration

### Step 5: Add Authorized Domains (for Production)

1. In Firebase Console → Authentication → Settings → Authorized domains
2. Add your production domain (e.g., `yourdomain.com`)
3. `localhost` is already authorized by default for development

### Step 6: Test Your Setup

1. Start your development server:
   ```bash
   npm start
   ```

2. Your app should now redirect you to the login page at `http://localhost:3000/login`

3. Click "Continue with Google" and sign in with your Google account

4. If successful, you'll be redirected to the main app!

## 🎨 Features Implemented

✅ **Login Page** - Beautiful, modern login interface with "Share Space" branding
✅ **Google Authentication** - One-click sign-in with Google
✅ **Protected Routes** - All routes require authentication
✅ **User Profile** - Display user name and avatar in header
✅ **Logout Functionality** - Easy logout with dropdown menu
✅ **Responsive Design** - Works great on mobile and desktop

## 🔒 Security Notes

- Never commit your `firebase/config.js` file with real credentials to a public repository
- Consider using environment variables for production:
  ```javascript
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    // ... etc
  };
  ```

## 🚀 Next Steps

1. Set up Firebase Storage for file uploads (optional)
2. Add Firestore for saving user data and documents (optional)
3. Customize the login page styling to match your brand
4. Add more authentication providers (GitHub, Microsoft, etc.)

## 📝 Troubleshooting

**Issue**: "Firebase: Error (auth/configuration-not-found)"
- **Solution**: Make sure you've replaced the placeholder values in `firebase/config.js`

**Issue**: "Firebase: Error (auth/unauthorized-domain)"
- **Solution**: Add your domain to Authorized domains in Firebase Console

**Issue**: Login popup doesn't appear
- **Solution**: Check if popup blockers are enabled in your browser

**Issue**: App keeps redirecting to login
- **Solution**: Clear your browser cache and cookies, then try again

## 📧 Support

If you encounter any issues, check the [Firebase Documentation](https://firebase.google.com/docs/auth/web/google-signin) or create an issue in your repository.

---

**Happy Coding! 🚀**

