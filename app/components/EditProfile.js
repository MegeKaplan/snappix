// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, updateProfile, updateEmail, updatePassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

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

// Create a root reference
const storage = getStorage();



const editProfilePage = (userData) => {
    // Create Edit Profile Page
    var pageData = {
        inner: `
        <ul>
            <li>
                <span><img src="${userData.profilePictureURL}" alt="${userData.username}" value="${userData.profilePictureURL}"></span>
                <span><input type="file" id="newProfilePicture"></span>
            </li>
            <li>
                <span>Username</span>
                <span><input id="newUsername" type="text" value="${userData.username}"></span>
            </li>
            <li>
                <span>Email</span>
                <span><input id="newEmail" type="text" value="${userData.email}"></span>
            </li>
            <li>
                <span>Password</span>
                <span><input id="newPassword" type="password" value="${userData.password}"></span>
            </li>
            <li>
                <span>Password Check</span>
                <span><input id="newPasswordCheck" type="password" value="${userData.password}"></span>
            </li>
            <li>
                <span>Description</span>
                <span><input id="newDescription" type="text" value="${userData.description}"></span>
            </li>
            <li>
                <button id="saveChangesBtn">Save Changes</button>
            </li>
        </ul>
        `,
        class: "editProfile",
    }



    // Define save changes function
    const saveChanges = async() => {
        // Upload Profile Picture
        // Select New Profile Picture
        const newProfilePicture = document.querySelector("#newProfilePicture").files[0];

        // Get Profile Picture URL
        // Define New Profile Picture Ref
        const profilePictureRef = ref(storage, `profilePictures/${userData.id}/profilePicture`);

        // Get URL of the Profile Picture
        getDownloadURL(profilePictureRef)
        .then((profilePictureUrl) => {
            // Log
            console.log("PP_URL: ",profilePictureUrl);
            
            // Upload the profile picture url to firestore
            updateDoc(doc(db, "users", userData.id), {profilePictureURL: profilePictureUrl});
        })
        .catch((error) => {
            // Handle any errors
        });

        // Upload selected file
        console.log(newProfilePicture);
        if(newProfilePicture!=undefined){
            // Upload new profile picture to storage
            uploadBytes(profilePictureRef, newProfilePicture).then((snapshot) => {
                console.log('Uploaded the new profile picture!');
            });
        }else{
            console.log("No file chosen.");
        }


        // Get and set the new user data
        // Password Validation
        var newPassword = document.querySelector("#newPassword").value
        var newPasswordCheck = document.querySelector("#newPasswordCheck").value

        if(newPassword==newPasswordCheck){
            var updatedUserData = {
                username: document.querySelector("#newUsername").value,
                email: document.querySelector("#newEmail").value,
                password: document.querySelector("#newPassword").value,
                description: document.querySelector("#newDescription").value,
            }            
            
            // Update to firebase
            updateDoc(doc(db, "users", userData.id), updatedUserData);
            // console.log(updatedUserData)

            // Update to auth
            // Update Display Name
            updateProfile(auth.currentUser, {
                displayName: userData.username,
            }).then(() => {
                // Profile updated!
                // ...
            }).catch((error) => {
                // An error occurred
                // ...
            });
            
            // Update Email
            updateEmail(auth.currentUser, updatedUserData.email).then(() => {
                // Email updated!
                // ...
            }).catch((error) => {
                // An error occurred
                console.log(error);
                // ...
            });

            // // Update Password
            // updatePassword(auth.currentUser, updatedUserData.password).then(() => {
            //     // Update successful.
            // }).catch((error) => {
            //     // An error occurred
            //     console.log(error);
            //     // ...
            // });
            
        }else{
            alert("The passwords you entered do not match! Please try again.")
        }
    }


    // Save Changes
    setTimeout(() => {
        const saveChangesBtn = document.querySelector("#saveChangesBtn")
        saveChangesBtn.onclick = () => {
            saveChanges()
        }
    }, 500);


    createPage(pageData)
}


export { editProfilePage }