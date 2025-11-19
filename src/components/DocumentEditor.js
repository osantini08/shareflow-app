import React, { useState, useEffect } from 'react';
import { Save, Download, FileText, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered } from 'lucide-react';
import './DocumentEditor.css';

const DocumentEditor = () => {
  const [documents, setDocuments] = useState([]);
  const [currentDoc, setCurrentDoc] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Load documents from localStorage on component mount
  useEffect(() => {
    const savedDocs = localStorage.getItem('shareflow-documents');
    if (savedDocs) {
      setDocuments(JSON.parse(savedDocs));
    }
  }, []);

  // Save documents to localStorage whenever documents change
  useEffect(() => {
    localStorage.setItem('shareflow-documents', JSON.stringify(documents));
  }, [documents]);

  const createNewDocument = () => {
    const newDoc = {
      id: Date.now(),
      title: 'Untitled Document',
      content: '',
      createdAt: new Date(),
      lastModified: new Date()
    };
    setDocuments(prev => [newDoc, ...prev]);
    setCurrentDoc(newDoc);
    setTitle(newDoc.title);
    setContent(newDoc.content);
    setIsEditing(true);
  };

  const openDocument = (doc) => {
    setCurrentDoc(doc);
    setTitle(doc.title);
    setContent(doc.content);
    setIsEditing(true);
  };

  const saveDocument = () => {
    if (!currentDoc) return;
    
    const updatedDoc = {
      ...currentDoc,
      title: title || 'Untitled Document',
      content,
      lastModified: new Date()
    };
    
    setDocuments(prev => prev.map(doc => 
      doc.id === currentDoc.id ? updatedDoc : doc
    ));
    setCurrentDoc(updatedDoc);
  };

  const deleteDocument = (docId) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId));
    if (currentDoc && currentDoc.id === docId) {
      setCurrentDoc(null);
      setTitle('');
      setContent('');
      setIsEditing(false);
    }
  };

  const downloadDocument = () => {
    if (!currentDoc) return;
    
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${title || 'document'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const formatText = (command) => {
    document.execCommand(command, false, null);
    document.getElementById('editor').focus();
  };

  const insertList = (ordered = false) => {
    const listType = ordered ? 'insertOrderedList' : 'insertUnorderedList';
    document.execCommand(listType, false, null);
    document.getElementById('editor').focus();
  };

  const closeEditor = () => {
    if (currentDoc && (title !== currentDoc.title || content !== currentDoc.content)) {
      if (window.confirm('You have unsaved changes. Do you want to save before closing?')) {
        saveDocument();
      }
    }
    setCurrentDoc(null);
    setTitle('');
    setContent('');
    setIsEditing(false);
  };

  return (
    <div className="document-editor">
      {!isEditing ? (
        <div className="documents-list-view">
          <div className="documents-header">
            <h1 className="page-title">Document Editor</h1>
            <p className="page-subtitle">Create and edit documents with rich text formatting</p>
            <button onClick={createNewDocument} className="new-document-button">
              <FileText size={20} />
              New Document
            </button>
          </div>

          {documents.length > 0 ? (
            <div className="documents-grid">
              {documents.map((doc) => (
                <div key={doc.id} className="document-card">
                  <div className="document-info">
                    <h3 className="document-title">{doc.title}</h3>
                    <p className="document-meta">
                      Created: {doc.createdAt.toLocaleDateString()}
                    </p>
                    <p className="document-meta">
                      Modified: {doc.lastModified.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="document-actions">
                    <button
                      onClick={() => openDocument(doc)}
                      className="action-button edit-button"
                      title="Edit document"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteDocument(doc.id)}
                      className="action-button delete-button"
                      title="Delete document"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <FileText size={48} className="empty-icon" />
              <p>No documents yet. Create your first document!</p>
            </div>
          )}
        </div>
      ) : (
        <div className="editor-view">
          <div className="editor-header">
            <div className="editor-title-section">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="document-title-input"
                placeholder="Document title..."
              />
            </div>
            <div className="editor-actions">
              <button onClick={saveDocument} className="action-button save-button">
                <Save size={16} />
                Save
              </button>
              <button onClick={downloadDocument} className="action-button download-button">
                <Download size={16} />
                Download
              </button>
              <button onClick={closeEditor} className="action-button close-button">
                Close
              </button>
            </div>
          </div>

          <div className="toolbar">
            <button onClick={() => formatText('bold')} className="toolbar-button" title="Bold">
              <Bold size={16} />
            </button>
            <button onClick={() => formatText('italic')} className="toolbar-button" title="Italic">
              <Italic size={16} />
            </button>
            <button onClick={() => formatText('underline')} className="toolbar-button" title="Underline">
              <Underline size={16} />
            </button>
            <div className="toolbar-separator"></div>
            <button onClick={() => formatText('justifyLeft')} className="toolbar-button" title="Align Left">
              <AlignLeft size={16} />
            </button>
            <button onClick={() => formatText('justifyCenter')} className="toolbar-button" title="Align Center">
              <AlignCenter size={16} />
            </button>
            <button onClick={() => formatText('justifyRight')} className="toolbar-button" title="Align Right">
              <AlignRight size={16} />
            </button>
            <div className="toolbar-separator"></div>
            <button onClick={() => insertList(false)} className="toolbar-button" title="Bullet List">
              <List size={16} />
            </button>
            <button onClick={() => insertList(true)} className="toolbar-button" title="Numbered List">
              <ListOrdered size={16} />
            </button>
          </div>

          <div className="editor-container">
            <div
              id="editor"
              contentEditable
              className="editor-content"
              onInput={(e) => setContent(e.target.innerHTML)}
              dangerouslySetInnerHTML={{ __html: content }}
              suppressContentEditableWarning={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentEditor;
