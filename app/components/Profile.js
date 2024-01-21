// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc, getDoc, getDocs, query, where, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Import Local Modules and Components
import { createPage } from "../js/createPage.js";
import { editProfilePage } from "./EditProfile.js";
import { editPostPage } from "./EditPost.js";

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
        
        // Define add post to container function
        const addPostToContainer = (postData) => {
            // Select postsContainer
            setTimeout(() => {
                const postsContainer = document.querySelector("#posts")

                // Create new post element
                var newPostEl = document.createElement("div")

                // Add 3 dot for long text
                var title3dot = [false, 15, ""]
                var content3dot = [false, 90, ""]
                if(postData.title.length > title3dot[1]){
                    title3dot[0] = true
                    title3dot[2] = "..."
                }
                if(postData.title.length > content3dot[1]){
                    content3dot[0] = true
                    content3dot[2] = "..."
                }

                // Set the innerHTML of new post
                if(postData.imageURL==null){
                    newPostEl.innerHTML = `
                    <h4 post_id="${postData.id}">${postData.title.slice(0, title3dot[1]) + title3dot[2]}</h4>
                    <p post_id="${postData.id}">${postData.content.slice(0, content3dot[1]) + content3dot[2]}</p>
                    `
                }else{
                    newPostEl.innerHTML = `
                    <div class="imgContainer" post_id="${postData.id}">
                        <img src="${postData.imageURL}" post_id="${postData.id}">
                    </div>
                    `
                }

                // Add class to new post element
                newPostEl.classList.add("post")
                newPostEl.setAttribute("post_id", postData.id)

                // Add new post to posts container
                postsContainer.appendChild(newPostEl)
            }, 500);
        }


        // Get all post IDs
        var postIDs = userData.posts

        // Clear posts container if user has any post
        if(Object.keys(postIDs).length!=0){
            setTimeout(() => {
                const postsContainer = document.querySelector("#posts")
                // Clear posts container
                postsContainer.innerHTML = ""
            }, 500);
        }
        

        const allPosts = await getDocs(collection(db, "posts"));
        allPosts.forEach((post) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());

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

    // Get clicked post
    try {
        setTimeout(() => {
            var posts = document.querySelectorAll(".post")
            posts.forEach(post => {
                post.addEventListener("click", (e) => {
                    editPostPage(e.target.getAttribute("post_id"))
                })
            });
        }, 1500);
    } catch{}

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