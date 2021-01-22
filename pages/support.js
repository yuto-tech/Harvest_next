import Link from 'next/link'
import Image from 'next/image'
import React, { Component } from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import Header from '../components/Header';
import firebaseClient from '../firebaseClient';
import firebase from "firebase/app"
import "firebase/firestore";
import "firebase/auth";
import 'firebase/storage';
import 'firebase/app';


export default () => (<>
  <Layout/>
  <Body> 
    <Headers>
      <Header/>
    </Headers>
    <Nav>
      <User>
        <User__icon>
          <User__icon__change><Image src={`/static/pics2.jpg`} width={120}height={120}/></User__icon__change>
          <User__icon__send type="file" name="file" id="filesend" required />
          <User__icon__desition type="submit" value="更新" />
        </User__icon>
        <User__name></User__name>
        <User__text>
          <User__text__sum>合計</User__text__sum>
          <User__text__list>ランク<br/>支援回数</User__text__list>
          <User__text__rank>１位<br/>100,000回</User__text__rank>
        </User__text>
        <User__weekly>
          <User__text__sum>今月</User__text__sum>
          <User__text__list>ランク<br/>支援回数</User__text__list>
          <User__text__rank>１位<br/>100,000回</User__text__rank>
        </User__weekly>
      </User>
      <Advertisement><Image src={`/static/pics2.jpg`} height={240} width={360}/></Advertisement>
    </Nav>
    <Main>
      <History__wrapper>
      <Link href={"./setting"}>
        <History__slide>
        <History__img><Image src={`/static/pics2.jpg`} height={240} width={360}/></History__img>
          <History__box>
            <h3>タイトルを入力してください</h3>
            <History__top>
              <Image src={`/static/pics2.jpg`} height={50} width={50} style={{borderRadius:'50px'}}/> 
                <History__bottom>
                  <p>yuto-tech</p>
                  <p>1000回/公開日 2020/09/23</p>
                </History__bottom>
            </History__top> 
            <History__ex>
              猫だってパンケーキ食べたいに決まっている。私はパンケーキが大好き。<br/>
              そして愛猫のポムのことも大好き。ポムが美味しく食べれるパンケーキを作りたい！
            </History__ex>
          </History__box>
        </History__slide>
      </Link>
      </History__wrapper>
    </Main>
  </Body>
</>)


const Body = styled.body`
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  display: grid;
  color: #030303;
  grid-template:
      "...... ...... ...... ...... ......"
      "header header header header header" 
      "...... ...... ...... ...... ......" 
      "left   ...... center center center" 100%
      "...... ...... ...... ...... ......" 
      /  22% auto 1fr auto 24% ;
`
const Headers = styled.header`
  grid-area: header;
`
const Main = styled.main `
  grid-area: center;
  margin: 20px;
`
const Nav = styled.nav`
  grid-area: left;
  align-items: center;
  padding-top: 20px;
  padding-left: 20px;
`
const User = styled.div`
  width: 90%;
  height: 400px;
  background-color: #f6f8fa;
  border: 1px solid #dfdddb;
  display: flex;
  flex-direction: column;
  padding: 10px;
`
const User__icon = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
`
const User__icon__change = styled.div`
  border-radius: 50%;
  margin-top: 10px;
  border: 1px solid #dfdddb;
  display: flex;
  flex-direction: column;
`
const User__icon__send = styled.input`
  display: none;
`
const User__icon__desition = styled.input`
  background-color: #434a54;
  color: white;
  border-radius: 8px;
  border-style: none;
  width: 40px;
`
const User__name = styled.div`
  text-align: center;
  font-size: 20px;
`
const User__text = styled.div`
  margin-top: 10px;
  height: 100px;
`
const User__text__sum = styled.h4`
  border-bottom: 1px solid #e3e4e8;
  display: block;
  width: 180px;
  margin: auto;
  display:flex;
  justify-content: center;
`
const User__text__list = styled.div`
  display:flex;
  justify-content: space-around;
  width: 180px;
  margin-top: 4px;
`
const User__text__rank = styled.h3`
  display:flex;
  justify-content: space-around;
  margin-top: 6px;
`
const User__weekly = styled.div`
  margin-top: 20px;
`
const Advertisement = styled.div`
  padding-top: 40px;
`
const History__wrapper = styled.div`
  padding-top: 20px;
`
const History__img = styled.div`
  padding-right: 1%;
`
const History__box = styled.div`
  display:flex;
  flex-direction: column;
  margin-top: 14px;
`
const History__top = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-top: 10px;
`
const History__bottom = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  padding-left: 10px;
`
const History__ex = styled.div`
  padding-top: 20px;
  font-size: 16px;
  width: 100%;
  height: 140px;
`
const History__slide = styled.a`
  font-size: 18px;
  padding-bottom: 10px;
  height: 240px;
  background: #fff;
  display: flex;
  color: #030303;
`