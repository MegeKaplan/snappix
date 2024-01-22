// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
                var user = user.data()
                if(user.username.toLowerCase().includes(searchQuery.toLowerCase())){
                    var userResultEl = document.createElement("li")
                    userResultEl.innerHTML = `
                    <section class="left">
                        <div class="pp userSuggestionLink" user_id="${user.id}">
                            <img src="${user.profilePictureURL}" alt="${user.username}" user_id="${user.id}">
                        </div>
                        <h4 user_id="${user.id}" class="userSuggestionLink">${user.username}</h4>
                    </section>
                    <section class="right">
                        <button class="followBtn" user_id="${user.id}">Follow</button>
                    </section>
                    `
                    userResultEl.classList.add("userResult")

                    var amIFollowing = false
                    userData.following.forEach(followedUserID => {
                        if(user.id == followedUserID){
                            amIFollowing = true
                        }
                    });
                    if(userData.id!=user.id & !amIFollowing){
                        searchResultsContainer.appendChild(userResultEl)
                    }
                }
            });
        })   
    }, 500);


    createPage(pageData)
}


export { searchPage }
