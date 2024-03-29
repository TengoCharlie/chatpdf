import { useState } from 'react';
import { Analytics } from "firebase/analytics";
import { FirebaseApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";

function FileUpload({ fbApp, fbA }: { fbApp: FirebaseApp; fbA: Analytics }) {
    const [uploading, setUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileUpload = async (event: any) => {
        const file = event.target.files[0];
        const fileName = file.name;

        // Query Firestore to check for duplicates
        const db = getFirestore(fbApp);
        const filesRef = collection(db, "files");
        const q = query(filesRef, where("fileName", "==", fileName));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            console.log("File with the same name already exists.");
            // Handle duplicate file name, e.g., notify the user or prevent the upload
            setErrorMessage('File with the same name already exists.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file, fileName);

        const options = {
            method: 'POST',
            body: formData,
            headers: {
                'x-api-key': "sec_SnszMTp0i4rLJXZF9otw70LxQdXQuT6e", // Replace with your API key
            },
        };

        try {
            setUploading(true);
            setUploadMessage('Uploading file...');
            setErrorMessage('');

            const response = await fetch('https://api.chatpdf.com/v1/sources/add-file', options);
            if (!response.ok) {
                throw new Error('Failed to upload file');
            }
            const data = await response.json();
            console.log('Source ID:', data.sourceId);

            await addDoc(collection(db, "files"), {
                fileName: fileName,
                sourceId: data.sourceId
            });

            setUploadMessage('File uploaded successfully');
        } catch (error: any) {
            console.error('Error:', error.message);
            setUploadMessage('Error uploading file');
            setErrorMessage('Error uploading file');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileUpload} disabled={uploading} />
            {uploading && <p>{uploadMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
}

export default FileUpload;
