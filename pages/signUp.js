import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { v4 as uuidv4 } from "uuid";
import SignGoogle from "../Components/Authentication";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import styled from "styled-components";
import firebaseClient from "../firebaseClient";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/app";

firebaseClient();
const auth = firebase.auth();
const firestore = firebase.firestore();

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  firebaseClient();
  const router = useRouter();
  const classes = useStyles();
  const Users = firestore.collection("UserList");
  const [Name, setName] = useState("");
  const [LastName, setLastName] = useState("");
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(() => {
        const { uid } = auth.currentUser;
        Users.doc(uid).set({
          Name: Name,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          uid,
          photoURL: fileUrl,
        });
        //replaceはページ遷移後にブラウザの戻るを押しても、1つ前のページに戻れない
        //pushは戻れる。基本はpushでよさそう。
        router.replace("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("fail...", errorCode, errorMessage);
      });
  };

  const [selectedFile, setSelectedFile] = useState("");
  const [preview, setPreview] = useState("");
  const [fileUrl, setFileUrl] = React.useState(null);
  const [image, setimage] = useState("");
  const fileId = uuidv4();
  //ここがうまく動かない
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  const onSelectFile = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`${fileId}.jpeg`);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };

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
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="Name"
                variant="outlined"
                id="Name"
                label="名前"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                inputRef={register({ required: true })}
                required
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="メールアドレス"
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
                label="パスワード"
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
              {selectedFile && (
                <img
                  src={preview}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
                />
              )}
              <Setting__file>
                <label htmlFor="image">
                  <P>アイコンを設定*</P>
                  <Filesend
                    type="file"
                    id="image"
                    name="image"
                    onChange={((e) => setimage(e.target.value), onSelectFile)}
                    inputRef={register({ required: true })}
                    required
                  />
                </label>
              </Setting__file>
            </Grid>
            <Grid item xs={12}>
              <SignGoogle
                style={{
                  paddingBottom: "10px",
                }}
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
            ログイン
          </Button>
          {errors.exampleRequired && <span>This field is required</span>}
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="./signIn" variant="body2">
                既にアカウントを持っていますか？
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;

const Setting__file = styled.div`
  z-index: 1;
  position: relative
  height: 50px;
  width: 160px;
`;
const Setting__file__images = styled.span`
  font-size: 16px;
  color: whitesmoke;
  height: 50px;
  margin: auto;
  opacity: 1;
  line-height: 570px;
`;
const Filesend = styled.input`
  display: none;
  position: relative;
`;

const P = styled.span`
  display: block;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  font-family: “游ゴシック”, “Yu Gothic”;
  background: #ee7800;
  padding: 8px 0;
  border-radius: 10px;
  max-width: 240px;
  text-align: center;
  transition: 0.3s;
  cursor: pointer;
`;
