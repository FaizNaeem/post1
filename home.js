import { app, db, auth, } from './firebase.mjs'
import { onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getDownloadURL, ref, getStorage, deleteObject, uploadBytes } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
var myEmail;
var myName;
var myId
onAuthStateChanged(auth, async (user) => {
    if(user){
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
        });
    }
    else{
        // window.location.href="login.html"
    }
});
const get_date = async () => {
  const storage = getStorage();
  const querySnapshot = await getDocs(collection(db, "postapp"));
  querySnapshot.forEach((doc) => {

    console.log(doc.id, " => ", doc.data());
    // var url1
    getDownloadURL(ref(storage, doc.id))
      .then((url) => {
        var url1 = url;

        //  console.log(url);
        let add_img = document.getElementById("main").innerHTML += `
            <div class="card cn mt-3 mb-3 " id="card-main"  style="width: 300px" >
            <img src="${url1}" class="card-img-top  custom-img" alt="...">
            <div class="card-body">
            <h5 class="card-title cart" id="black">${doc.data().text} <i class="fa-regular heart fa-heart"></i></h5>
            <p class="card-text cartd"   id="p">${doc.data().textarea}</p>
            <h5 class="card-title cart"  id="h5"><i class="fa-solid fa-dollar-sign"></i>${doc.data().price} </h5>
              <a href="card.html" class=""> <button class="btn btn-success" id="addTO" onclick="card('${doc.id}')">Add To Card</button></a>
            </div>
          </div>
            `

        console.log(doc.data().price);
      })

      .catch((error) => {
        // Handle any errors
        console.log(error);
      });
  });
}

function card(e) {
  console.log(e);
  localStorage.setItem("id" , e)

}

window.card = card
get_date()

document.getElementById("dark").addEventListener("click",()=>{
document.getElementById("main").style.background="white"
document.getElementById("card-main").style.color="black"
document.getElementById("black").style.color="black"
document.getElementById("p").style.color="black"
document.getElementById("h5").style.color="black"
document.getElementById("Change").style.background="black"
document.getElementById("edit").style.background="black"
// document.getElementById("Change").style.border="1px solid black !important"
document.getElementById("card-main").style.border="1px solid black"
document.getElementById("nav").style.background="white"
document.getElementById("navbar-brand").style.color="black"
document.getElementById("dark").style.color="black"
document.getElementById("dark1").style.color="black"
document.getElementById("dark2").style.color="black"
document.getElementById("dlt").style.color="black"
// document.getElementById("dlt").style.border="1px solid black"
document.getElementById("post").style.color="black"
document.getElementById("post").style.background="white"

})


