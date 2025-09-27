import React, { useState } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
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

  return (
    <div className="app">
      <Header />
      <main className="main-content">
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
      </main>
    </div>
  );
}

export default App;
