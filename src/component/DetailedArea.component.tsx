import React from 'react';

const DetailAreaComponent = ({
    selectedFileUrl,
    selectedFileName,
    selectedFileId,
}: {
    selectedFileUrl: any;
    selectedFileName: any;
    selectedFileId: any;
}) => {
    return (
        selectedFileUrl && (
            <div className="detail-area">
                <div className="detail-area-header">
                    <div className="detail-title">{selectedFileName}</div>
                    <div className="detail-subtitle">{selectedFileId}</div>
                </div>
                <iframe src={selectedFileUrl} style={{ width: '100%', height: '100%' }}></iframe>
            </div>
        )
    );
};

export default DetailAreaComponent;
