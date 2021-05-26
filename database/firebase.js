import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyB6amNuRzEG_5L9o0K37oLWVwXIHN_pQO0",
  authDomain: "inventarioa-68527.firebaseapp.com",
  projectId: "inventarioa-68527",
  storageBucket: "inventarioa-68527.appspot.com",
  messagingSenderId: "514914499900",
  appId: "1:514914499900:web:52c86084d85e31b3a27239",
  measurementId: "G-5YER26G1FP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db
};
