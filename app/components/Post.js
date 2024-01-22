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

    // Create Edit Post Page
    var pageData = {
        inner: `
        <div class="post" post_id="${postData.id}">
            <div class="top">
                <div class="left">
                    <img src="${senderData.profilePictureURL}" alt="" class="pp">
                    <a href="#" class="sender">Sender</a>
                </div>
                <div class="right">
                    <i class="fa-solid fa-bars" post_id="postID"></i>
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

    // Set post image
    setTimeout(() => {
        var post = document.querySelector("#postImg")
        post.style.backgroundImage = `url(${postData.imageURL})`
    }, 1500);

    console.log(postData);



    createPage(pageData)
}


export { postPage }