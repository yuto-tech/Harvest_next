import React,{ useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import firebaseClient from '../firebaseClient';
import firebase from "firebase/app"
import "firebase/firestore";
import "firebase/auth";
import 'firebase/storage';
import 'firebase/app';

firebaseClient();
const auth = firebase.auth();
const firestore =  firebase.firestore();
const storage = firebase.storage();


export default function SignGoogle () {
  const signInWithGoogle = () => {
    const router = useRouter();
    const provider = new firebase.auth.GoogleAuthProvider();
    const Users = firestore.collection('UserList');
    const {uid,displayName,photoURL} = auth.currentUser;
    auth.signInWithPopup(provider);
    Users.doc(uid).set({
    Name:displayName,
    photoURL,
    createdAt:firebase.firestore.FieldValue.serverTimestamp(),
    uid
  }).then(()=>{
    router.replace('/');
  })
  }
  return(
    <button onClick={signInWithGoogle} >sign in with Google</button>
  )
}