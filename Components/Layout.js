import React, { Component } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SignIn from '../pages/signIn';
import style from '../static/Style';
import firebase from '../firebaseClient';

/*
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    return children;
  } else {
    <SignIn/>
  }})
  */


const Layout = () => {
    return (<>
      <Head>
        <title>Harvest</title>
        <meta charSet='utf-8' />
        <meta name='viewport'
          content='initial-scale=1.0, width=device-width' />
      </Head>
    </>);

}
export default Layout;