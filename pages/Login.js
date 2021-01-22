import React, { useContext } from "react";
import styled from "styled-components";
import Form, { MainForm } from "../Components/Form";

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handlelogin,
    handleSignup,
    hasAccount,
    sethasAccount,
    emailError,
    passwordError,
  } = useContext(MainForm);

  return (
    <Form>
      <LoginContainer>
        <label>名前</label>
        <input
          type="text"
          required
          defaultValue={email}
          onClick={(e) => setEmail(e.target.defaultValue)}
        />
        <ErrorMsg>{emailError}</ErrorMsg>
        <label>パスワード</label>
        <input
          type="text"
          required
          defaultValue={password}
          onClick={(e) => setPassword(e.target.defaultValue)}
        />
        <ErrorMsg>{passwordError}</ErrorMsg>
        <BtnContainer>
          {hasAccount ? (
            <>
              <Button onClick={handlelogin}>ログイン</Button>
              <p>
                アカウントを持ってませんか?
                <span onClick={sethasAccount}>新規会員登録</span>
              </p>
            </>
          ) : (
            <>
              <Button onClick={handleSignup}>新規会員登録</Button>
              <p>
                アカウントを持っていますか？
                <span onClick={sethasAccount}>ログイン</span>
              </p>
            </>
          )}
        </BtnContainer>
      </LoginContainer>
    </Form>
  );
};

export default Login;

const Button = styled.button`
  border: none;
  outline: none;
  width: 100%;
  padding: 15px 0;
  color: #fff;
  font-size: 16px;
  letter-spacing: 1px;
  background: #603bbb;
  cursor: pointer;
`;

const Logins = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 0 20px;
  background: #e9e9e9;
  display: flex;
`;

const LoginContainer = styled.div`
  padding: 60px;
  margin: auto;
  width: 100%;
  max-width: 520px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: radial-gradient(
    ellipse at left bottom,
    rgba(22, 24, 47, 1) 0%,
    rgba(38, 20, 72, 0.9) 59%,
    rgba(17, 27, 75, 0.9) 100%
  );
  box-shadow: 0 50px 70px -20px rgba(0, 0, 0, 0.8);
  label {
    color: white;
    margin: 14px 0;
    display: block;
    font-size: 22px;
    line-height: 1;
  }
  input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 19px;
    padding: 10px;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    letter-spacing: 1px;
  }
`;

const BtnContainer = styled.div`
  width: 100%;
  padding: 24px 0;
  p {
    margin: 14px 0 0 0;
    text-align: right;
    color: #fff;
    &:hover {
      color: red;
    }
  }
  span {
    color: yellow;
    font-weight: 500;
    letter-spacing: 0.5px;
    margin-left: 5px;
    cursor: pointer;
    transition: all 400ms ease-in-out;
    &:hover {
      color: red;
    }
  }
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 16px;
`;
