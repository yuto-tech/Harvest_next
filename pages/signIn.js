import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import  SignGoogle  from '../Components/Authentication';
import firebaseClient from '../firebaseClient';
import firebase from "firebase/app"
import "firebase/firestore";
import "firebase/auth";
import 'firebase/storage';
import 'firebase/app';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  firebaseClient();
  const router = useRouter();
  const classes = useStyles();
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
  firebase.auth().signInWithEmailAndPassword(data.email,data.password)
  .then(() => {
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
          Sign in
        </Typography>
        <form 
        className={classes.form} 
        onSubmit={handleSubmit(onSubmit)}
        >
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
              <SignGoogle/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}