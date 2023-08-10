import { app, db, auth, } from './firebase.mjs'
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { collection, query, where, getDoc, doc, deleteDoc, updateDoc ,addDoc} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getDownloadURL, ref, getStorage, deleteObject, uploadBytes } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";



const getDat = async () => {
    const storage =getStorage(app)
    // console.log("hello2");
    const docRef = doc(db, "postapp", localStorage.getItem("id"));
    const docSnap = await getDoc(docRef);

    // let quantity = document.getElementById("val")
    // console.log(quantity);
    // let num = docSnap.data().price * quantity;
    // console.log(num);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data().text);
       
        getDownloadURL(ref(storage,  localStorage.getItem("id")))
            .then((url) => {
                document.getElementById("card").innerHTML+=`
                <div class="col-lg-7 col-sm-12 left">
                <div class="img">
                <img src="${url}" alt="">
                </div>
                <h4 class="h4">Quantity</h4>
                <div class="col co mt-3">
                <button class="but btn btn-primary" onclick="minus()">-</button>
                <input type="Number" name="" id="val" value="2"  placeholder="0">
                <button class="but btn btn-primary" onclick="plus()">+</button>
                </div>
                
              </div>
              `
              
           let num =  document.getElementById("val").value
         num =  num*docSnap.data().price
              document.getElementById("card").innerHTML+=`
              <div class="col-lg-4 col-sm-12 right">
              
                  <h6>Product Name:<span class="span">${docSnap.data().text}</span></h6>
              <h6>Price:<span class="span">${docSnap.data().price}Rs</span></h6>
              <h6>Description:<span class="span">${docSnap.data().textarea}</span></h6>
              <h6>Shipping Price:<span class="span">200rs</span></h6>
              <h6>Total Price:<span class="span">${num}</span></h6>
              <div class="col co">
      

              </div>
      
              <a   class="h"> <button class="btn btn-success  btn1 mt-5" id="addTO" onclick="store_quantity('${doc.id}')">Purchase Now</button></a>
                    </div>
`
// console.log(doc.data().title);
            })
            .catch((error) => {
                console.log(error);
            });
    } else {
        console.log("No such document!");
    }
}
async function store_quantity(){
    let quantity = document.getElementById("val").value
try {
    const docRef = await addDoc(collection(db, "quantity"), {
     quantity :quantity
    });
    console.log("Document written with ID: ", docRef.id,quantity);
    // alert("data save succes")
    console.log("id" ,docRef.id );
} catch (e) {
    console.error("Error adding document: ", e);
}

}
window.store_quantity = store_quantity
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