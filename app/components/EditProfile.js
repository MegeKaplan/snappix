// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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




const editProfilePage = (userData) => {
    // Create New Post Page
    var pageData = {
        inner: `
        <ul>
            <li>
                <span><img src="./imgs/pp/pp_admin.png" alt="${userData.username}"></span>
                <span><input type="file"></span>
            </li>
            <li>
                <span>Username</span>
                <span><input type="text" value="${userData.username}"></span>
            </li>
            <li>
                <span>Email</span>
                <span><input type="text" value="${userData.email}"></span>
            </li>
            <li>
                <span>Password</span>
                <span><input type="password" value="${userData.password}"></span>
            </li>
            <li>
                <span>Password Check</span>
                <span><input type="password" value="${userData.password}"></span>
            </li>
            <li>
                <span>Description</span>
                <span><input type="text" value="${userData.description}"></span>
            </li>
            <li>
                <button id="saveChangesBtn">Save Changes</button>
            </li>
        </ul>
        `,
        class: "editProfile",
    }


    createPage(pageData)
}


export { editProfilePage }