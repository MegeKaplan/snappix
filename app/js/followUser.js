// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Import Local Modules and Components
import { createPage } from "../js/createPage.js";
import { profilePage } from "../components/Profile.js";

// Firebase Config
import { firebaseConfig } from "../db/config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);



const followUser = async(userData, userIdToFollow) => {
    // Log
    // console.log(userData.id, userIdToFollow);
    
    // Redefine User for Bug Fix
    var docSnap = await getDoc(doc(db, "users", userData.id))
    var userData = docSnap.data()

    // Update following of me____________________________
    var isThereUser = false
    userData.following.forEach(userID => {
        // console.log(userID);
        if(userID==userIdToFollow){
            isThereUser=true
        }
    });
    if(!isThereUser){
        userData.following.push(userIdToFollow)
        await updateDoc(doc(db, "users", userData.id), {following: userData.following});
    }else{
        // console.log("User already exists!");

        // Reduce user from my following
        var newFollowingToMe = []
        userData.following.forEach(userID => {
            if(userID!=userIdToFollow){
                // console.log(userID);
                newFollowingToMe.push(userID)
            }
        });
        // console.log(newFollowingToMe);
        // userData.following = newFollowingToMe
        await updateDoc(doc(db, "users", userData.id), {following: newFollowingToMe});
    }

    // Update followers of user to follow____________________________
    var userToFollow = await getDoc(doc(db, "users", userIdToFollow))
    var followersOfUserToFollow = userToFollow.data().followers
        
    var isThereMe = false
    followersOfUserToFollow.forEach(userID => {
        // console.log(userID);
        if(userID==userData.id){
            isThereMe=true
        }
    });
    if(!isThereMe){
        followersOfUserToFollow.push(userData.id)
        await updateDoc(doc(db, "users", userIdToFollow), {followers: followersOfUserToFollow});
        // console.log(followersOfUserToFollow);
    }else{
        // console.log("User already exists!");

        // Reduce me from followers of user
        var newFollowersOfUserToFollow = []
        followersOfUserToFollow.forEach(userID => {
            if(userID!=userData.id){
                // console.log(userID);
                newFollowersOfUserToFollow.push(userID)
            }
        });
        // console.log(newFollowersOfUserToFollow);
        await updateDoc(doc(db, "users", userIdToFollow), {followers: newFollowersOfUserToFollow});
    }

    profilePage(userData, userIdToFollow)
    window.location.reload()
}


export { followUser }