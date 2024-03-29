import FileUpload from "./component/fileUpload";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import ChatComponent from "./component/ChatComp";
import "./App.scss";
import ChatUI from "./component/ChatUI";
import { getFirestore } from 'firebase/firestore';

function App() {
    const firebaseConfig = {
        apiKey: "AIzaSyAOEx3MV_orlQ83hUGF2wmpr-FklwZsiwA",
        authDomain: "chatpdf-11.firebaseapp.com",
        projectId: "chatpdf-11",
        storageBucket: "chatpdf-11.appspot.com",
        messagingSenderId: "713680529851",
        appId: "1:713680529851:web:a07cc4d25c3d8664463c9e",
        measurementId: "G-KGQW2R263J"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const db = getFirestore(app);

    return (
        < >
            {/* <div >
                <div >
                    <FileUpload fbApp={app} fbA={analytics} />
                </div>
                <div >
                    <ChatComponent fbApp={app} fbA={analytics} />
                </div>
            </div> */}
            <ChatUI db={db} />
        </>
    );
}

export default App;
