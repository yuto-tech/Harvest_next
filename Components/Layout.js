import React, { Component } from 'react';
import Head from 'next/head';
import SignIn from '../pages/signIn';
import firebaseClient from '../firebaseClient';
import { useRouter } from 'next/router';
import firebase from "firebase/app"
import "firebase/firestore";
import "firebase/auth";
import 'firebase/storage';
import 'firebase/app';


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