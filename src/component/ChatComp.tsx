import { useEffect, useState } from 'react';
import { Analytics } from 'firebase/analytics';
import { FirebaseApp } from 'firebase/app';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';

interface Message {
    content: string;
    sentByUser: boolean;
}

export default function ChatComponent({ fbApp, fbA }: { fbApp: FirebaseApp; fbA: Analytics }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [fileList, setFileList] = useState<any>([]);
    const [selectedFileId, setSelectedFileId] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            const db = getFirestore(fbApp);
            const itemsCollection = collection(db, 'files'); // Replace 'your-collection-name' with your actual collection name
            const itemsSnapshot = await getDocs(itemsCollection);
            const itemsList = itemsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setFileList(itemsList);
        };

        fetchItems();
    }, []);

    const handleMessageSend = async () => {
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

            setMessages((prev) => {
                return [...prev, { content: responseMessage, sentByUser: false }];
            });
        } catch (error) {
            console.log('something went wrong');
        }
    };

    return (
        <div className="chat-container">
            <div>
                <h1>List Of files</h1>
                {fileList.length > 0 && (
                    <ul>
                        {fileList.map((data: any, index: any) => (
                            <li
                                style={{ cursor: 'pointer' }}
                                key={index}
                                onClick={() => setSelectedFileId(data.sourceId)}
                            >
                                {data.fileName}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="messages-container">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={message.sentByUser ? 'sent-message' : 'received-message'}
                    >
                        {message.content}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleMessageSend}>Send</button>
            </div>
        </div>
    );
}
