// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, updateProfile, updateEmail, updatePassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

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
    // Get Profile Picture URL
    const profilePictureRef = ref(storage, `images/${userData.id}/profilePicture`);
    console.log(profilePictureRef.fullPath);

    // Create New Post Page
    var pageData = {
        inner: `
        <ul>
            <li>
                <span><img src="./imgs/pp/pp_admin.png" alt="${userData.username}"></span>
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
        // Upload Profile Picture Tests
        // Select New Profile Picture
        const newProfilePicture = document.querySelector("#newProfilePicture").files[0];
        
        // Define New Profile Picture Ref
        const profilePictureRef = ref(storage, `images/${userData.id}/profilePicture`);


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
                // profilePictureURL: "profilePicture",
            }            
            console.log(updatedUserData)

            // Upload new profile picture to storage
            uploadBytes(profilePictureRef, newProfilePicture).then((snapshot) => {
                console.log('Uploaded the new profile picture!');
            });

            // Update to firebase
            await updateDoc(doc(db, "users", userData.id), updatedUserData);

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
                // ...
            });
            const user = auth.currentUser
            // Update Password
            // updatePassword(user, updatedUserData.password).then(() => {
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