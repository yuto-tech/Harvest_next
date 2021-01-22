import Link from "next/link";
import Header from "../components/Header";
import SingleLineGridList from "../components/Slider";
import SearchIcon from "@material-ui/icons/Search";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import { parseISO, format } from "date-fns";
import ja from "date-fns/locale/ja";
import firebaseClient from "../firebaseClient";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/app";

//firebase初期化
firebaseClient();
//firestore初期化
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

const Index = () => {
  const [Fanded, setFanded] = useState([]);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        Router.push("/");
      }
    });
  }, [auth.currentUser]);
  useEffect(() => {
    const fetchFands = async () => {
      const usersCollection = await firestore.collectionGroup("Fanding").get();
      setFanded(
        usersCollection.docs.map((doc) => {
          return doc.data();
        })
      );
    };
    fetchFands();
  }, []);

  return (
    <>
      <Layout />
      <Header />
      <Container>
        <Side>
          <Nav>
            <Genre__top method="POST">
              <SearchIcon style={{ verticalAlign: "middle" }} />
              検索
              <Genre__seach
                type="search"
                id="search"
                placeholder="キーワードを入力"
              />
            </Genre__top>
            <Genre__bottom>ジャンルで検索</Genre__bottom>
            <Genre__list>
              <Genre__list__option>社会貢献</Genre__list__option>
              <Genre__list__option>病気</Genre__list__option>
              <Genre__list__option>エンタメ</Genre__list__option>
              <Genre__list__option>ビジネス</Genre__list__option>
              <Genre__list__option>その他</Genre__list__option>
            </Genre__list>
          </Nav>
        </Side>
        <Main>
          <SingleLineGridList />
          <Boxes>
            {Fanded.map((fand) => {
              console.log(Fanded);
              return (
                <Link
                  as={`/posts/${fand.titleID}`}
                  href="/posts/[Content]"
                  key={fand.titleID}
                >
                  <Box>
                    <Box__thumbnail src={fand.image} />
                    <Box__separate>
                      <Box__separate__left>
                        <Box__separate__left__icon src="./static/pics2.jpg" />
                      </Box__separate__left>
                      <Box__separate__right>
                        <Box__separate__right__title>
                          {fand.title}
                        </Box__separate__right__title>
                        <Box__separate__right__username>
                          {fand.createdBy}
                        </Box__separate__right__username>
                        支援 1000 回/公開日{" "}
                        {format(fand.createdAt.seconds * 1000, "LLLLdo", {
                          locale: ja,
                        })}
                      </Box__separate__right>
                    </Box__separate>
                  </Box>
                </Link>
              );
            })}
          </Boxes>
        </Main>
      </Container>
    </>
  );
};

export default Index;

const Side = styled.aside`
  height: auto;
  padding: 30px 10px 0px 10px;
  width: 18%;
`;
const Nav = styled.nav`
  padding-left: 10px;
`;

const Genre__top = styled.form`
  color: #434a54;
`;
const Genre__bottom = styled.div`
  color: #434a54;
`;

const Genre__list = styled.div`
  border: 1px solid #e3e4e8;
`;
const Genre__seach = styled.input`
  color: red;
  font-size: 16px;
  border: 1px solid #e3e4e8;
  margin-bottom: 20px;
  color: #434a54;
  height: 40px;
  padding: 10px 10px;
  font-size: 20px;
  line-height: 36px;
  display: block;
  border-radius: 14px;
  &:hover {
    color: red;
    background-color: rgb(239, 239, 239);
    opacity: 0const 8;
  }
`;
const Genre__list__option = styled.a`
  display: block;
  color: #434a54;
  font-size: 18px;
  height: 40px;
  line-height: 36px;
  padding-left: 10px;
  &:hover {
    color: red;
    background-color: rgb(239, 239, 239);
    opacity: 0.8;
  }
`;
const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
`;
const Main = styled.main`
  flex: auto;
  height: auto;
  flex: 6;
  border: 1px solid #e3e4e8;
  border-top: none;
  border-right: none;
  border-left: none;
  width: 80%;
`;
const Boxes = styled.div`
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
`;
const Box = styled.a`
  width: 32%;
  height: 340px;
  color: black;
  margin-top: 10px;
`;
const Box__thumbnail = styled.img`
  display: flex;
  flex-direction: column;
  height: 65%;
  object-fit: cover;
  width: 100%;
`;
const Box__separate = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const Box__separate__left = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  width: 110px;
`;
const Box__separate__left__icon = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 10px;
`;
const Box__separate__right = styled.div`
  display: flex;
  flex-direction: column;
  width: 260px;
  font-size: 14px;
  margin-top: 14px;
`;
const Box__separate__right__title = styled.div`
  margin-top: 6px;
  font-size: 16px;
`;
const Box__separate__right__username = styled.div`
  margin-top: 6px;
`;
