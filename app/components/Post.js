// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Import Local Modules and Components
import { createPage } from "../js/createPage.js";
import { profilePage } from "./Profile.js";
import { editPostPage } from "./EditPost.js";
import { commentPost, likePost, savePost } from "../js/postOperations.js";

// Firebase Config
import { firebaseConfig } from "../db/config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);



const postPage = async(userData, postID) => {
    // Get Post Data
    var postSnap = await getDoc(doc(db, "posts", postID))
    var postData = postSnap.data()

    // Get the sender data
    var senderSnap = await getDoc(doc(db, "users", postData.sender))
    var senderData = senderSnap.data()

    // Send date
    const date = new Date(postData.date)
    var sendDate = date.toLocaleDateString("tr")


    // Fill post options container
    var myPostOptions = `
    <li post_id="${postData.id}" class="editPostBtn">Edit Post</li>
    <li post_id="${postData.id}" class="reportPostBtn">Report Post</li>
    `
    var userPostOptions = `
    <li post_id="${postData.id}" class="reportPost">Report Post</li>
    `
    var postOptionsInner = userPostOptions

    // Is that my post?
    userData.posts.forEach(postID => {
        if(postID==postData.id){
            postOptionsInner = myPostOptions
        }
    });

    // setTimeout(() => {
    //     var postOptionsContainers = document.querySelectorAll(".postOptions")
    //     array.forEach(element => {

    //     });
    // }, 500);

    // Create Edit Post Page
    var pageData = {
        inner: `
        <div class="post" post_id="${postData.id}">
            <div class="top">
                <div class="left">
                    <img user_id="${senderData.id}" src="${senderData.profilePictureURL}" alt="" class="pp userLink">
                    <a user_id="${senderData.id}" href="#" class="sender userLink">${senderData.username}</a>
                </div>
                <div class="right">
                    <i class="fa-solid fa-bars" class="postOptionsBtn">
                        <ul class="postOptions">
                            ${postOptionsInner}
                        </ul>
                    </i>
                </div>
            </div>
            <div class="imgContainer" id="postImg"></div>
            <div class="bottom">
                <div class="row icons">
                    <div class="icon">
                        <i class="fa-solid fa-heart likeBtn" post_id="${postData.id}"></i>
                        <span class="likeCount">${Object.keys(postData.likes).length}</span>
                    </div>
                    <div class="icon">
                        <i class="fa-solid fa-comment commentBtn" post_id="${postData.id}"></i>
                        <span class="commentCount">${Object.keys(postData.comments).length}</span>
                    </div>
                    <div class="icon">
                        <i class="fa-solid fa-bookmark saveBtn" post_id="${postData.id}"></i>
                        <span class="saveCount">${Object.keys(postData.saves).length}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="text">
                        <h3 class="title">${postData.title}</h3>
                        <p class="content">${postData.content}</p>
                        <span class="sendDate">${sendDate}</span>
                    </div>
                </div>
            </div>
        </div>
        `,
        class: "post",
    }
    
    // Go to edit post page from post options
    setTimeout(() => {
        const editPostBtns=document.querySelectorAll(".editPostBtn")
        editPostBtns.forEach(editPostBtn => {
            editPostBtn.addEventListener("click", (e) => {
                editPostPage(userData, e.target.getAttribute("post_id"))
            })
        })
    }, 500);


    // Go to user's profile
    setTimeout(() => {
        var userLinks = document.querySelectorAll(".userLink")
        userLinks.forEach(userLink => {
            userLink.addEventListener("click", (e) => {
                profilePage(userData, e.target.getAttribute("user_id"))
            })
        });
    }, 500);

    // Set post image
    setTimeout(() => {
        var post = document.querySelector("#postImg")
        post.style.backgroundImage = `url(${postData.imageURL})`
    }, 1500);

    // console.log(postData);




    // Post Operations
    setTimeout(() => {
        // Like Post
        const likeBtns=document.querySelectorAll(".likeBtn")
        likeBtns.forEach(likeBtn => {
            likeBtn.addEventListener("click", (e) => {
                var targetPostID = e.target.getAttribute("post_id")
                likePost(userData, targetPostID)
                
                // Get classes of like btn
                

                // Render
                var oldLikeCount = e.target.nextSibling.nextSibling.innerText
                e.target.nextSibling.nextSibling.innerText = Number(oldLikeCount)+1

            })
        })
    }, 500);

    // Post Operations
    setTimeout(() => {
        // Like Post
        const commentBtns=document.querySelectorAll(".commentBtn")
        commentBtns.forEach(commentBtn => {
            commentBtn.addEventListener("click", (e) => {
                var targetPostID = e.target.getAttribute("post_id")
                commentPost(userData, targetPostID)
            })
        })
    }, 500);
    
    // Post Operations
    setTimeout(() => {
        // Like Post
        const saveBtns=document.querySelectorAll(".saveBtn")
        saveBtns.forEach(saveBtn => {
            saveBtn.addEventListener("click", (e) => {
                var targetPostID = e.target.getAttribute("post_id")
                savePost(userData, targetPostID)
            })
        })
    }, 500);



    createPage(pageData)
}


export { postPage }