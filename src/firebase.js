import firebase from "firebase/compat/app"
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDboG-OT3IEEBVDktiyGPT_CuLkWRarmTc",
    authDomain: "linkedin-clone-9f014.firebaseapp.com",
    projectId: "linkedin-clone-9f014",
    storageBucket: "linkedin-clone-9f014.appspot.com",
    messagingSenderId: "993595498447",
    appId: "1:993595498447:web:08985f28ca0398d8c2bcba",
    measurementId: "G-YFVN9TJJRH"
};


const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const auth=firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();
const storage=firebase.storage();

export {auth,provider,storage};
export default db;