import styled from "styled-components";
import PropTypes from "prop-types";
import React, { memo } from "react";

const Form = styled.form`
  border: solid 3px #ff8100;
  padding: 20px 40px 60px 40px;
  max-width: 600px;
  margin: 30px auto;
  font-size: 20px;

  @media screen and (max-width: 768px) {
    margin: 100px auto;
    overflow: hidden;
  }
`;

const Input = styled.input`
  margin-bottom: 12px;
  width: 100%;
  font-size: 16px;
  padding: 10px;
`;

const Content = styled.textarea`
  width: 100%;
  font-size: 16px;
  padding: 12px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 12px;
`;

const Button = styled.button`
  padding: 12px;
  background: #ff8100;
  color: white;
  border: solid 1px #ff8100;
  cursor: pointer;
  float: right;

  &:hover {
    background: #ff8100;
  }

  & + & {
    margin-left: 5px;
  }
`;

function PostForm({ state, handle }) {
  return (
    <Form onSubmit={handle.handleSubmit}>
      <div>
        Title:{" "}
        <Input
          type="text"
          value={state.title}
          onChange={handle.handleTitleInput}
        />
      </div>
      <div>
        Content:{" "}
        <Content
          rows="20"
          value={state.body}
          onChange={handle.handleBodyInput}
        />
      </div>
      <ErrorMessage>{state.errorMessage}</ErrorMessage>
      <Button>submit</Button>
    </Form>
  );
}

PostForm.propTypes = {
  state: PropTypes.object,
  handle: PropTypes.object,
};

export default memo(PostForm);
