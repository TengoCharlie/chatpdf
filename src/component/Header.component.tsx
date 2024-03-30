import React, { useState } from 'react';

const HeaderComponent = ({
    selectedFileUrl,
    handleFileUpload,
    uploading,
    uploadMessage,
    uploadedFiles,
    errorMessage,
}: {
    selectedFileUrl: any;
    handleFileUpload: any;
    uploading: any;
    uploadMessage: any;
    uploadedFiles: any;
    errorMessage: any;
}) => {
    return (
        <div className="header">
            <div className="file-upload-container">
                <label htmlFor="file-upload" className="file-upload-label">
                    <span>Choose files</span>
                    <input
                        type="file"
                        id="file-upload"
                        onChange={handleFileUpload}
                        multiple
                        disabled={uploading}
                        style={{ display: 'none' }}
                    />
                </label>
                {uploading && <p className="upload-message">{uploadMessage}</p>}
                {uploadedFiles && uploadedFiles.length ? (
                    <div>
                        <p>Uploaded {uploadedFiles.length} files:</p>
                        <ul className="uploaded-files-list">
                            {uploadedFiles.map((fileName: any, index: any) => (
                                <li key={index}>{fileName}</li>
                            ))}
                        </ul>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                ) : null}
            </div>
            <div className="user-settings">
                {selectedFileUrl && (
                    <a href={selectedFileUrl} target="_blank" rel="noreferrer noopener">
                        Open File in New Tab
                    </a>
                )}
            </div>
        </div>
    );
};

export default HeaderComponent;
