// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Import Local Modules and Components
import { createPage } from "../js/createPage.js";
import { followUser } from "../js/followUser.js";
import { profilePage } from "./Profile.js";

// Firebase Config
import { firebaseConfig } from "../db/config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);




const searchPage = async(userData) => {
    // Create New Post Page
    var pageData = {
        inner: `
        <div class="searchBar">
            <input id="searchInput" type="text" placeholder="Search something...">
            <i class="fa-solid fa-magnifying-glass" id="searchBtn"></i>
        </div>
        <div class="searchFilters">
            <button id="filterUsers" class="active">Users</button>
            <button id="filterPosts">Posts</button>
            <button id="filterHashtags">Hashtags</button>
        </div>
        <ul id="searchResults">
            
        </ul>
        `,
        class: "search",
    }



    // User Search
    // Get Users
    const allUsers = await getDocs(collection(db, "users"));

    
    // Add event listener to input
    setTimeout(() => {
        // Select Search Results Container
        const searchResultsContainer = document.querySelector("#searchResults")
        var searchInput = document.querySelector("#searchInput")
        searchInput.addEventListener("input", function(e){
            searchResultsContainer.innerHTML = ""
            var searchQuery = searchInput.value
            allUsers.forEach(user => {
                // Am I Following?
                var amIFollowing = false
                var followBtnClass = ""
                var followBtnInner = "Follow"
                userData.following.forEach(followedUserID => {
                    if(user.id == followedUserID){
                        amIFollowing = true
                        followBtnClass = "active"
                        followBtnInner = "Followed"
                    }
                });

                // Get User Data
                var user = user.data()
                if(user.username.toLowerCase().includes(searchQuery.toLowerCase())){
                    var userResultEl = document.createElement("li")
                    userResultEl.innerHTML = `
                    <section class="left">
                        <div class="pp userResultLink" user_id="${user.id}">
                            <img src="${user.profilePictureURL}" alt="${user.username}" user_id="${user.id}">
                        </div>
                        <h4 user_id="${user.id}" class="userResultLink">${user.username}</h4>
                    </section>
                    <section class="right">
                        <button class="followBtn ${followBtnClass}" user_id="${user.id}">${followBtnInner}</button>
                    </section>
                    `
                    userResultEl.classList.add("userResult")

                    if(userData.id!=user.id){
                        searchResultsContainer.appendChild(userResultEl)
                    }
                }
                var followBtns = document.querySelectorAll(".followBtn")
                followBtns.forEach(followBtn => {
                    followBtn.addEventListener("click", (e) => {
                        followUser(userData, e.target.getAttribute("user_id"))
                        profilePage(userData, e.target.getAttribute("user_id"))
                    })
                });
            });
        })
    }, 500);


    createPage(pageData)
}


export { searchPage }
