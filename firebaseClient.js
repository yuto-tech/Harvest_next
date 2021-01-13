import firebase from "firebase/app"
import "firebase/firestore";
import "firebase/auth";
import 'firebase/storage';
import 'firebase/app';

/*
const firebaseConfig =({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId:process.env.FIREBASE_MEASUREMENT_ID
}) */

const firebaseConfig = {
  apiKey: "AIzaSyA3edHzgEMFoK9bzVPHHJ3DeRFiUnHrsiI",
  authDomain: "harvest-6137e.firebaseapp.com",
  databaseURL: "https://harvest-6137e-default-rtdb.firebaseio.com",
  projectId: "harvest-6137e",
  storageBucket: "harvest-6137e.appspot.com",
  messagingSenderId: "749707619690",
  appId: "1:749707619690:web:5947ccf93ab56de5a10913",
  measurementId: "G-RFMQZPT3CT"
};

export default function firebaseClient () {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
}

