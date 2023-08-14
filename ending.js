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
            document.getElementById("number").value=doc.data().phoneNumber;

        });
        const q1 = query(collection(db, "quantity"));
        const querySnapshot1 = await getDocs(q1);
        querySnapshot1.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            document.getElementById('q').value = doc.data().quantity;
            // document.getElementById('span').innerText = doc.data().TotalPrice;

        });
        const q2 = query(collection(db, "checkoutInfo"));
        const querySnapshot2 = await getDocs(q2);
        querySnapshot2.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            // document.getElementById('dropdownMenuButton').innerText = doc.data().name;
            document.getElementById("name").value=doc.data().Name
            document.getElementById("ad").value=doc.data().adrees;
            document.getElementById("postalcode").value=doc.data().postalcode
            document.getElementById("city").value=doc.data().city;
            document.getElementById("email").value=doc.data().email;

        });
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
                    document.getElementById("hello").innerHTML+=`
                    
                    <div class="img">
                    <img src="${url}" alt="">
                    </div>
                    
                  `
                  
                //   doc.data()
                  document.getElementById("hello").innerHTML+=`
                  
                  <h6>Product Name:<span class="span">${docSnap.data().text}</span></h6>
              <h6>Price:<span class="span">${docSnap.data().price}Rs</span></h6>
              <h6>Description:<span class="span">${docSnap.data().textarea}</span></h6>
              <div id="total">
<h6>Total Price:<span class="span" id="span"></span></h6>
              
              </div>
              <div class="col co">
              </div>
      
              <a   class="h"> <button class="btn btn-success  btn1 mt-5" id="addTO" onclick="store_quantity('${doc.id}')">Purchase Now</button></a>
                    `
});
}    
    }
    });