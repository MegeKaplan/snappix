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



const followUser = async(userData, userIdToFollow) => {
    // Log
    // console.log(userData.id, userIdToFollow);

    // Update following of me
    var isThereUser = false
    userData.following.forEach(userID => {
        console.log(userID);
        if(userID==userIdToFollow){
            isThereUser=true
        }
    });
    if(!isThereUser){
        userData.following.push(userIdToFollow)
        await updateDoc(doc(db, "users", userData.id), {following: userData.following});
        console.log(userData.following);
    }else{
        console.log("User already exists!");

        // Reduce user from my following
        var newFollowingToMe = []
        userData.following.forEach(userID => {
            if(userID!=userIdToFollow){
                console.log(userID);
                newFollowingToMe.push(userID)
            }
        });
        console.log(newFollowingToMe);
        userData.following = newFollowingToMe
        await updateDoc(doc(db, "users", userData.id), {following: userData.following});
    }

    // Update followers of user to follow
    var userToFollow = await getDoc(doc(db, "users", userIdToFollow))
    var followersOfUserToFollow = userToFollow.data().followers
        
    var isThereMe = false
    followersOfUserToFollow.forEach(userID => {
        console.log(userID);
        if(userID==userData.id){
            isThereMe=true
        }
    });
    if(!isThereMe){
        followersOfUserToFollow.push(userData.id)
        await updateDoc(doc(db, "users", userIdToFollow), {followers: followersOfUserToFollow});
        console.log(followersOfUserToFollow);
    }else{
        console.log("User already exists!");

        // Reduce me from followers of user
        var newFollowersOfUserToFollow = []
        followersOfUserToFollow.forEach(userID => {
            if(userID!=userData.id){
                console.log(userID);
                newFollowersOfUserToFollow.push(userID)
            }
        });
        console.log(newFollowersOfUserToFollow);
        followersOfUserToFollow = newFollowersOfUserToFollow
        await updateDoc(doc(db, "users", userIdToFollow), {followers: followersOfUserToFollow});
    }
}


export { followUser }