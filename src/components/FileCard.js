import React, { useState } from 'react';
import { 
  File, 
  Image, 
  FileText, 
  Video, 
  Music, 
  Archive, 
  Download, 
  Trash2, 
  Eye,
  Copy,
  Check
} from 'lucide-react';
import './FileCard.css';

const FileCard = ({ file, onDelete }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return <Image size={24} />;
    if (type.startsWith('video/')) return <Video size={24} />;
    if (type.startsWith('audio/')) return <Music size={24} />;
    if (type.includes('pdf') || type.includes('document') || type.includes('text')) return <FileText size={24} />;
    if (type.includes('zip') || type.includes('rar') || type.includes('archive')) return <Archive size={24} />;
    return <File size={24} />;
  };

  const getFileType = (type, name) => {
    if (type.startsWith('image/')) return 'Image';
    if (type.startsWith('video/')) return 'Video';
    if (type.startsWith('audio/')) return 'Audio';
    if (type.includes('pdf')) return 'PDF Document';
    if (type.includes('document') || name.includes('.doc')) return 'Word Document';
    if (type.includes('text')) return 'Text File';
    if (type.includes('zip') || type.includes('rar')) return 'Archive';
    return 'File';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(file.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const canPreview = file.type.startsWith('image/');

  return (
    <>
      <div className="file-card">
        <div className="file-header">
          <div className="file-icon">
            {getFileIcon(file.type)}
          </div>
          <div className="file-actions">
            {canPreview && (
              <button 
                className="action-btn preview-btn"
                onClick={() => setShowPreview(true)}
                title="Preview"
              >
                <Eye size={16} />
              </button>
            )}
            <button 
              className="action-btn copy-btn"
              onClick={handleCopyLink}
              title="Copy link"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
            <button 
              className="action-btn download-btn"
              onClick={handleDownload}
              title="Download"
            >
              <Download size={16} />
            </button>
            <button 
              className="action-btn delete-btn"
              onClick={onDelete}
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className="file-content">
          {canPreview && (
            <div className="file-thumbnail">
              <img src={file.url} alt={file.name} />
            </div>
          )}
          
          <div className="file-info">
            <h3 className="file-name" title={file.name}>
              {file.name}
            </h3>
            <div className="file-meta">
              <span className="file-type">{getFileType(file.type, file.name)}</span>
              <span className="file-size">{formatFileSize(file.size)}</span>
            </div>
            <div className="file-date">
              Uploaded {formatDate(file.uploadedAt)}
            </div>
          </div>
        </div>
      </div>

      {showPreview && canPreview && (
        <div className="preview-modal" onClick={() => setShowPreview(false)}>
          <div className="preview-content" onClick={e => e.stopPropagation()}>
            <button 
              className="preview-close"
              onClick={() => setShowPreview(false)}
            >
              ×
            </button>
            <img src={file.url} alt={file.name} />
            <div className="preview-info">
              <h3>{file.name}</h3>
              <p>{formatFileSize(file.size)}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FileCard;
