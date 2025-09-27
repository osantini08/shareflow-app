# ShareFlow - Modern File Sharing Service

A beautiful, modern React frontend for a file sharing service similar to Pastebin/Dropbox but with a unique design.

## Features

- 🎨 **Modern Design**: Beautiful gradient UI with glassmorphism effects
- 📁 **File Upload**: Drag & drop file upload with support for multiple files
- 🖼️ **File Type Detection**: Automatic detection and display of file types with appropriate icons
- 👁️ **Image Preview**: Built-in image preview functionality
- 📱 **Responsive**: Works perfectly on desktop and mobile devices
- 🎯 **File Management**: Download, copy links, and delete files
- 🚀 **Performance**: Fast and lightweight React application

## Supported File Types

- **Images**: PNG, JPG, JPEG, GIF, WebP, SVG
- **Documents**: PDF, DOC, DOCX, TXT
- **Videos**: MP4, AVI, MOV, WebM
- **Audio**: MP3, WAV, AAC
- **Archives**: ZIP, RAR
- **And more!**

## Prerequisites

Before running this application, make sure you have:

1. **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
2. **npm** (comes with Node.js)

## Installation

1. **Clone or download** this project to your computer

2. **Open terminal/command prompt** in the project directory

3. **Install dependencies**:
   ```bash
   npm install
   ```

## Running the Application

1. **Start the development server**:
   ```bash
   npm start
   ```

2. **Open your browser** and go to `http://localhost:3000`

3. **Upload files** by either:
   - Dragging and dropping files onto the upload area
   - Clicking the upload area to browse files

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

## Project Structure

```
shareflow-app/
├── public/
│   └── index.html          # Main HTML template
├── src/
│   ├── components/         # React components
│   │   ├── Header.js       # Top navigation
│   │   ├── FileUpload.js   # Drag & drop upload
│   │   ├── FileList.js     # File grid container
│   │   └── FileCard.js     # Individual file display
│   ├── styles/            # CSS stylesheets
│   │   ├── index.css      # Global styles
│   │   └── App.css        # Main app styles
│   ├── App.js             # Main application component
│   └── index.js           # React entry point
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## Technologies Used

- **React 18** - Modern React with hooks
- **React Dropzone** - Drag & drop file upload
- **Lucide React** - Beautiful icon set
- **CSS3** - Modern styling with gradients and glassmorphism
- **HTML5** - Semantic markup

## Browser Support

- Chrome 70+
- Firefox 63+
- Safari 12+
- Edge 79+

## Future Enhancements

Potential features that could be added:
- File sharing with unique links
- File organization with folders
- User authentication
- Cloud storage integration
- File compression
- Bulk file operations
- File search and filtering

## Troubleshooting

### Common Issues

1. **Files not uploading**: Check file size (max 100MB) and browser compatibility
2. **Styling issues**: Clear browser cache and refresh
3. **Performance issues**: Try uploading fewer files at once

### Getting Help

If you encounter any issues:
1. Check the browser console for error messages
2. Ensure Node.js and npm are properly installed
3. Try clearing browser cache and refreshing

## License

This project is open source and available under the MIT License.
