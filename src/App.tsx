import FileUpload from "./component/fileUpload";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


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

    return (
        < >
           <FileUpload fbApp={app} fbA={analytics} />
        </>
    );
}

export default App;
