// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Import Local Modules and Components
import { createPage } from "../js/createPage.js";
import { profilePage } from "./Profile.js";

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
    <li post_id="${postData.id}">Edit Post</li>
    <li post_id="${postData.id}" class="reportPost">Report Post</li>
    `
    var userPostOptions = `
    <li post_id="${postData.id}" class="reportPost">Report Post</li>
    `
    var postOptionsInner = userPostOptions

    // Is that my post?
    userData.posts.forEach(postID => {
        if(postID==postData.id){
            console.log("This is my post!");
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
                        <i class="fa-solid fa-heart"></i>
                        <span>${Object.keys(postData.likes).length}</span>
                    </div>
                    <div class="icon">
                        <i class="fa-solid fa-comment"></i>
                        <span>${Object.keys(postData.comments).length}</span>
                    </div>
                    <div class="icon">
                        <i class="fa-solid fa-bookmark"></i>
                        <span>${Object.keys(postData.saves).length}</span>
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



    createPage(pageData)
}


export { postPage }