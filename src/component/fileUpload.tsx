import { useState } from 'react';
import { Analytics } from 'firebase/analytics';
import { FirebaseApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    setDoc,
    query,
    where,
    getDocs,
    doc,
    addDoc,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function FileUpload({ fbApp, fbA }: { fbApp: FirebaseApp; fbA: Analytics }) {
    const [uploading, setUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [uploadedFileName, setUploadedFileName] = useState<String[]>([]);

    const handleFileUpload = async (event: any) => {
        let files = event.target.files;
        setUploadedFileName([]);
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const file = event.target.files[i];
                const fileName = file.name;

                // Check if file already exists in Firestore
                const db = getFirestore(fbApp);
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
                    const storage = getStorage(fbApp);
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
        <div>
            <input type="file" onChange={handleFileUpload} multiple disabled={uploading} />
            {uploading && <p>{uploadMessage}</p>}
            <p> Uploaded {uploadedFileName.length} files</p>
            {uploadedFileName.length > 0 && (
                <ul>
                    {uploadedFileName.map((fileName, index) => (
                        <li key={index}>{fileName}</li>
                    ))}
                </ul>
            )}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
}

export default FileUpload;
