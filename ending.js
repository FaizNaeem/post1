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
            document.getElementById('total').value = doc.data().TotalPrice;
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
            document.getElementById('pro').value = docSnap.data().text;

            getDownloadURL(ref(storage,  localStorage.getItem("id")))
                .then((url) => {
                    document.getElementById("hello").innerHTML+=`
                    
                    <div class="img">
                    <img src="${url}" alt="">
                    </div>
                    
                  `
                  document.getElementById("hello").innerHTML+=`
            <button class="btn btn-success btn1 mt-4" id="btn1">Confirm Order</button>
                    `
                    document.getElementById("btn1").addEventListener("click",async()=>{
                        let name = document.getElementById("name").value
                        let number = document.getElementById("number").value
                        let ad = document.getElementById("ad").value
                        let q = document.getElementById("q").value
                        let postalcode = document.getElementById("postalcode").value
                        let city = document.getElementById("city").value
                        let email = document.getElementById("email").value
                        let total = document.getElementById("total").value
                        let pro = document.getElementById("pro").value
                        try {
                            const docRef = await addDoc(collection(db, "ConfirmOrderDetails"), {
                               name:name,
                               number:number,
                               Adress:ad,
                               Quantity:q,
                               postalcode:postalcode,
                               city:city,
                               email:email,
                               total:total,
                               productName:pro
                            });
                            console.log("Document written with ID: ", docRef.id);
                            // alert("data save succes")
                            // Swal.fire({
                            //     'Good job!',
                            //     'Order Confirm',
                            //     'success'
                                
                            //  } )
                             Swal.fire({
                                icon: 'success',
                                // title: '',
                                text: 'Order Confirm',
                                footer: '<a href="index.html">Go home And continue Shopping</a>'
                              })
                            // img_id =docRef.id
                            // console.log("id" ,img_id );
                        } catch (e) {
                            console.error("Error adding document: ", e);
                        }
                    })
                    
});
}    

    }
    
    });