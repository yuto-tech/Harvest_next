import Link from 'next/link'
import Layout from '../components/Layout';
import styled from 'styled-components';
import PhotoIcon from '@material-ui/icons/Photo';
import AccountCircle from '@material-ui/icons/AccountCircle';
import firebaseClient from '../firebaseClient';
import firebase from "firebase/app"
import "firebase/firestore";
import "firebase/auth";
import 'firebase/storage';
import 'firebase/app';

export default () =>(<>
  <Layout/>
    <Body>
      <Header>
      <Headers>
     <Link href="/"><Header__logo>Harvest</Header__logo></Link>
      <Header__button>
        <Link href="/"><Header__button__select>応援する</Header__button__select></Link>
        <Link href="./support"><Header__button__noselect>支援中</Header__button__noselect></Link>
        <Link href="./setting"><Header__button__noselect>支援してもらう</Header__button__noselect></Link>
      </Header__button>
      <Header__login>
        <Link href="../signIn">
        <AccountCircle style={{fontSize: '40px'}}/>
        </Link>
      </Header__login>
    </Headers>
      </Header>
    <Main>
    <Setting>
      <Setting__image/>
      <Setting__file>
        <Setting__file__images>
          <PhotoIcon style={{verticalAlign:"middle"}}/>サムネイルを投稿する
        </Setting__file__images>
      </Setting__file>
    </Setting>
    <Fand>
      <Fand__title type="text"size="56" name="title" placeholder="タイトルを入力してください" required/>
        <Fand__goal>
          <Fand__goal__view>目標視聴数(千単位)<br/>
          <Fand__goal__view__number type="number" max="10000" min="1" name="sumview" required/>k
          </Fand__goal__view>
          <Fand__goal__view>募集日数（日）<br/>
            <Fand__goal__view__number type="number" max="14" min="1" name="giveweek" required/>days
          </Fand__goal__view>
          <Fand__goal__shere>
            <Fand__goal__shere__icon src="../static/pics2.jpg" title="投稿後にシェアできます"/>
            <Fand__goal__shere__icon src="../static/pics2.jpg" title="投稿後にシェアできます"/>
          </Fand__goal__shere>
        </Fand__goal>
    </Fand>
    <Message>
      <Message__list>
        <Message__icon src="../static/pics2.jpg"/>
      </Message__list>
      <Message__text>
        <Message__text__layout name="explanation"  cols="80" rows="15" required placeholder="説明文を書いてください(1200文字以下)"/>
      </Message__text>
    </Message>
    <Button>
      <Button__desition placeholder="投稿する"/>
    </Button>
    </Main>
    <Aside>
      <Advertisement src="../static/pics2.jpg"/>
    </Aside>
    </Body>
</>)


const Body = styled.body `
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
      /  20% auto 1fr auto 24% ;
`
const Header = styled.header`
  grid-area: header;
`
const Headers= styled.div`
  display: flex;
  flex: auto;
  justify-content:space-between;
  flex-wrap: wrap;
  padding:16px 0 0 4%;
  text-align: center;
  font-weight: 300;
  background-color: #fff;
  color: #434a54;
  border-bottom: 1px solid #e3e4e8;
`
const Header__logo = styled.div`
  font-size: 30px;
`
const Header__login = styled.div`
  width:160px;
`
const Header__login__icon = styled.div`
  color: #434a54;
  &:hover{
    color: red;
  }
`
const Header__button = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`
const Header__button__noselect = styled.div`
  width:140px;
  font-size:18px;
  padding: 17px;
  line-height: 16px;
  border: 1px solid #e3e4e8;
  border-bottom: none;
  color: #434a54;
  &:hover{
    background-color: #434a54;
    color:#fff;
    opacity: 0.8;
  }
  &:target {
    background-color: #434a54;
    color:#fff;
  }
`
const Header__button__select = styled.div`
  background-color: #434a54;
  color:#fff;
  opacity: 0.8;
  width:140px;
  font-size:18px;
  padding: 17px;
  line-height: 15px;
  border-bottom: none;
  border: 1px solid #e3e4e8;
`
const Main = styled.main `
  grid-area: center;
  margin: 2%;
`
const Nav = styled.nav `
  grid-area: left;
  background-color:#f5f5f5;
`
const Aside = styled.aside `
  grid-area: right;
  background-color:#f5f5f5;
`
const Setting = styled.div`
  width: 100%;
  height: 590px;
  text-align:center;
`
const Setting__file = styled.div`
  height: 560px;
  opacity: 0;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  &:hover{
    background-color: rgb(104, 103, 103);
    opacity: 0.7;
  }
`
const Setting__file__images = styled.span`
  font-size: 16px;
  color: whitesmoke;
  height: 200px;
  margin: auto;
  opacity: 1;
  line-height: 570px;
  &:hover{
    color: whitesmoke;
  opacity: 0.7; 
  }
`
const filesend = styled.input`
  display: none;
`
const Setting__image = styled.img`
  z-index: 0;
  position: absolute;
  object-fit: contain;
  height: 560px;
`
const Fand = styled.div`
  display: flex;
  flex-direction: column;
  height: 140px;
  color: rgba(0, 0, 0, 84);
  border-bottom: 1px solid #e3e4e8;
`
const Fand__title = styled.input`
  border:solid 2px #d3d3d3;
  margin-bottom: 2% ;
  font-size: 24px;
  height: 40px;
  width: 100%;
  border-radius: 10px;
`
const Fand__goal__shere__icon = styled.img`
  height: 40px;
  width: 40px;
  margin-right: 6px;
  border-radius:50%;
`
const Message = styled.div`
  padding-top: 10%;
  padding-bottom: 5%;
  display: flex;
  justify-content: space-around;
`
const Message__list = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
`
const Fand__goal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`
const Fand__goal__view = styled.h3`
  margin-left: 20px;
`
const Fand__goal__shere = styled.h3`
color:black;
`
const Fand__goal__view__number = styled.input`
  color:black;
`
const Message__text__layout = styled.textarea`
  position: relative;
  width: 84%;
  margin: 0 auto 40px; 
  padding: 20px; 
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  resize: none;
  outline: none;
`
const Message__text = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
`
const Message__icon = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`
const fand__explanation = styled.div`
  width: 100%;
`
const yourname = styled.div`
  margin-top: 40px;
`
const Button = styled.div`
  height: 190px;
  text-align:center;
`
const Button__desition = styled.input`
  background-color: tomato;
  color: white;
  width: 160px;
  height: 50px;
  border-radius: 30px;
  border-style: none;
  font-size: 20px;
  text-align: center;
`
const Advertisement = styled.img`
  height: 240px;
  object-fit: fill;
  padding-top: 20px;
  width: 100%;
  border-bottom: 1px solid #d3d3d3;
`