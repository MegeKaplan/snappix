// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc, collection, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Import Local Modules and Components
import { createPage } from "../js/createPage.js";
import { homePage } from "../components/Home.js";

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


const newPostPage = (userData) => {
    // Create New Post Page
    var pageData = {
        inner: `
        <ul>
            <li>
                <span><img id="pageImgEl" src="./imgs/bg_auth.jpg" alt=""></span>
                <span>Add Photo<input id="postImage" type="file"></span>
            </li>
            <li>
                <span>Post Title</span>
                <span><input id="postTitle" type="text" value=""></span>
            </li>
            <li>
                <span>Post Content</span>
                <span><textarea id="postContent" name="" cols="30" rows="10"></textarea></span>
            </li>
            <li>
                <span>Hashtag</span>
                <span><input id="postHashtag" type="text" value="# Disabled" disabled></span>
            </li>
            <li>
                <button id="sendPostBtn">Share This Post</button>
            </li>
        </ul>
        `,
        class: "newPost",
    }

    

    // Define send post function
    const sendPost = async() => {
        // Set Firestore
        // Add a new post with a generated id
        const newPostRef = doc(collection(db, "posts"));
        // New Post
        var newPost = {
            imageURL: null,
            title: document.querySelector("#postTitle").value,
            content: document.querySelector("#postContent").value,
            id: newPostRef.id,
            sender: userData.id,
            likes: [],
            shares: [],
            saves: [],
            comments: [],
            hashtag: "",
            tags: [],
            date: Date.now(),
            isDeleted: false,
            isStory: false,
        }

        // Get user's posts
        // var posts = await getDoc(doc(db, "users", userData.id))
        var posts = userData.posts.push(newPost.id)

        // Add user's posts/
        await updateDoc(doc(db, "users", userData.id), {posts: userData.posts});



        // Upload Image
        // Select post image
        const postImage = document.querySelector("#postImage").files[0];
        const postImageRef = ref(storage, `posts/${userData.id}/${newPost.id}/image`);

        if(postImage!=undefined){
            // Upload new profile picture to storage
            await uploadBytes(postImageRef, postImage).then((snapshot) => {
                console.log('Uploaded the image!', postImage);
            });

            // Get imageURL of newPost
            const imageUrlRef = ref(storage, `posts/${userData.id}/${newPost.id}/image`);

            await getDownloadURL(imageUrlRef)
            .then((imageUrl) => {
                // Log
                console.log("IMAGE_URL: ", imageUrl);
                newPost.imageURL = imageUrl
            })
            .catch((error) => {
                // Handle any errors
                console.log(error);
            });
            
            // Add post to posts/
            await setDoc(newPostRef, newPost);
        }else{
            console.log("No file chosen.");
            await setDoc(newPostRef, newPost);
        }
    }

    // Send Post
    setTimeout(() => {
        const sendPostBtn = document.querySelector("#sendPostBtn")
        sendPostBtn.onclick = async() => {
            // Post Validation
            var postValid = confirm(`Are you sure you want to share the post?`)
            // const postValid = true
            if(postValid){
                await sendPost()
                await homePage()
            }else{console.log("post sending cancelled!");}
        }
    }, 500);
    



    createPage(pageData)
}


export { newPostPage }