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




const profilePage = (userData) => {
    // Create New Post Page
    var pageData = {
        inner: `
    <div class="info">
        <div class="left">
            <img id="userPP" src="../app/imgs/pp/pp_admin.png" alt="">
        </div>
        <div class="right">
            <section class="top">
                <h3 id="username">${userData.username}</h3>
                <button id="editProfileBtn">Edit</button>
            </section>
            <section class="center">
                <a href="#posts" class="posts"><span class="data" id="postCount">5</span> posts</a>
                <a href="#" class="followers"><span class="data" id="followerCount">84</span> followers</a>
                <a href="#" class="following"><span class="data" id="followingCount">71</span> following</a>
            </section>
            <section class="bottom desc description" id="description">${userData.description}</section>
        </div>
    </div>
    <h1>Posts</h1>
    <div id="posts">
        <img src="imgs/post.png" alt="The user hasn't posted anything...">
        The user hasn't posted anything...
    </div>
        `,
        class: "profile",
    }

    createPage(pageData)
}


export { profilePage }