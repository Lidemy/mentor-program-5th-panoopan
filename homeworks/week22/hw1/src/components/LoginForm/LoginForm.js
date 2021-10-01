import styled from "styled-components";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import React, { memo } from "react";

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 80px;
`;

const Title = styled.div`
  text-align: center;
  font-size: 40px;
  color: #ff8100;
`;

const Subtitle = styled.div`
  text-align: center;
  font-size: 16px;
  margin: 20px 0;
`;

const Form = styled.form`
  border: solid 1px #ff8100;
  padding: 20px 40px 60px 40px;
  width: 300px;
  margin: 30px auto;
  text-align: center;
  font-size: 18px;
`;

const Input = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 5px;
  margin: 16px 0;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 12px;
`;

const Button = styled.button`
  padding: 10px;
  background: #ff8100;
  color: white;
  border: solid 1px #ff8100;
  cursor: pointer;
  float: right;
  width: 100%;

  &:hover {
    background: #ff8100;
  }

  & + & {
    margin-left: 5px;
  }
`;

function LoginForm({ state, handle }) {
  const location = useLocation();

  return (
    <Container>
      <Title>{location.pathname === "/register" ? "Sign Up" : "Login"}</Title>
      <Subtitle>
        For testing, the password is set as default value 'Lidemy'.
      </Subtitle>

      <Form onSubmit={handle.handleSubmit}>
        {location.pathname === "/register" && (
          <div>
            Nickname
            <Input
              type="text"
              value={state.nickname}
              onChange={handle.handleNicknameInput}
            />
          </div>
        )}

        <div>
          Username
          <Input
            type="text"
            value={state.username}
            onChange={handle.handleUsernameInput}
          />
        </div>
        <div>
          Password
          <Input
            type="password"
            value={state.password}
            onChange={handle.handlePasswordInput}
          />
        </div>
        <ErrorMessage>{state.errorMessage}</ErrorMessage>
        <Button>submit</Button>
      </Form>
    </Container>
  );
}

LoginForm.propTypes = {
  state: PropTypes.object,
  handle: PropTypes.object,
};

export default memo(LoginForm);
