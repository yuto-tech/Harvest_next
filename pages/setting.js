import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import styled from "styled-components";
import PhotoIcon from "@material-ui/icons/Photo";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import firebaseClient from "../firebaseClient";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/app";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

//firebase初期化
firebaseClient();
//firestore初期化
const auth = firebase.auth();
const firestore = firebase.firestore();

const setting = () => {
  const router = useRouter();
  const { register, handleSubmit, watch, errors } = useForm();
  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const [sumview, setsumview] = useState("");
  const [giveday, setgiveday] = useState("");
  const [explanation, setexplanation] = useState("");
  const [Userlist, setUserlist] = useState("");
  const [UUID, setUUID] = useState(uuidv4());
  useEffect(() => {
    !auth.currentUser && router.push("/signIn");
  }, [auth.currentUser]);
  const { uid } = auth.currentUser;
  firestore
    .collection("UserList")
    .doc(uid)
    .get()
    .then((doc) => {
      setUserlist(doc.data());
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  const fanding = firestore.collection("Fanding").doc(UUID);
  const onSubmit = () => {
    fanding
      .set({
        title: title,
        image: fileUrl,
        sumview: sumview,
        giveday: giveday,
        explanation: explanation,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        createdBy: Userlist.Name,
        titleID: UUID,
      })
      .then(() => {
        router.replace("/");
      });
  };
  //fileupload
  const [selectedFile, setSelectedFile] = useState("");
  const [preview, setPreview] = useState("");
  const [fileUrl, setFileUrl] = React.useState(null);
  const fileId = uuidv4();
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
    <>
      <Layout />
      <Body>
        <Header>
          <Link href="/">
            <Header__logo>Harvest</Header__logo>
          </Link>
          <Header__button>
            <Link href="/">
              <Header__button__noselect>応援する</Header__button__noselect>
            </Link>
            <Link href="./support">
              <Header__button__noselect>支援中</Header__button__noselect>
            </Link>
            <Link href="./setting">
              <Header__button__select>支援してもらう</Header__button__select>
            </Link>
          </Header__button>
          <Header__login>
            <Link href="../signIn">
              <AccountCircle style={{ fontSize: "40px" }} />
            </Link>
          </Header__login>
        </Header>
        <Main>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Setting>
              <Setting__image>
                {selectedFile && (
                  <img
                    src={preview}
                    style={{ width: "100%", height: "100%", zIndex: 0 }}
                  />
                )}
              </Setting__image>
              <Setting__file>
                <label htmlFor="image">
                  <Setting__file__images>
                    <PhotoIcon style={{ verticalAlign: "middle" }} />
                    サムネイルを投稿する
                  </Setting__file__images>
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
            </Setting>
            <Fand>
              <Fand__title
                type="text"
                size="56"
                name="title"
                inputRef={register({ required: true })}
                onChange={(e) => settitle(e.target.value)}
                placeholder="タイトルを入力してください"
                required
              />
              <Fand__goal>
                <h4>
                  目標視聴数(千単位)
                  <br />
                  <input
                    type="number"
                    max="10000"
                    min="1"
                    name="sumview"
                    inputRef={register({ required: true })}
                    onChange={(e) => setsumview(e.target.value)}
                    required
                  />
                  k
                </h4>
                <h4>
                  募集日数（日）
                  <br />
                  <input
                    type="number"
                    max="14"
                    min="1"
                    name="giveweek"
                    inputRef={register({ required: true })}
                    onChange={(e) => setgiveday(e.target.value)}
                    required
                  />
                  days
                </h4>
                <h4>
                  <FacebookIcon size={45} round />
                  <TwitterIcon size={45} round />
                </h4>
              </Fand__goal>
            </Fand>
            <Message>
              <Message__list>
                <Message__icon src="../static/pics2.jpg" />
              </Message__list>
              <Message__text>
                <Message__text__lay
                  name="explanation"
                  cols="80"
                  rows="20"
                  nputRef={register({ required: true })}
                  onChange={(e) => setexplanation(e.target.value)}
                  required
                  placeholder="説明文を書いてください(1200文字以下)"
                />
              </Message__text>
            </Message>
            <Button>
              <Button__desition placeholder="投稿する" type="submit" />
            </Button>
          </form>
        </Main>
        <Aside>
          <Advertisement src="../static/pics2.jpg" />
        </Aside>
      </Body>
    </>
  );
};

export default setting;

const Body = styled.body`
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  display: grid;
  grid-template:
    "...... ...... ...... ...... ......"
    "header header header header header"
    "...... ...... ...... ...... ......"
    "center center center ...... right " 100%
    "...... ...... ...... ...... ......"
    / 20% auto 1fr auto 24%;
`;
const Header = styled.header`
  grid-area: header;
  display: flex;
  flex: auto;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 16px 0 0 4%;
  text-align: center;
  font-weight: 300;
  background-color: #fff;
  color: #434a54;
  border-bottom: 1px solid #e3e4e8;
`;
const Main = styled.main`
  grid-area: center;
  margin: 2%;
`;
const Aside = styled.aside`
  grid-area: right;
  background-color: #f5f5f5;
`;
const Header__logo = styled.a`
  font-size: 30px;
`;
const Header__login = styled.a`
  width: 160px;
`;
const Header__button = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;
const Header__button__noselect = styled.a`
  width: 140px;
  font-size: 18px;
  padding: 17px;
  line-height: 16px;
  border: 1px solid #e3e4e8;
  border-bottom: none;
  color: #434a54;
  &:hover {
    background-color: #434a54;
    color: #fff;
    opacity: 0.8;
  }
  &:target {
    background-color: #434a54;
    color: #fff;
  }
`;
const Header__button__select = styled.a`
  background-color: #434a54;
  color: #fff;
  opacity: 0.8;
  width: 140px;
  font-size: 18px;
  padding: 17px;
  line-height: 15px;
  border-bottom: none;
  border: 1px solid #e3e4e8;
`;
const Setting = styled.div`
  border: 1px solid #e3e4e8;
  width: 100%;
  height: 560px;
  text-align: center;
  margin-bottom: 30px;
`;
const Setting__file = styled.div`
  z-index: 1;
  height: 560px;
  width: 100%;
  opacity: 0;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  &:hover {
    background-color: rgb(104, 103, 103);
    opacity: 0.7;
  }
`;
const Setting__file__images = styled.span`
  font-size: 16px;
  color: whitesmoke;
  height: 200px;
  margin: auto;
  opacity: 1;
  line-height: 570px;
  &:hover {
    color: whitesmoke;
    opacity: 0.7;
  }
`;
const Filesend = styled.input`
  display: none;
`;
const Setting__image = styled.div`
  position: absolute;
  object-fit: contain;
  width: 72%;
  height: 560px;
`;
const Fand = styled.div`
  display: flex;
  flex-direction: column;
  height: 140px;
  color: rgba(0, 0, 0, 84);
  border-bottom: 1px solid #e3e4e8;
`;
const Fand__title = styled.input`
  border: solid 2px #d3d3d3;
  margin-bottom: 2%;
  font-size: 24px;
  height: 40px;
  width: 100%;
  border-radius: 10px;
`;
const Fand__goal__shere__icon = styled.img`
  height: 40px;
  width: 40px;
  margin-right: 6px;
  border-radius: 50%;
`;
const Message = styled.div`
  padding-top: 10%;
  padding-bottom: 5%;
  display: flex;
  justify-content: space-around;
`;
const Message__list = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
`;
const Fand__goal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  > .h4 {
    margin-left: 20px;
    color: red;
  }
`;
const Message__text__lay = styled.textarea`
  position: relative;
  width: 84%;
  margin: 0 auto 40px;
  padding: 20px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  resize: none;
  outline: none;
`;
const Message__text = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
`;
const Message__icon = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;
const fand__explanation = styled.div`
  width: 100%;
`;
const yourname = styled.div`
  margin-top: 40px;
`;
const Button = styled.div`
  height: 190px;
  text-align: center;
`;
const Button__desition = styled.input`
  background-color: tomato;
  color: white;
  width: 160px;
  height: 50px;
  border-radius: 30px;
  border-style: none;
  font-size: 20px;
  text-align: center;
`;
const Advertisement = styled.img`
  height: 240px;
  object-fit: fill;
  padding-top: 20px;
  width: 100%;
  border-bottom: 1px solid #d3d3d3;
`;
