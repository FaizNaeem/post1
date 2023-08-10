import { app, db, auth, } from './firebase.mjs'
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { collection, query, where, getDoc, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getDownloadURL, ref, getStorage, deleteObject, uploadBytes } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";




const getDat = async () => {
    const storage =getStorage(app)
    const docRef = doc(db, "postapp", localStorage.getItem("id"));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data().text);
       
       
        getDownloadURL(ref(storage,  localStorage.getItem("id")))
            .then((url) => {
                document.getElementById("card").innerHTML+=`
                <div class="col-lg-7 col-sm-12 left">
                <img src="${url}" alt="">
              </div>
              <div class="col-lg-5 col-sm-12 right">
                  <h6>Product Name:<span class="span">${doc.data().title}</span></h6>
              <h6>Price:<span class="span">${doc.data().price}</span></h6>
              <h6>Description:<span class="span">${doc.data().textarea}</span></h6>
              <div class="col co">
              <button class="but btn btn-primary" onclick="minus()">-</button>
              <input type="text" name="" id="val"  placeholder="0">
              <button class="but btn btn-primary" onclick="plus()">+</button>
              </div>
              <a href="./userdetails.html" class=""> <button class="btn btn-success mt-5" id="addTO" onclick="card('${doc.id}')">Purchase Now</button></a>
              <!-- <div class="pu"> -->
                  <!-- </div> -->
              
                    </div>
`
                // console.log(url);
            })
            .catch((error) => {
                
            });
    } else {
        console.log("No such document!");
    }
}
function plus(){
    var value = parseInt(document.getElementById('val').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('val').value = value;

}
window.plus=plus
function minus(){
    var value = parseInt(document.getElementById('val').value, 10);
    value = isNaN(value) ? 0 : value;
    --value;
    document.getElementById('val').value = value;

}
window.minus=minus
getDat();