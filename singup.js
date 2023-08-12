import { app, db, auth, } from './firebase.mjs'
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { collection,addDoc} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import {  createUserWithEmailAndPassword ,sendEmailVerification} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

console.log(app);
console.log(db);
console.log(auth);

document.getElementById("btn").addEventListener("click", () => {
  let email = document.getElementById("text").value
  let pass = document.getElementById("pass").value
  let name = document.getElementById("name").value
  let phoneNumber = document.getElementById("number").value
  console.log(email,pass,name,phoneNumber);
  const userData={
    name:name,
    phoneNumber:phoneNumber,
    email:email,
    pass:pass,
}
  createUserWithEmailAndPassword(auth, email, pass)
  .then(async(userCredential) => {
    
      const user = userCredential.user
      try {
        const docRef = await addDoc(collection(db, "signup",), {
          ... userData
        });
    // console.log(user);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    
      // Signed in 
      sendEmailVerification(auth.currentUser)
      .then((res)=>{
        // alert("email send")
       
          
            Swal.fire(
              'CONGRULATION',
              'Singup SUCCES And Email Send',
              'success'
              )
              // setTimeout(()=>{
              //     window.location.href="./login.html"
              //   }, 2000)
        
     
      })
      console.log(user);

    //   // console.log(user);
    //   // ...
    })
    .catch((error) => {
      // alert("hello")
      const errorCode = error.code;
      const errorMessage = error.message;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'corect fil',
      })
      console.log(errorCode, errorMessage);
    });
})
