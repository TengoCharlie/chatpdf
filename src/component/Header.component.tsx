import React from 'react';

const HeaderComponent = ({
    handleFileUpload,
    uploading,
    uploadMessage,
    uploadedFiles,
    errorMessage,
}: {
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
            {/* <div className="user-settings">
                <div className="dark-light">
                    <svg
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                    </svg>
                </div>
                <div className="settings">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                    </svg>
                </div>
                <img
                    className="user-profile"
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png"
                    alt="account-profile"
                />
            </div> */}
        </div>
    );
};

export default HeaderComponent;
