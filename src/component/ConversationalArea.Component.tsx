import React from 'react';

const ConversationAreaComponent = ({
    fileList,
    selectedFileId,
    setSelectedFileId,
}: {
    fileList: any;
    selectedFileId: any;
    setSelectedFileId: any;
}) => {
    return (
        <div className="conversation-area">
            {fileList.map((data: any, index: any) => (
                <div
                    className={`msg ${selectedFileId === data.sourceId ? 'active' : ''}`}
                    key={index}
                    onClick={() => setSelectedFileId(data.sourceId)}
                >
                    <div className="msg-detail">
                        <div className="msg-username">{data.fileName}</div>
                        <div className="msg-content">
                            <span className="msg-message">{data.sourceId}</span>
                            {/* <span className="msg-date">28m</span> */}
                        </div>
                    </div>
                </div>
            ))}
            {/* Other messages go here */}
            <div className="overlay"></div>
        </div>
    );
};

export default ConversationAreaComponent;
