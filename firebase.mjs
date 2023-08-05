import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const firebaseConfig = {
   apiKey: "AIzaSyCarN6h6FPkS3raGOKAScjMJcdp_r0kHWU",
   authDomain: "smitproject-39703.firebaseapp.com",
   databaseURL: "https://smitproject-39703-default-rtdb.firebaseio.com",
   projectId: "smitproject-39703",
   storageBucket: "smitproject-39703.appspot.com",
   messagingSenderId: "849520424684",
   appId: "1:849520424684:web:83a166c8b0f2829f5557c9",
   measurementId: "G-WJS2PMZKWQ"
};


export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);