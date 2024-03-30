import React, { useEffect, useState } from 'react';
import HeaderComponent from './Header.component';
import ConversationAreaComponent from './ConversationalArea.Component';
import ChatAreaComponent from './ChatArea.component';
import DetailAreaComponent from './DetailedArea.component';
import {
    Firestore,
    addDoc,
    collection,
    getDocs,
    getFirestore,
    query,
    where,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, FirebaseStorage } from 'firebase/storage';

export default function ChatUI({ db, storage }: { db: Firestore; storage: FirebaseStorage }) {
    // For List Fetch
    const [fileList, setFileList] = useState<any>([]);
    const [selectedFileId, setSelectedFileId] = useState('');

    // For File Upload
    const [uploading, setUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [uploadedFileName, setUploadedFileName] = useState<String[]>([]);

    // Fetch list of Files for DIsplay in side panel
    const fetchItems = async () => {
        const itemsCollection = collection(db, 'files'); // Replace 'your-collection-name' with your actual collection name
        const itemsSnapshot = await getDocs(itemsCollection);
        const itemsList = itemsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setFileList(() => {
            return itemsList;
        });
    };
    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        fetchItems();
    }, [uploading]);

    const handleFileUpload = async (event: any) => {
        let files = event.target.files;
        setUploadedFileName([]);
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const file = event.target.files[i];
                const fileName = file.name;

                // Check if file already exists in Firestore
                const filesRef = collection(db, 'files');
                const q = query(filesRef, where('fileName', '==', fileName));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    console.log('File with the same name already exists.');
                    setErrorMessage('File with the same name already exists.');
                    setUploadedFileName((prevData) => {
                        return [...prevData, fileName];
                    });
                } else {
                    // Upload file to Firebase Storage

                    const fileRef = ref(storage, fileName);

                    try {
                        setUploading(true);
                        setUploadMessage('Uploading file...');
                        setErrorMessage('');

                        await uploadBytes(fileRef, file);

                        // Get download URL of the uploaded file
                        const downloadURL = await getDownloadURL(fileRef);

                        // API Call - Upload file and get source ID
                        const formData = new FormData();
                        formData.append('file', file, fileName);

                        const options = {
                            method: 'POST',
                            body: formData,
                            headers: {
                                'x-api-key': 'sec_SnszMTp0i4rLJXZF9otw70LxQdXQuT6e', // Replace with your API key
                            },
                        };

                        const response = await fetch(
                            'https://api.chatpdf.com/v1/sources/add-file',
                            options
                        );
                        if (!response.ok) {
                            throw new Error('Failed to upload file to API');
                        }
                        const data = await response.json();
                        console.log('Source ID:', data.sourceId);

                        // Update Firestore with source ID
                        await addDoc(collection(db, 'files'), {
                            fileName: fileName,
                            sourceId: data.sourceId,
                            downloadURL: downloadURL,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        });

                        setUploadedFileName((prevData) => {
                            return [...prevData, fileName];
                        });

                        setUploadMessage('File uploaded successfully');
                    } catch (error: any) {
                        console.error('Error:', error.message);
                        setUploadMessage('Error uploading file');
                        setErrorMessage('Error uploading file');
                    } finally {
                        setUploading(false);
                    }
                }
            }
        }
    };

    return (
        <>
            <div className="app">
                <HeaderComponent
                    handleFileUpload={handleFileUpload}
                    uploading={uploading}
                    uploadMessage={uploadMessage}
                    uploadedFiles={uploadedFileName}
                    errorMessage={errorMessage}
                />

                <div className="wrapper">
                    <ConversationAreaComponent
                        fileList={fileList}
                        selectedFileId={selectedFileId}
                        setSelectedFileId={setSelectedFileId}
                    />

                    <ChatAreaComponent />
                    <DetailAreaComponent />
                </div>
            </div>
        </>
    );
}
