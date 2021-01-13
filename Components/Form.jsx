import React, {useState,useEffect,useContext} from "react";
import Head from 'next/head';
import Link from 'next/link';
import Login from '../pages/Login';
import Footer from './Footer';
import firebase from "firebase/app";
import "firebase/auth";
import Index from '../pages/index';
import { useRouter } from 'next/router';


//firebase初期化
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
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export const MainForm = React.createContext();
export const Maincontent = React.createContext();

const Form = (props) => {
  
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [hasAccount, sethasAccount] = useState('');

  const crearInputs = () => {
    setEmail('');
    setPassword('');
  }

  const crearErrors = () => {
    setEmailError('');
    setpasswordError('');
  }

  const handlelogin = () => {
    crearErrors('');
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      switch (errorCode){
        case "auth/invaild-email":
        case "auth/user-disabled":
        case "auth/ser-not-found":
          setEmailError(errorMessage);
          break;
        case "auth/wrong-password":
          setpasswordError(errorMessage);
          break;
      }
    });
  }

  const handleSignup = () => {
    crearErrors('');
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      switch (errorCode){
        case "auth/email-already-in-use":
        case "auth/inviled-email":
          setEmailError(errorMessage);
          break;
        case "auth/weak-password":
          setpasswordError(errorMessage);
          break;
      }
    });
  }

  const handleLogout = () => {
    firebase.auth().signOut();
  }

  const authListener = () => {
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        crearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  }

  useEffect(() => {
    authListener();
  },[])
  
  return (
    <>
    <Head>
      <title>Harvest</title>
      <meta charSet='utf-8'/>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <body>
      { user
       ? 
      (props.children) 
       :
      (
      <MainForm.Provider
        value={
          email,
          setEmail,
          password,
          setPassword,
          handlelogin,
          handleSignup,
          handleLogout,
          sethasAccount,
          emailError,
          passwordError
        }>
          <Login/>
        </MainForm.Provider>
        )
      }
    </body>
  </>);
};

export default Form;