// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Import Local Modules and Components
import { createPage } from "../js/createPage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDzapiK0GVV_tn4mOiP7AdQFgLyH_V-GrY",
    authDomain: "snappix-9b5f4.firebaseapp.com",
    databaseURL: "https://snappix-9b5f4-default-rtdb.firebaseio.com",
    projectId: "snappix-9b5f4",
    storageBucket: "snappix-9b5f4.appspot.com",
    messagingSenderId: "639424361399",
    appId: "1:639424361399:web:c819bc884fc5890542ee32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


// Create New Post Page
var pageData = {
    inner: `
    <h1>Hello Home Page</h1>
    `,
    class: "home",
}

const homePage = () => {
    createPage(pageData)
}


export { homePage }