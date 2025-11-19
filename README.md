# Share Space - Modern File Sharing Platform

A beautiful, modern React application for file sharing, URL shortening, and document editing with Google Authentication.

## ✨ Features

- 🔐 **Google Authentication**: Secure login with Google OAuth
- 🎨 **Modern Design**: Beautiful gradient UI with glassmorphism effects
- 📁 **File Upload**: Drag & drop file upload with support for multiple files
- 🔗 **URL Shortener**: Create short links for easy sharing
- 📝 **Document Editor**: Create and edit documents online
- 💾 **Saved Documents**: Access your documents anytime
- 🖼️ **File Type Detection**: Automatic detection and display of file types with appropriate icons
- 👁️ **Image Preview**: Built-in image preview functionality
- 📱 **Responsive**: Works perfectly on desktop and mobile devices
- 🎯 **File Management**: Download, copy links, and delete files
- 🚀 **Performance**: Fast and lightweight React application
- 🔒 **Protected Routes**: All features require authentication

## Supported File Types

- **Images**: PNG, JPG, JPEG, GIF, WebP, SVG
- **Documents**: PDF, DOC, DOCX, TXT
- **Videos**: MP4, AVI, MOV, WebM
- **Audio**: MP3, WAV, AAC
- **Archives**: ZIP, RAR
- **And more!**

## 📋 Prerequisites

Before running this application, make sure you have:

1. **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
2. **npm** (comes with Node.js)
3. **Google Account** (for authentication)
4. **Firebase Project** (free tier is sufficient)

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd shareflow-app

# Install dependencies
npm install
```

### 2. Set Up Authentication

**Follow the quick setup guide:** [QUICK_START.md](./QUICK_START.md)

Or manually:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Google Authentication
3. Copy `.env.example` to `.env.local`
4. Add your Firebase credentials to `.env.local`

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your Firebase config
```

**For detailed instructions, see [AUTH_SETUP.md](./AUTH_SETUP.md)**

### 3. Run the Application

```bash
npm start
```

Open `http://localhost:3000` in your browser. You'll be redirected to the login page.

## 🔐 Authentication Setup

This app uses Firebase Google Authentication. You need to:

1. **Create a Firebase project** (one-time setup)
2. **Enable Google sign-in** in Firebase Console
3. **Configure environment variables** in `.env.local`

📖 **Detailed Guide**: See [AUTH_SETUP.md](./AUTH_SETUP.md) for step-by-step instructions

⚡ **Quick Guide**: See [QUICK_START.md](./QUICK_START.md) for 5-minute setup

🚀 **Deployment**: See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) before going live

## How to Use

### Uploading Files
1. Drag files onto the upload area or click to browse
2. Multiple files can be uploaded at once
3. Maximum file size: 100MB per file

### Managing Files
- **Preview**: Click the eye icon to preview images
- **Download**: Click the download icon to save files
- **Copy Link**: Click the copy icon to copy the file URL
- **Delete**: Click the trash icon to remove files

### File Information
Each file card displays:
- File name and type
- File size
- Upload timestamp
- File type badge with appropriate icon

## 📂 Project Structure

```
shareflow-app/
├── public/
│   └── index.html              # Main HTML template
├── src/
│   ├── components/             # React components
│   │   ├── Header.js           # Top navigation with user menu
│   │   ├── Login.js            # Login page with Google auth
│   │   ├── PrivateRoute.js     # Protected route wrapper
│   │   ├── FileUpload.js       # Drag & drop upload
│   │   ├── FileList.js         # File grid container
│   │   ├── FileCard.js         # Individual file display
│   │   ├── UrlShortener.js     # URL shortening tool
│   │   ├── DocumentEditor.js   # Document creation/editing
│   │   └── SavedDocuments.js   # Saved documents view
│   ├── context/
│   │   └── AuthContext.js      # Authentication state management
│   ├── firebase/
│   │   └── config.js           # Firebase configuration
│   ├── styles/                 # CSS stylesheets
│   │   ├── index.css           # Global styles
│   │   └── App.css             # Main app styles
│   ├── App.js                  # Main application with routing
│   └── index.js                # React entry point
├── .env.example                # Environment variables template
├── .env.local                  # Your Firebase config (DO NOT COMMIT)
├── .gitignore                  # Git ignore file
├── package.json                # Dependencies and scripts
├── README.md                   # This file
├── AUTH_SETUP.md               # Detailed authentication setup guide
├── QUICK_START.md              # Quick 5-minute setup guide
└── DEPLOYMENT_CHECKLIST.md     # Pre-deployment checklist
```

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **Firebase Authentication** - Google OAuth integration
- **React Router DOM** - Client-side routing
- **React Context API** - Global state management
- **React Dropzone** - Drag & drop file upload
- **Lucide React** - Beautiful icon set
- **CSS3** - Modern styling with gradients and glassmorphism
- **HTML5** - Semantic markup

## Browser Support

- Chrome 70+
- Firefox 63+
- Safari 12+
- Edge 79+

## 📚 Documentation

- **[AUTH_SETUP.md](./AUTH_SETUP.md)** - Complete authentication setup guide
- **[QUICK_START.md](./QUICK_START.md)** - Get started in 5 minutes
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Pre-deployment checklist
- **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** - Firebase-specific configuration

## 🔒 Security

- ✅ All routes are protected by authentication
- ✅ Environment variables keep credentials secure
- ✅ Firebase handles secure Google OAuth flow
- ⚠️ Never commit `.env.local` to version control
- ✅ `.gitignore` is configured to exclude sensitive files

## 🌐 Deployment

Ready to deploy? Follow these steps:

1. ✅ Complete the [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
2. 🔥 Set environment variables in your hosting platform
3. 🌍 Add production domain to Firebase Authorized domains
4. 🚀 Deploy!

### Supported Platforms
- **Vercel** (Recommended)
- **Netlify**
- **Firebase Hosting**
- Any platform supporting React apps

## 🎯 Future Enhancements

Potential features that could be added:
- ☁️ Cloud storage integration (Firebase Storage)
- 💾 Save uploaded files to user account
- 🗂️ File organization with folders
- 🔗 Shareable links with expiration
- 📊 File analytics and stats
- 👥 Share files with other users
- 🔍 File search and filtering
- 📧 Email notifications
- 🎨 Custom themes

## 🐛 Troubleshooting

### Authentication Issues

**Problem**: Can't sign in with Google
- **Solution**: Check [AUTH_SETUP.md](./AUTH_SETUP.md) troubleshooting section

**Problem**: Environment variables not working
- **Solution**: Restart development server after changing `.env.local`

### Common Issues

1. **Files not uploading**: Check file size (max 100MB) and browser compatibility
2. **Styling issues**: Clear browser cache and refresh
3. **Performance issues**: Try uploading fewer files at once
4. **Redirect loops**: Clear browser cookies and cache

### Getting Help

If you encounter any issues:
1. 📖 Check the documentation files in this repository
2. 🔍 Check the browser console for error messages
3. 🔥 Review Firebase Console for authentication logs
4. 💻 Ensure Node.js and npm are properly installed

## License

This project is open source and available under the MIT License.
