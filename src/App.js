import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import UrlShortener from './components/UrlShortener';
import DocumentEditor from './components/DocumentEditor';
import SavedDocuments from './components/SavedDocuments';
import './styles/App.css';

function App() {
  const [files, setFiles] = useState([]);

  const handleFilesUploaded = (newFiles) => {
    const filesWithMetadata = newFiles.map(file => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date(),
      url: URL.createObjectURL(file)
    }));
    
    setFiles(prevFiles => [...prevFiles, ...filesWithMetadata]);
  };

  const handleDeleteFile = (fileId) => {
    setFiles(prevFiles => {
      const fileToDelete = prevFiles.find(f => f.id === fileId);
      if (fileToDelete && fileToDelete.url) {
        URL.revokeObjectURL(fileToDelete.url);
      }
      return prevFiles.filter(f => f.id !== fileId);
    });
  };

  const HomePage = () => (
    <div className="container">
      <div className="upload-section">
        <h1 className="hero-title">Share Files Effortlessly</h1>
        <p className="hero-subtitle">
          Upload, organize, and share your files securely with ShareFlow
        </p>
        <FileUpload onFilesUploaded={handleFilesUploaded} />
      </div>
      
      {files.length > 0 && (
        <div className="files-section">
          <h2 className="section-title">Your Files</h2>
          <FileList files={files} onDeleteFile={handleDeleteFile} />
        </div>
      )}
      
      {files.length === 0 && (
        <div className="empty-state">
          <p>No files uploaded yet. Start by uploading your first file!</p>
        </div>
      )}
    </div>
  );

  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/url-shortener" element={<UrlShortener />} />
            <Route path="/document-editor" element={<DocumentEditor />} />
            <Route path="/saved-documents" element={<SavedDocuments />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
