import { app, db, auth, } from './firebase.mjs'
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { collection, query, where, getDoc, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getDownloadURL, ref, getStorage, deleteObject, uploadBytes } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";




const getDat = async () => {
    const docRef = doc(db, "postapp", localStorage.getItem("id"));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
       
       
        getDownloadURL(ref(storage,  localStorage.getItem("id")))
            .then((url) => {
                console.log(url);
            })
            .catch((error) => {
                
            });
    } else {
        console.log("No such document!");
    }
}

getDat();