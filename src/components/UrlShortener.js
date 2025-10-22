import React, { useState } from 'react';
import { Link, Copy, ExternalLink, Trash2 } from 'lucide-react';
import './UrlShortener.css';

const UrlShortener = () => {
  const [url, setUrl] = useState('');
  const [shortenedUrls, setShortenedUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateShortUrl = () => {
    if (!url.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const shortCode = Math.random().toString(36).substring(2, 8);
      const shortUrl = `https://shareflow.app/${shortCode}`;
      
      const newUrl = {
        id: Date.now(),
        originalUrl: url,
        shortUrl: shortUrl,
        createdAt: new Date(),
        clicks: 0
      };
      
      setShortenedUrls(prev => [newUrl, ...prev]);
      setUrl('');
      setIsLoading(false);
    }, 1000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const deleteUrl = (id) => {
    setShortenedUrls(prev => prev.filter(url => url.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      generateShortUrl();
    }
  };

  return (
    <div className="url-shortener">
      <div className="url-shortener-header">
        <h1 className="page-title">URL Shortener</h1>
        <p className="page-subtitle">Create short, shareable links for any URL</p>
      </div>

      <div className="url-input-section">
        <div className="url-input-container">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a URL to shorten..."
            className="url-input"
          />
          <button
            onClick={generateShortUrl}
            disabled={!url.trim() || isLoading}
            className="shorten-button"
          >
            {isLoading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </div>
      </div>

      {shortenedUrls.length > 0 && (
        <div className="shortened-urls-section">
          <h2 className="section-title">Your Shortened URLs</h2>
          <div className="urls-list">
            {shortenedUrls.map((urlItem) => (
              <div key={urlItem.id} className="url-card">
                <div className="url-info">
                  <div className="original-url">
                    <ExternalLink size={16} />
                    <span className="url-text">{urlItem.originalUrl}</span>
                  </div>
                  <div className="short-url">
                    <Link size={16} />
                    <span className="url-text">{urlItem.shortUrl}</span>
                  </div>
                  <div className="url-meta">
                    <span className="created-at">
                      Created: {urlItem.createdAt.toLocaleDateString()}
                    </span>
                    <span className="clicks">
                      Clicks: {urlItem.clicks}
                    </span>
                  </div>
                </div>
                <div className="url-actions">
                  <button
                    onClick={() => copyToClipboard(urlItem.shortUrl)}
                    className="action-button copy-button"
                    title="Copy short URL"
                  >
                    <Copy size={16} />
                  </button>
                  <button
                    onClick={() => copyToClipboard(urlItem.originalUrl)}
                    className="action-button copy-button"
                    title="Copy original URL"
                  >
                    <ExternalLink size={16} />
                  </button>
                  <button
                    onClick={() => deleteUrl(urlItem.id)}
                    className="action-button delete-button"
                    title="Delete URL"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {shortenedUrls.length === 0 && (
        <div className="empty-state">
          <Link size={48} className="empty-icon" />
          <p>No shortened URLs yet. Create your first short link!</p>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;
