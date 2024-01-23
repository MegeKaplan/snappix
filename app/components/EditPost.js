// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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



const editPostPage = async(userData, postID) => {
    // Get post data
    var docSnap = await getDoc(doc(db, "posts", postID))
    var postData = docSnap.data()

    // Create Edit Post Page
    var pageData = {
        inner: `
        <ul>
            <li>
                <span><img id="pageImgEl" src="${postData.imageURL}" alt="${postData.title}"></span>
            </li>
            <li>
                <span>Post Title</span>
                <span><input id="postTitle" type="text" value="${postData.title}"></span>
            </li>
            <li>
                <span>Post Content</span>
                <span><textarea id="postContent" name="" cols="30" rows="10">${postData.content}</textarea></span>
            </li>
            <li>
                <span>Hashtag</span>
                <span><input id="postHashtag" type="text" value="# Disabled" disabled></span>
            </li>
            <li>
                <button id="deletePostBtn" class="danger">Delete This Post</button>
                <button id="saveChangesBtn">Save Changes</button>
            </li>
        </ul>
        `,
        class: "editPost",
    }


    // Save Changes and Delete Post
    setTimeout(() => {
        // Save Changes
        document.querySelector("#saveChangesBtn").onclick = () => {
            // Set the changed post data
            var updatedPostData = {
                title: document.querySelector("#postTitle").value,
                content: document.querySelector("#postContent").value,
            }

            // Update Post to Firebase
            console.log(updatedPostData);
            updateDoc(doc(db, "posts", postData.id), updatedPostData);
            alert("Post Edited Successfully!")
        }

        document.querySelector("#deletePostBtn").onclick = () => {
            // Set the changed post data
            var updatedPostData = {
                isDeleted: true,
            }

            // Update Post to Firebase
            console.log(updatedPostData);


            // Delete Confirmation
            var deleteConfirmation = confirm(`This post will be lost forever! Are you sure you want to delete?`)
            if(deleteConfirmation){
                updateDoc(doc(db, "posts", postData.id), updatedPostData);
                alert("Post Deleted Successfully!")
            }else{
                alert("Deletion canceled...")
            }
        }
    }, 500);

    console.log(postID);



    createPage(pageData)
}


export { editPostPage }