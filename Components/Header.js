import React, { Component } from "react";
import Link from "next/link";
import AccountCircle from "@material-ui/icons/AccountCircle";
import styled from "styled-components";

const Header = () => {
  return (
    <Headers>
      <Link href="/">
        <Header__logo>Harvest</Header__logo>
      </Link>
      <Header__button>
        <Link href="/">
          <Header__button__select>応援する</Header__button__select>
        </Link>
        <Link href="#">
          <Header__button__noselect>支援中</Header__button__noselect>
        </Link>
        <Link href="./setting">
          <Header__button__noselect>支援してもらう</Header__button__noselect>
        </Link>
      </Header__button>
      <Header__login>
        <Link href="../signIn">
          <AccountCircle style={{ fontSize: "40px" }} />
        </Link>
      </Header__login>
    </Headers>
  );
};
export default Header;

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
