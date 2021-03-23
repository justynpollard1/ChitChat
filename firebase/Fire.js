import * as firebase from 'firebase';
import "firebase/storage";
import "firebase/database"
import "@firebase/firestore"



const firebaseConfig = {
    apiKey: "AIzaSyDUQ_N1jcrrfiRo0R3Tj7pol0N5-D3xoWg",
    authDomain: "test-app-96cb0.firebaseapp.com",
    databaseURL: "https://test-app-96cb0.firebaseio.com",
    projectId: "test-app-96cb0",
    storageBucket: "test-app-96cb0.appspot.com",
    messagingSenderId: "205075513499",
    appId: "1:205075513499:web:40606fe80f18dae4f8863e",
    measurementId: "G-XBXR3DSBQ0"
  };
  
  
  if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  }

  export const db = firebase.firestore();

  export const storage = firebase.storage();

  export  const auth = firebase.auth();

  export const google = firebase.auth;