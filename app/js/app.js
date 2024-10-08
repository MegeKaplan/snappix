// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Import Components
import { profilePage } from "../components/Profile.js";
import { searchPage } from "../components/Search.js";
import { newPostPage } from "../components/NewPost.js";
import { discoverPage } from "../components/Discover.js";
import { messagesPage } from "../components/Messages.js";
import { homePage } from "../components/Home.js";
import { menuPage } from "../components/Menu.js";
import { addNav } from "../components/Nav.js";
import { postPage } from "../components/Post.js";
import { editPostPage } from "../components/EditPost.js";

// Import Local Modules
import { followUser } from "./followUser.js";

// Firebase Config
import { firebaseConfig } from "../db/config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);



// isAuthenticed Check
onAuthStateChanged(auth, async(user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // console.log(auth.currentUser.uid);
      
        // Get the user data
        var docSnap = await getDoc(doc(db, "users", auth.currentUser.uid))
        var userData = docSnap.data()
      
        // console.log(userData);
        
        // Add Nav
        addNav(userData)

        // Set Default Page
        // homePage()
        setTimeout(() => {
          discoverPage(userData)
        }, 500);


        const profileBtn=document.querySelector("#profileBtn")
        profileBtn.onclick = () => {
          profilePage(userData)
        }

        const homeBtn=document.querySelector("#homeBtn")
        homeBtn.onclick = () => {
          homePage(userData)
        }

        const searchBtn=document.querySelector("#searchBtn")
        searchBtn.onclick = () => {
          searchPage(userData)
        }

        const newPostBtn=document.querySelector("#newPostBtn")
        newPostBtn.onclick = () => {
          newPostPage(userData)
        }

        const discoverBtn=document.querySelector("#discoverBtn")
        discoverBtn.onclick = () => {
          discoverPage(userData)
        }

        const messagesBtns=document.querySelectorAll(".messagesBtn")
        messagesBtns.forEach(messagesBtn => {
          messagesBtn.onclick = () => {
            messagesPage()
          }
        });

        const menuBtns=document.querySelectorAll(".menuBtn")
        menuBtns.forEach(menuBtn => {
          menuBtn.onclick = () => {
            menuPage()
            // Sign out from app
            try{
                const signOutBtn = document.querySelector("#signOutBtn")
                signOutBtn.onclick = () => {
                    signOut(auth).then(() => {
                        // Sign-out successful.
                        console.log("Sign-out successful.")
                    }).catch((error) => {
                        // An error happened.
                        console.log("An error happened.")
                    });
                }
            }catch{}
          }
        });


        // Show Suggestions
        const makeSuggestions = async() => {
            const allUsers = await getDocs(collection(db, "users"));

            // Select suggestions container
            const suggestionsContainer = document.querySelector("#suggestions")

            // Clear suggestions container
            suggestionsContainer.innerHTML = ""

            allUsers.forEach(user => {
                var user = user.data()

                // Create new suggestion element
                var newSuggestionEl = document.createElement("li")
                newSuggestionEl.innerHTML = `
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
                newSuggestionEl.classList.add("suggestion")

                // Is there user in my following?
                var isThereUser = true

                if(user.id != userData.id){
                  userData.following.forEach(userID => {
                    if(user.id != userID){
                        isThereUser = false
                    }
                  });
                }

                // Add suggestion
                if(!isThereUser){
                  suggestionsContainer.appendChild(newSuggestionEl)
                }
            });
        }

        // Run Function
        makeSuggestions()

        // Add event listener to buttons for follow to user
        setTimeout(() => {
            var followBtns = document.querySelectorAll(".followBtn")
            followBtns.forEach(followBtn => {
                followBtn.addEventListener("click", (e) => {
                    followUser(userData, e.target.getAttribute("user_id"))
                    profilePage(userData, e.target.getAttribute("user_id"))

                })
            });
        }, 500);

        // Add event listener to buttons for go to profile of user
        setTimeout(() => {
            var userSuggestionLinkEls = document.querySelectorAll(".userSuggestionLink")
            userSuggestionLinkEls.forEach(userSuggestionLinkEl => {
                userSuggestionLinkEl.addEventListener("click", (e) => {
                    profilePage(userData, e.target.getAttribute("user_id"))
                })
            });
        }, 500);
        


        

      // ...
    } else {
        // User is signed out
        alert("Please Login or Register!")
        setTimeout(() => {
            window.location.href = "../index.html"
        }, 500);
        // ...
    }
});



// Sign out from app
// try{
//     const signOutBtn = document.querySelector("#signOutBtn")
//     signOutBtn.onclick = () => {
//         signOut(auth).then(() => {
//             // Sign-out successful.
//             console.log("Sign-out successful.")
//         }).catch((error) => {
//             // An error happened.
//             console.log("An error happened.")
//         });
//     }
// }catch{}
