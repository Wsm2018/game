import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyCxrBuk7agnWFYESf8_dpwPwhPiqipKDdI",
  authDomain: "randomgame-c733d.firebaseapp.com",
  databaseURL: "https://randomgame-c733d.firebaseio.com",
  projectId: "randomgame-c733d",
  storageBucket: "randomgame-c733d.appspot.com",
  messagingSenderId: "572446177189",
  appId: "1:572446177189:web:b1fef341117339e2299a4c",
  measurementId: "G-KG6VH3QEJE"
});

export default firebase.firestore();
