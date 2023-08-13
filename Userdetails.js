import { app, db, auth, } from './firebase.mjs'
import { onAuthStateChanged ,signOut} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { collection, query, where, getDoc, doc, deleteDoc, updateDoc,getDocs ,addDoc} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getDownloadURL, ref, getStorage, deleteObject, uploadBytes } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

var myEmail;
var myName;
var myId

onAuthStateChanged(auth, async (user) => {
    if (user) {
        function hello() {
            signOut(auth).then(() => {
                alert('Singout successfully');
                location.reload()
                // location.href = './index.html'
            }).catch((error) => {
                console.log(error);
            });
        }
        window.hello= hello
        // console.log(user);
        const uid = user.uid;
        console.log(user)
        myId = uid;
        myEmail = user.email
        // user name ki value get krne ke lye firestore se
        const q = query(collection(db, "signup"), where("email", "==", myEmail));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            document.getElementById('dropdownMenuButton').innerText = doc.data().name;
            // var textarea = document.getElementById("textarea").value;
            var name = document.getElementById("name").value=doc.data().name;
            var email = document.getElementById("email").value=doc.data().email
            // var city = document.getElementById("city").value;
            // var postalcode = document.getElementById("postalcode").value;
            // var adrees = document.getElementById("adrees").value;
        });
    }



document.getElementById("btn").addEventListener("click", async () => {
    var name = document.getElementById("name").value
    var email = document.getElementById("email").value
    var city = document.getElementById("city").value;
    var postalcode = document.getElementById("postalcode").value;
    var adrees = document.getElementById("adrees").value;
    var Feedback = document.getElementById("textarea").value;
// let img_id ;
        try {
            const docRef = await addDoc(collection(db, "checkoutInfo"), {
                Feedback: Feedback,
                Name: name,
                postalcode:postalcode,
                email:email,
                city:city,
                adrees:adrees
            });
            console.log("Document written with ID: ", docRef.id);
            // // alert("data save succes")
            // Swal.fire(
            //     'Good job!',
            //     'Data Save 😍',
            //     'success'
            //   )
            // img_id =docRef.id
            // console.log("id" ,img_id );
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    
    
     
    
        // 'file' comes from the Blob or File API
   

    });

});
