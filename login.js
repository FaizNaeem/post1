
import { auth,app,db } from "./firebase.mjs"

import {  signInWithEmailAndPassword ,FacebookAuthProvider,GoogleAuthProvider ,signInWithPopup,signInWithRedirect} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";


const google = new GoogleAuthProvider(app);
// console.log(google);
document.getElementById("btn_1").addEventListener("click", () => {
    let email = document.getElementById("text_1").value
    let pass = document.getElementById("pass_1").value
signInWithEmailAndPassword(auth, email, pass)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);

    if(user.emailVerified== true){
          
      Swal.fire(
        'CONGRULATION',
        'Login SUCCES',
        'success'
        )
        .then(function() {
    let email = document.getElementById("text_1");
    email.value=''
    let pass = document.getElementById("pass_1");
    pass.value=''
          
        });
        // setTimeout(()=>{
        //     window.location.href="./quiz.html"
        //   }, 2000)
  }
  else if(user.emailVerified== false){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please Verify Email',
    })
  }
    // Swal.fire(
    //     'CONGRULATION',
    //     'LOGIN SUCCES',
    //     'success'
    //   )
    // window.location.href="./quiz.html"
    // console.log(user);

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'WRONG PASSWORD',
      })
    console.log(errorCode,errorMessage);
  });
});
// google sign IN
document.getElementById("btn_google").addEventListener("click",()=>{
  google.setCustomParameters({
    'login_hint': 'user@example.com'
});
signInWithPopup(auth, google)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // window.location.href = "./quiz.html"
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage);
        // ...
    });

})
// facebook signin
document.getElementById("fb_google").addEventListener("click",()=>{
const fb= new FacebookAuthProvider(app);
signInWithRedirect(auth, fb)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
console.log(user);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);
console.log(errorCode,errorMessage);
    // ...
  });

})
