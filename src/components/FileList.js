import React from 'react';
import FileCard from './FileCard';
import './FileList.css';

const FileList = ({ files, onDeleteFile }) => {
  return (
    <div className="file-list">
      <div className="file-grid">
        {files.map(file => (
          <FileCard
            key={file.id}
            file={file}
            onDelete={() => onDeleteFile(file.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FileList;
