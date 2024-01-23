// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Import Local Modules and Components
import { createPage } from "../js/createPage.js";
import { createPosts } from "../js/feed.js";

// Firebase Config
import { firebaseConfig } from "../db/config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);




const discoverPage = (userData) => {
    // Create New Post Page
    var pageData = {
        inner: `
        <div class="feed" id="feed">
            
        </div>
        `,
        class: "discover",
    }


    createPosts(userData, 1)

    



    createPage(pageData)
}


export { discoverPage }