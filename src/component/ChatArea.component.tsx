import React, { useEffect, useRef, useState } from 'react';

interface Message {
    content: string;
    sentByUser: boolean;
    date?: string;
    time?: string;
}

const ChatAreaComponent = ({
    selectedFileUrl,
    selectedFileName,
    selectedFileId,
}: {
    selectedFileUrl: any;
    selectedFileName: any;
    selectedFileId: any;
}) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');

    const containerRef = useRef<any>(null);

    const handleMessageSend = async (e: any) => {
        e.preventDefault();

        if (newMessage.trim() === '') return; // Ignore empty messages

        // Add the new message to the messages array
        setMessages([...messages, { content: newMessage, sentByUser: true }]);

        // Clear the input box
        setNewMessage('');

        // Simulate API call and response (replace with actual API call)
        // For demo purpose, adding a delayed response

        const data = {
            sourceId: selectedFileId,
            messages: [
                {
                    role: 'user',
                    content: newMessage,
                },
            ],
        };

        const options = {
            method: 'POST',
            headers: {
                'x-api-key': 'sec_SnszMTp0i4rLJXZF9otw70LxQdXQuT6e',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        try {
            const response = await fetch('https://api.chatpdf.com/v1/chats/message', options);

            const data = await response.json();
            const responseMessage = data.content;

            setMessages((prev: any) => {
                return [...prev, { content: responseMessage, sentByUser: false }];
            });
        } catch (error) {
            console.log('something went wrong');
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [containerRef.current?.scrollHeight, messages.length]);

    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    };
    return (
        selectedFileId && (
            <div className="chat-area" ref={containerRef}>
                <div className="chat-area-header">
                    <div className="chat-area-title">{selectedFileName}</div>
                </div>
                <div className="chat-area-main">
                    {messages.length &&
                        messages.map((data, index) => (
                            <div
                                key={index}
                                className={`chat-msg ${data.sentByUser ? 'owner' : ''}`}
                            >
                                <div className="chat-msg-profile">
                                    {!data.sentByUser ? (
                                        <img
                                            className="chat-msg-img"
                                            src="https://firebasestorage.googleapis.com/v0/b/chatpdf-11.appspot.com/o/robot02_90810.png?alt=media&token=16ac4600-f9a8-45da-893d-84fe6d68de3e"
                                            alt=""
                                        />
                                    ) : (
                                        <img
                                            className="chat-msg-img"
                                            src="https://firebasestorage.googleapis.com/v0/b/chatpdf-11.appspot.com/o/lovepik-cute-girl-avatar-png-image_401231841_wh1200.png?alt=media&token=3ba9d5ce-8755-4d4b-a769-25231add9acd"
                                            alt=""
                                        />
                                    )}

                                    {/* <div className="chat-msg-date">
                                        {data.date}
                                        {''}
                                        {data.time}
                                    </div> */}
                                </div>
                                <div className="chat-msg-content">
                                    <div className="chat-msg-text">{data.content}</div>
                                </div>
                            </div>
                        ))}
                    {/* Other messages go here */}
                </div>

                <form className="chat-area-footer">
                    <input
                        type="text"
                        placeholder="Type something here..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button type="submit" onClick={handleMessageSend} className="detail-button">
                        Send
                    </button>
                </form>
            </div>
        )
    );
};

export default ChatAreaComponent;
