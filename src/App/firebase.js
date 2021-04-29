import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();