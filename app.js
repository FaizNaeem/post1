import { getStorage, ref, uploadBytes ,getDownloadURL} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { db  } from "./firebase.mjs";
document.getElementById("btn").addEventListener("click", async () => {
    var textarea = document.getElementById("textarea").value;
    var text = document.getElementById("text").value;
    var price = document.getElementById("number").value;
    var file = document.getElementById("file").files[0];
let img_id ;
        try {
            const docRef = await addDoc(collection(db, "postapp"), {
                textarea: textarea,
                text: text,
                price:price,
            });
            console.log("Document written with ID: ", docRef.id);
            // alert("data save succes")
            Swal.fire(
                'Good job!',
                'Data Save 😍',
                'success'
              )
            img_id =docRef.id
            console.log("id" ,img_id );
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    
    
        const storage = getStorage();
        const storageRef = ref(storage, img_id );
    
        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            // alert("pic upload succes")
            Swal.fire(
                'Good job!',
                'Upload Succes ❤',
                'success'
              )
        });
    setTimeout(()=>{
window.location.href="./index.html"
    },5000)
    });
