import Link from "next/link";
import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import styled from "styled-components";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { parseISO, format } from "date-fns";
import ja from "date-fns/locale/ja";
import firebaseClient from "../../firebaseClient";
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
const storage = firebase.storage();

export async function getServerSideProps({ params }) {
  return { props: { params } };
}

const Content = ({ params }) => {
  const [FandContent, setFandContent] = useState("");
  const [Count, setCount] = useState("");
  useEffect(() => {
    const fetchFands = async () => {
      await firestore
        .collection("Fanding")
        .doc(params.Content)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            setFandContent(doc.data());
          } else {
            console.log("No such document!");
          }
        });
    };
    fetchFands();
  }, []);

  //カウント機能
  const onSubmit = () => {
    firestore
      .collection("Fanding")
      .doc(params.Content)
      .update({
        NowView: FandContent.NowView + 1,
      });
  };

  return (
    <>
      <Layout />
      <Body>
        <Header>
          <Headers>
            <Link href="/">
              <Header__logo>Harvest</Header__logo>
            </Link>
            <Header__button>
              <Link href="/">
                <Header__button__select>応援する</Header__button__select>
              </Link>
              <Link href="../support">
                <Header__button__noselect>支援中</Header__button__noselect>
              </Link>
              <Link href="../setting">
                <Header__button__noselect>
                  支援してもらう
                </Header__button__noselect>
              </Link>
            </Header__button>
            <Header__login>
              <Link href="../signIn">
                <AccountCircle style={{ fontSize: "40px" }} />
              </Link>
            </Header__login>
          </Headers>
        </Header>
        <Main>
          <Setting>
            <Setting__image src={FandContent.image} />
          </Setting>
          <Fand>
            <Fand__title>{FandContent.title}</Fand__title>
            <Fand__goal>
              <Fand__goal__view>
                目標視聴数(k)：{FandContent.sumview}回<br />
                <Fand__goal__view__number />
                視聴回数:k回
              </Fand__goal__view>
              <Fand__goal__view>
                日数:{FandContent.giveday}日<br />
                <Fand__goal__view__number />
                公開日
              </Fand__goal__view>
              <Fand__goal__shere>
                <FacebookShareButton
                  url={[
                    "https://www.typescriptlang.org/docs/handbook/asp-net-core.html",
                  ]}
                  title={[FandContent.title]}
                >
                  <FacebookIcon size={45} round />
                </FacebookShareButton>
                <TwitterShareButton
                  url={[
                    "https://www.typescriptlang.org/docs/handbook/asp-net-core.html",
                  ]}
                  title={[FandContent.title]}
                >
                  <TwitterIcon size={45} round />
                </TwitterShareButton>
              </Fand__goal__shere>
            </Fand__goal>
          </Fand>
          <Message>
            <Message__list>
              <Message__icon src="../static/pics2.jpg" />
            </Message__list>
            <Message__text>
              <Message__text__layout>
                {FandContent.explanation}
              </Message__text__layout>
            </Message__text>
          </Message>
          <Button>
            <form onSubmit={onSubmit}>
              <Button__desition type="submit" placeholder="支援する" />
            </form>
          </Button>
        </Main>
        <Aside>
          <Advertisement src="../static/pics2.jpg" />
        </Aside>
      </Body>
    </>
  );
};

export default Content;

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
`;
const Headers = styled.div`
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
const Header__logo = styled.div`
  font-size: 30px;
`;
const Header__login = styled.div`
  width: 160px;
`;
const Header__login__icon = styled.div`
  color: #434a54;
  &:hover {
    color: red;
  }
`;
const Header__button = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;
const Header__button__noselect = styled.div`
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
const Header__button__select = styled.div`
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
const Main = styled.main`
  grid-area: center;
  margin: 2%;
`;
const Nav = styled.nav`
  grid-area: left;
  background-color: #f5f5f5;
`;
const Aside = styled.aside`
  grid-area: right;
  background-color: #f5f5f5;
`;
const Setting = styled.div`
  width: 100%;
  height: 590px;
  text-align: center;
`;
const Setting__image = styled.img`
  position: relative;
  height: 590px;
  width: 100%;
`;
const Fand = styled.div`
  display: flex;
  flex-direction: column;
  height: 180px;
  color: rgba(0, 0, 0, 84);
  border-bottom: 1px solid #e3e4e8;
`;
const Fand__title = styled.div`
  margin-top: 3%;
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
`;
const Fand__goal__view = styled.h4`
  margin-left: 20px;
`;
const Fand__goal__shere = styled.h4`
  color: black;
`;
const Fand__goal__view__number = styled.div`
  color: black;
`;
const Message__text__layout = styled.div`
  position: relative;
  width: 84%;
  height: 260px;
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
