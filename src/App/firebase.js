import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyANgF3VQW5m2zQor9yJjXKXPGBn05965W4",
  authDomain: "fir-auth-example-59904.firebaseapp.com",
  projectId: "fir-auth-example-59904",
  storageBucket: "fir-auth-example-59904.appspot.com",
  messagingSenderId: "211136169494",
  appId: "1:211136169494:web:ceedfaa5d3279b62911737",
  measurementId: "G-64WQDQTNL6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();