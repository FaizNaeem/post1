import { app, db, auth, } from './firebase.mjs'
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getDownloadURL, ref, getStorage, deleteObject, uploadBytes } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
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
           
<button type="button" onclick="edit('${doc.id}')" id="Change"  class="btn bn" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i id="edit" class="fa-solid fa-light fa-pen-to-square"></i></button>

              <a href="#" class=""> <button class="btn btn-success" id="addTO" onclick="card('${doc.id}')">Add To Card</button></a>
              <a href="#" class="b"> <button class="btn btn-danger"  id="dlt" onclick="dlt('${doc.id}')"><i class="fa-solid  fa-trash"></i> </button></a>
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
async function edit(e) {
  console.log(e);


  const q = query(collection(db, "postapp"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    if (doc.id === e) {
      let text = document.getElementById("text").value = doc.data().text
      let textarea = document.getElementById("textarea").value = doc.data().textarea
      let price = document.getElementById("number").value = doc.data().price


    }
  });


  document.getElementById("btn-edit").addEventListener("click", async () => {
    let text = document.getElementById("text")
    let textarea = document.getElementById("textarea")
    let price = document.getElementById("number")
    console.log(text.value)
    if (text.value == '' || textarea.value == '' || price.value == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Fill This Input',
       
      })
    }
    else {
      let file = document.getElementById("file").files[0]

      try {
        const washingtonRef = doc(db, "postapp", e);

        // Set the "capital" field of the city 'DC'
        await updateDoc(washingtonRef, {
          textarea: textarea.value,
          text: text.value,
          price: price.value,
        });
        console.log("Document written with ID: ", e);
        // alert("data save succes")
        // Swal.fire(
        //   'Good job!',
        //   'UPDATE SUCCES 😍',
        //   'success'
        // )
        // document.getElementById("Change").innerText = "Update"
        // img_id =docRef.id
        // console.log("id" ,img_id );
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      const storage = getStorage();
      const storageRef = ref(storage, e);

      // 'file' comes from the Blob or File API
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        // alert("pic upload succes")
        // Swal.fire(
        //   'Good job!',
        //   'Upload Succes ❤',
        //   'success'
        // )
        
Swal.fire({
  title: 'Update Succes ❤',
  showClass: {
    popup: 'animate__animated animate__fadeInDown'
  },
  hideClass: {
    popup: 'animate__animated animate__fadeOutUp'
  }
})
      });
      setTimeout(() => {
        location.reload()
      }, 5000)
    }
  })
}
window.edit = edit
async function dlt(id) {
  const storage = getStorage();
  const desertRef = ref(storage, id);

  // Delete the file
  deleteObject(desertRef).then(() => {
    // File deleted successfully
    Swal.fire({
      title: 'Delete Succes ❤',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
    // window.reload()
  }).catch((error) => {
    // Uh-oh, an error occurred!
  });
  await deleteDoc(doc(db, "postapp", id));
}
window.dlt = dlt
function card(e) {
  console.log(e);
  localStorage.setItem("id" , e)
  setTimeout(() => {
      window.location.href = './card.html'
  }, 2000);
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

document.getElementById("dark2").addEventListener("click",()=>{
window.location.reload()
console.log(hello);
})
