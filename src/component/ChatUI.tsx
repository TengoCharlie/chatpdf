import React, { useEffect, useState } from 'react'
import HeaderComponent from './Header.component'
import ConversationAreaComponent from './ConversationalArea.Component'
import ChatAreaComponent from './ChatArea.component'
import DetailAreaComponent from './DetailedArea.component'
import { Firestore, collection, getDocs, getFirestore } from 'firebase/firestore'

export default function ChatUI({ db }: { db: Firestore }) {
    const [fileList, setFileList] = useState<any>([]);
    const [selectedFileId, setSelectedFileId] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            const itemsCollection = collection(db, 'files'); // Replace 'your-collection-name' with your actual collection name
            const itemsSnapshot = await getDocs(itemsCollection);
            const itemsList = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFileList(() => {
                return itemsList
            });
        };

        fetchItems();
    }, [])

    return <>
        <div className="app">
            <HeaderComponent />
            <div className="wrapper">
                {fileList.length && <ConversationAreaComponent fileList={fileList} selectedFileId={selectedFileId} setSelectedFileId={setSelectedFileId} />}

                <ChatAreaComponent />
                <DetailAreaComponent />
            </div>
        </div></>
}
