// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc, getDoc, getDocs, query, where, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Import Local Modules and Components
import { createPage } from "../js/createPage.js";
import { editProfilePage } from "./EditProfile.js";

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
            <img id="userPP" src="${userData.profilePictureURL}" alt="">
        </div>
        <div class="right">
            <section class="top">
                <h3 id="username">${userData.username}</h3>
                <button id="editProfileBtn">Edit</button>
            </section>
            <section class="center">
                <a href="#posts" class="posts"><span class="data" id="postCount">${Object.keys(userData.posts).length}</span> posts</a>
                <a href="#" class="followers"><span class="data" id="followerCount">${Object.keys(userData.followers).length}</span> followers</a>
                <a href="#" class="following"><span class="data" id="followingCount">${Object.keys(userData.following).length}</span> following</a>
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


    
    // Show posts of user
    const showPosts = async() => {
        // Select postsContainer
        setTimeout(() => {
            const postsContainer = document.querySelector("#posts")
            console.log(postsContainer);
        }, 500);



        // Define add post to container function
        const addPostToContainer = (postData) => {
            console.log(postData);
        }

        

        const allPosts = await getDocs(collection(db, "posts"));
        allPosts.forEach((post) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());

            // Get all post IDs
            var postIDs = userData.posts

            // Filter user's posts
            postIDs.forEach(postID => {
                if(postID==post.id){
                    // console.log(postID);
                    // console.log(post.data());
                    addPostToContainer(post.data())
                }
            });
        });
        

    
    }

    
    showPosts()

    // Edit profile button clicked
    setTimeout(() => {
        const editProfileBtn = document.querySelector("#editProfileBtn")
        editProfileBtn.onclick = () => {
            editProfilePage(userData)
        }
    }, 500);


    createPage(pageData)
}


export { profilePage }