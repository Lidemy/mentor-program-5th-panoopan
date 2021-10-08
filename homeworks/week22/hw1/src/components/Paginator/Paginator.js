import styled from "styled-components";
import PropTypes from "prop-types";
import React, { memo } from "react";

const Container = styled.div`
  text-align: center;
`;

const Button = styled.button`
  padding: 12px;
  background: transparent;
  color: white;
  border: solid 1px #ff8100;
  cursor: pointer;

  &:hover {
    background: #ff8100;
  }

  & + & {
    margin-left: 5px;
  }
`;

const Page = styled.div`
  display: inline-block;
  margin: 0 20px;
  background: #ff8100;
  width: 25px;
  height: 25px;
  text-align: center;
  border-radius: 50%;
  color: white;
`;

function Paginator({ page, handleButtonClick }) {
  return (
    <Container>
      <Button
        onClick={() => {
          handleButtonClick("First");
        }}
      >
        First
      </Button>
      <Button
        onClick={() => {
          handleButtonClick("Prev");
        }}
      >
        Prev
      </Button>

      <Page>{page}</Page>

      <Button
        onClick={() => {
          handleButtonClick("Next");
        }}
      >
        Next
      </Button>
      <Button
        onClick={() => {
          handleButtonClick("Last");
        }}
      >
        Last
      </Button>
    </Container>
  );
}

Paginator.propTypes = {
  page: PropTypes.number,
  handleButtonClick: PropTypes.func,
};

export default memo(Paginator);
