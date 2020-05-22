import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyD20JChjG366TOFx_WAF3T-_VJlALOfPI4",
  authDomain: "themunchingchef-97750.firebaseapp.com",
  databaseURL: "https://themunchingchef-97750.firebaseio.com",
  projectId: "themunchingchef-97750",
  storageBucket: "themunchingchef-97750.appspot.com",
  messagingSenderId: "1015818364023",
  appId: "1:1015818364023:web:3767d22a550e75e17ed272",
  measurementId: "G-J9FE7P8LJZ",
};

// Initialize Firebase
var fire = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default fire;
