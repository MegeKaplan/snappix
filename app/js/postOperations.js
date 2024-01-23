// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Import Local Modules and Components
// ...

// Firebase Config
import { firebaseConfig } from "../db/config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);



const getTargetPostData = async(postID) => {
    var docSnap = await getDoc(doc(db, "posts", postID))
    var postData = docSnap.data()
    return postData
}

const getUserData = async(userID) => {
    var docSnap = await getDoc(doc(db, "users", userID))
    var userData = docSnap.data()
    return userData
}

// Like Post
const likePost = async(userData, targetPostID) => {
    console.log("LIKE:", targetPostID);

    // Get Post Data
    var postData = await getTargetPostData(targetPostID)

    // Get User Data
    var userData = await getUserData(userData.id)

    // Is it already liked?
    var isLikedAlready = false
    userData.likes.forEach(likedPostID => {
        if(likedPostID==targetPostID){
            isLikedAlready = true
        }
    });
    if(!isLikedAlready){
        userData.likes.push(targetPostID)
        postData.likes.push(userData.id)
        await updateDoc(doc(db, "users", userData.id), {likes: userData.likes});
        await updateDoc(doc(db, "posts", postData.id), {likes: postData.likes});
    }else{
        // Remove post from user's likes
        var updatedUserLikes = []
        userData.likes.forEach(likedPostID => {
            if(likedPostID!=targetPostID){
                updatedUserLikes.push(likedPostID)
            }
        });
        await updateDoc(doc(db, "users", userData.id), {likes: updatedUserLikes});

        // Remove user id from post's likes
        var updatedPostLikes = []
        postData.likes.forEach(userID => {
            if(userID!=userData.id){
                updatedPostLikes.push(userID)
            }
        });
        await updateDoc(doc(db, "posts", postData.id), {likes: updatedPostLikes});
    }
    console.log("UD:",userData.likes);
    console.log("PD:",postData.likes);
}

const commentPost = async(userData, targetPostID) => {
    console.log("COMMENT:", targetPostID);
}

// Save Post
const savePost = async(userData, targetPostID) => {
    console.log("SAVE:", targetPostID);

    // Get Post Data
    var postData = await getTargetPostData(targetPostID)

    // Get User Data
    var userData = await getUserData(userData.id)

    // Is it already saved?
    var isSavedAlready = false
    userData.saves.forEach(savedPostID => {
        if(savedPostID==targetPostID){
            isSavedAlready = true
        }
    });
    if(!isSavedAlready){
        userData.saves.push(targetPostID)
        postData.saves.push(userData.id)
        await updateDoc(doc(db, "users", userData.id), {saves: userData.saves});
        await updateDoc(doc(db, "posts", postData.id), {saves: postData.saves});
    }else{
        // Remove post from user's saves
        var updatedUserLikes = []
        userData.saves.forEach(savedPostID => {
            if(savedPostID!=targetPostID){
                updatedUserLikes.push(savedPostID)
            }
        });
        await updateDoc(doc(db, "users", userData.id), {saves: updatedUserLikes});

        // Remove user id from post's saves
        var updatedPostLikes = []
        postData.saves.forEach(userID => {
            if(userID!=userData.id){
                updatedPostLikes.push(userID)
            }
        });
        await updateDoc(doc(db, "posts", postData.id), {saves: updatedPostLikes});
    }
    console.log("UD:",userData.saves);
    console.log("PD:",postData.saves);
}


export { likePost, commentPost, savePost }