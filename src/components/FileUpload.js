import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, Image, FileText } from 'lucide-react';
import './FileUpload.css';

const FileUpload = ({ onFilesUploaded }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFilesUploaded(acceptedFiles);
    }
  }, [onFilesUploaded]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    multiple: true,
    maxSize: 100 * 1024 * 1024, // 100MB
  });

  const getDropzoneClass = () => {
    let className = 'dropzone';
    if (isDragActive && !isDragReject) className += ' drag-active';
    if (isDragReject) className += ' drag-reject';
    return className;
  };

  return (
    <div className="file-upload">
      <div {...getRootProps()} className={getDropzoneClass()}>
        <input {...getInputProps()} />
        
        <div className="dropzone-content">
          <div className="upload-icon">
            <Upload size={48} />
          </div>
          
          <div className="upload-text">
            {isDragActive ? (
              isDragReject ? (
                <p className="error-text">Some files are not supported</p>
              ) : (
                <p className="success-text">Drop your files here!</p>
              )
            ) : (
              <>
                <h3>Drag & drop files here</h3>
                <p>or click to browse</p>
              </>
            )}
          </div>
          
          <div className="supported-formats">
            <div className="format-item">
              <Image size={20} />
              <span>Images</span>
            </div>
            <div className="format-item">
              <FileText size={20} />
              <span>Documents</span>
            </div>
            <div className="format-item">
              <File size={20} />
              <span>All Files</span>
            </div>
          </div>
          
          <p className="size-limit">Maximum file size: 100MB</p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
