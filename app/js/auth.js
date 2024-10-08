// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Config
import { firebaseConfig } from "../db/config.js";

// Import Local Modules
import { validate } from "./validate.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


// Get Form Data
const getFormData = () => {
    var email = document.querySelector("#email").value
    var password = document.querySelector("#password").value
    try{
        var username = document.querySelector("#username").value
    }catch {}

    // var data={email:email, username:username, password:password}
    var data={email:email, username:username, password:password}
    return data
}

// Show Errors
var defaultErrMsg = "Something went wrong! Please check your information again."
var errors = []
const showErrMsgs = (errors) => {
    var errorsContainer = document.querySelector("#errors")
    errorsContainer.innerHTML = ""
    errors.forEach(error => {
        var msgEl = document.createElement("p")
        msgEl.innerText = error
        msgEl.classList.add("error")
        errorsContainer.appendChild(msgEl)
    });
}

// Register
try{
    const registerBtn = document.querySelector("#registerBtn")
    registerBtn.onclick = (e) => {
        // Bug Fix
        e.preventDefault()


        // Get Form Data
        var email = getFormData().email
        var username = getFormData().username
        var password = getFormData().password

        // Validation
        // var isValidData = false
        var isValidData = confirm(`Should your username be ${username}?`)

        errors = []

        var emailValid = validate(email, "email", 5, 20)
        var usernameValid = validate(username, "username", 5, 18)
        var passwordValid = validate(password, "password", 5, 40)
        if(emailValid!=true){
            errors.push(emailValid)
            showErrMsgs(errors)
            errors = []
        }
        if(!usernameValid){
            errors.push(passwordValid)
            showErrMsgs(errors)
            errors = []
        }
        if(!passwordValid){
            errors.push(passwordValid)
            showErrMsgs(errors)
            errors = []
        }

        console.log(errors);
        
        if(isValidData){
            // Register
            createUserWithEmailAndPassword(auth, email, password)
            .then(async(userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user);
    
                // Set User Data
                var userData = {
                    email: email,
                    username: username,
                    password: password,
                    id: user.uid,
                    lastLogin: Date.now(),
                    followers: [],
                    following: [],
                    posts: [],
                    isVerified:false,
                    isAdmin: false,
                    isDev: false,
                    profilePictureURL: "./imgs/pp/pp_default.png",
                    profilePictureName: "profilePicture",
                    description: "",
                    postsSeen: [],
                    likes: [],
                    comments: [],
                    saves: [],
                }
    
                // Add to Firestore
                await setDoc(doc(db, "users", user.uid), userData);
    
                // Log User ID
                console.log(user.uid)
    
                // Redirect to homepage
                setTimeout(() => {
                    window.location.href = "./app/index.html"
                }, 500);
    
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                errors.push(defaultErrMsg)
                showErrMsgs(errors)
                errors = []
                // alert("An Error Occured!")
                // ...
            });
        }else{
            errors.push("You can re-enter your username.")
            showErrMsgs(errors)
            errors = []
        }

        
    }
}catch{}

// Login
try{
    const loginBtn = document.querySelector("#loginBtn")
    loginBtn.onclick = (e) => {
        // Bug Fix
        e.preventDefault()

        // Get Form Data
        var email = getFormData().email
        var username = getFormData().username
        var password = getFormData().password

        // Login
        signInWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {""
            // Signed in 
            const user = userCredential.user;

            // Update the user data
            await updateDoc(doc(db, "users", user.uid), {lastLogin: Date.now()});

            // Log User ID
            console.log(user);

            // Redirect to homepage
            setTimeout(() => {
                window.location.href = "./app/index.html"
            }, 500);

            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            errors.push(defaultErrMsg)
            showErrMsgs(errors)
            errors = []
            // alert("An Error Occured!")
            // ...
        });
    }
}catch{}
