import React, { useState, useEffect } from 'react';
import { FileText, Archive, Trash2, Download, Eye, Calendar, Clock } from 'lucide-react';
import './SavedDocuments.css';

const SavedDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [archivedDocuments, setArchivedDocuments] = useState([]);
  const [activeTab, setActiveTab] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');

  // Load documents from localStorage on component mount
  useEffect(() => {
    const savedDocs = localStorage.getItem('shareflow-documents');
    if (savedDocs) {
      const docs = JSON.parse(savedDocs);
      setDocuments(docs);
      
      // Check for documents that should be archived (older than 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const activeDocs = [];
      const archivedDocs = [];
      
      docs.forEach(doc => {
        const lastModified = new Date(doc.lastModified);
        if (lastModified < thirtyDaysAgo) {
          archivedDocs.push(doc);
        } else {
          activeDocs.push(doc);
        }
      });
      
      setDocuments(activeDocs);
      setArchivedDocuments(archivedDocs);
    }
  }, []);

  const deleteDocument = (docId, isArchived = false) => {
    if (isArchived) {
      setArchivedDocuments(prev => prev.filter(doc => doc.id !== docId));
    } else {
      setDocuments(prev => prev.filter(doc => doc.id !== docId));
    }
    
    // Update localStorage
    const allDocs = [...documents.filter(doc => doc.id !== docId), ...archivedDocuments.filter(doc => doc.id !== docId)];
    localStorage.setItem('shareflow-documents', JSON.stringify(allDocs));
  };

  const restoreDocument = (docId) => {
    const docToRestore = archivedDocuments.find(doc => doc.id === docId);
    if (docToRestore) {
      setArchivedDocuments(prev => prev.filter(doc => doc.id !== docId));
      setDocuments(prev => [docToRestore, ...prev]);
      
      // Update localStorage
      const allDocs = [...documents, docToRestore, ...archivedDocuments.filter(doc => doc.id !== docId)];
      localStorage.setItem('shareflow-documents', JSON.stringify(allDocs));
    }
  };

  const downloadDocument = (doc) => {
    const element = document.createElement('a');
    const file = new Blob([doc.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${doc.title}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const previewDocument = (doc) => {
    // Create a modal or new window for preview
    const previewWindow = window.open('', '_blank', 'width=800,height=600');
    previewWindow.document.write(`
      <html>
        <head>
          <title>${doc.title} - Preview</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
            h1 { color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px; }
            .meta { color: #666; font-size: 0.9em; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <h1>${doc.title}</h1>
          <div class="meta">
            Created: ${new Date(doc.createdAt).toLocaleString()}<br>
            Last Modified: ${new Date(doc.lastModified).toLocaleString()}
          </div>
          <div>${doc.content}</div>
        </body>
      </html>
    `);
  };

  const getFilteredDocuments = (docs) => {
    return docs.filter(doc =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysSinceModified = (date) => {
    const now = new Date();
    const modified = new Date(date);
    const diffTime = Math.abs(now - modified);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const activeDocs = getFilteredDocuments(documents);
  const archivedDocs = getFilteredDocuments(archivedDocuments);

  return (
    <div className="saved-documents">
      <div className="documents-header">
        <h1 className="page-title">Saved Documents</h1>
        <p className="page-subtitle">Manage your documents and view archived items</p>
      </div>

      <div className="documents-controls">
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search documents..."
            className="search-input"
          />
        </div>
        
        <div className="tabs">
          <button
            onClick={() => setActiveTab('active')}
            className={`tab ${activeTab === 'active' ? 'active' : ''}`}
          >
            <FileText size={16} />
            Active Documents ({activeDocs.length})
          </button>
          <button
            onClick={() => setActiveTab('archived')}
            className={`tab ${activeTab === 'archived' ? 'active' : ''}`}
          >
            <Archive size={16} />
            Archived ({archivedDocs.length})
          </button>
        </div>
      </div>

      <div className="documents-content">
        {activeTab === 'active' ? (
          <div className="documents-section">
            {activeDocs.length > 0 ? (
              <div className="documents-grid">
                {activeDocs.map((doc) => (
                  <div key={doc.id} className="document-card">
                    <div className="document-header">
                      <h3 className="document-title">{doc.title}</h3>
                      <div className="document-status">
                        <span className="status-badge active">Active</span>
                      </div>
                    </div>
                    
                    <div className="document-meta">
                      <div className="meta-item">
                        <Calendar size={14} />
                        <span>Created: {formatDate(doc.createdAt)}</span>
                      </div>
                      <div className="meta-item">
                        <Clock size={14} />
                        <span>Modified: {formatDate(doc.lastModified)}</span>
                      </div>
                      <div className="meta-item">
                        <span>Days since modified: {getDaysSinceModified(doc.lastModified)}</span>
                      </div>
                    </div>
                    
                    <div className="document-preview">
                      {doc.content.substring(0, 150)}...
                    </div>
                    
                    <div className="document-actions">
                      <button
                        onClick={() => previewDocument(doc)}
                        className="action-button preview-button"
                        title="Preview document"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => downloadDocument(doc)}
                        className="action-button download-button"
                        title="Download document"
                      >
                        <Download size={16} />
                      </button>
                      <button
                        onClick={() => deleteDocument(doc.id)}
                        className="action-button delete-button"
                        title="Delete document"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <FileText size={48} className="empty-icon" />
                <p>No active documents found.</p>
                {searchTerm && <p>Try adjusting your search terms.</p>}
              </div>
            )}
          </div>
        ) : (
          <div className="documents-section">
            {archivedDocs.length > 0 ? (
              <div className="documents-grid">
                {archivedDocs.map((doc) => (
                  <div key={doc.id} className="document-card archived">
                    <div className="document-header">
                      <h3 className="document-title">{doc.title}</h3>
                      <div className="document-status">
                        <span className="status-badge archived">Archived</span>
                      </div>
                    </div>
                    
                    <div className="document-meta">
                      <div className="meta-item">
                        <Calendar size={14} />
                        <span>Created: {formatDate(doc.createdAt)}</span>
                      </div>
                      <div className="meta-item">
                        <Clock size={14} />
                        <span>Modified: {formatDate(doc.lastModified)}</span>
                      </div>
                      <div className="meta-item">
                        <span>Days since modified: {getDaysSinceModified(doc.lastModified)}</span>
                      </div>
                    </div>
                    
                    <div className="document-preview">
                      {doc.content.substring(0, 150)}...
                    </div>
                    
                    <div className="document-actions">
                      <button
                        onClick={() => previewDocument(doc)}
                        className="action-button preview-button"
                        title="Preview document"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => downloadDocument(doc)}
                        className="action-button download-button"
                        title="Download document"
                      >
                        <Download size={16} />
                      </button>
                      <button
                        onClick={() => restoreDocument(doc.id)}
                        className="action-button restore-button"
                        title="Restore document"
                      >
                        Restore
                      </button>
                      <button
                        onClick={() => deleteDocument(doc.id, true)}
                        className="action-button delete-button"
                        title="Delete permanently"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <Archive size={48} className="empty-icon" />
                <p>No archived documents found.</p>
                {searchTerm && <p>Try adjusting your search terms.</p>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedDocuments;
