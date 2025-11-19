# ⚡ Quick Start Guide - Share Space Authentication

Get up and running with Google Authentication in 5 minutes!

## 🚀 Quick Setup (5 Steps)

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Create Firebase Project

- Go to [Firebase Console](https://console.firebase.google.com/)
- Click "Add project" → Name it → Create

### 3️⃣ Enable Google Auth

- Firebase Console → Authentication → Get Started
- Sign-in method tab → Google → Enable → Save

### 4️⃣ Get Your Config

- Firebase Console → Project Settings → Your apps → Web
- Copy the config values

### 5️⃣ Set Environment Variables

```bash
# Copy the template
cp .env.example .env.local

# Edit .env.local with your Firebase config
```

**Your `.env.local` should look like:**

```env
REACT_APP_FIREBASE_API_KEY=AIzaSyXxXxXx...
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abc123
```

## ▶️ Run the App

```bash
npm start
```

Visit `http://localhost:3000` → Click "Continue with Google" → Done! 🎉

---

## 📝 Important Notes

- ⚠️ **Never commit `.env.local`** to GitHub
- ✅ `.env.example` is safe to commit (no real credentials)
- 🔄 Restart dev server after changing `.env.local`
- 🌐 `localhost` is pre-authorized in Firebase

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| "configuration-not-found" error | Create `.env.local` and add your config |
| "unauthorized-domain" error | Add your domain in Firebase Console → Authentication → Authorized domains |
| Changes not working | Stop server (Ctrl+C) and restart with `npm start` |
| Popup doesn't appear | Disable popup blocker |

---

## 📖 Full Documentation

For detailed instructions, deployment guides, and advanced configuration, see [AUTH_SETUP.md](./AUTH_SETUP.md)

---

**Happy Coding! 🚀**

