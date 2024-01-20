// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Import Local Modules and Components
import { createPage } from "../js/createPage.js";

// Firebase Config
import { firebaseConfig } from "../db/config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Create a root reference
const storage = getStorage();


const newPostPage = () => {
    // Create New Post Page
    var pageData = {
        inner: `
        <ul>
            <li>
                <span><img src="./imgs/bg_auth.jpg" alt=""></span>
                <span>Add Photo<input type="file"></span>
            </li>
            <li>
                <span>Post Title</span>
                <span><input type="text" value=""></span>
            </li>
            <li>
                <span>Post Content</span>
                <span><textarea name="" id="" cols="30" rows="10"></textarea></span>
            </li>
            <li>
                <span>Hashtag</span>
                <span><input type="text" value="# Disabled" disabled></span>
            </li>
            <li>
                <button id="sendPostBtn">Send This Post</button>
            </li>
        </ul>
        `,
        class: "newPost",
    }




    createPage(pageData)
}


export { newPostPage }