import * as firebase from 'firebase';
import "firebase/storage";
import "firebase/database"
import "@firebase/firestore"



const firebaseConfig = {
    apiKey: "AIzaSyBUIDiBqfh4PIPqcpEWD0juPKT6BCRrDwY",
    authDomain: "chitchat-2c994.firebaseapp.com",
    projectId: "chitchat-2c994",
    storageBucket: "chitchat-2c994.appspot.com",
    messagingSenderId: "383733104758",
    appId: "1:383733104758:web:5ffe043a58e224ab47df57",
    measurementId: "G-JKBBX41RS9"
  };
  
  
  if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  }

  export const db = firebase.firestore();

  export const storage = firebase.storage();

  export  const auth = firebase.auth();

  export const google = firebase.auth;