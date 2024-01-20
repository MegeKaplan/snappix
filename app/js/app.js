// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Import Components
import { profilePage } from "../components/Profile.js";
import { searchPage } from "../components/Search.js";
import { newPostPage } from "../components/NewPost.js";
import { discoverPage } from "../components/Discover.js";
import { messagesPage } from "../components/Messages.js";
import { homePage } from "../components/Home.js";
import { menuPage } from "../components/Menu.js";
import { addNav } from "../components/Nav.js";

// Import Local Modules
// ...

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
        // newPostPage()


        const profileBtn=document.querySelector("#profileBtn")
        profileBtn.onclick = () => {
          profilePage(userData)
        }

        const homeBtn=document.querySelector("#homeBtn")
        homeBtn.onclick = () => {
          homePage()
        }

        const searchBtn=document.querySelector("#searchBtn")
        searchBtn.onclick = () => {
          searchPage()
        }

        const newPostBtn=document.querySelector("#newPostBtn")
        newPostBtn.onclick = () => {
          newPostPage()
        }

        const discoverBtn=document.querySelector("#discoverBtn")
        discoverBtn.onclick = () => {
          discoverPage()
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
