import React,{ useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from "react-hook-form";
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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  firebaseClient();
  const router = useRouter();
  const classes = useStyles();
  const Users = firestore.collection('UserList');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
  firebase.auth().createUserWithEmailAndPassword(data.email,data.password)
    .then(() => {
      const {uid} = auth.currentUser;
        Users.doc(uid).set({
        firstName:FirstName,
        lastName:LastName,
        createdAt:firebase.firestore.FieldValue.serverTimestamp(),
        uid
      })
      //replaceはページ遷移後にブラウザの戻るを押しても、1つ前のページに戻れない
      //pushは戻れる。基本はpushでよさそう。
      router.replace('/');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('fail...',errorCode,errorMessage);
    });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        新規会員登録
        </Typography>
        <form 
        className={classes.form} 
        onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                id="firstName"
                label="First Name"
                value={FirstName}
                onChange={(e )=> setFirstName(e.target.value)}
                inputRef={register({ required: true })}
                required
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={LastName}
                onChange={(e )=> setLastName(e.target.value)}
                inputRef={register({ required: true })}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Email Address"
                name="email"
                id="email"
                autoComplete="email"
                inputRef={register({ required: true })}
                required
                fullWidth
              />
              {errors.exampleRequired && <span>This field is required</span>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register({ required: true })}
                required
                fullWidth
              />
              {errors.exampleRequired && <span>This field is required</span>}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          >
            Sign Up
          </Button>
          {errors.exampleRequired && <span>This field is required</span>}
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}