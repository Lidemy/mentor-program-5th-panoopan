import styled from "styled-components";
import PropTypes from "prop-types";
import { Link, useHistory, useLocation } from "react-router-dom";
import { deletePost } from "../../WebAPI";
import React, { memo } from "react";

const Container = styled.div`
  border-bottom: 1px solid #ff8100;
  padding: 16px;
  display: flex;
  justify-content: space-between;

  div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
  }

  &:hover {
    background: #ff81003b;
  }
`;

const Wrapper = styled.div``;

const Title = styled(Link)`
  font-size: 22px;
  color: white;
  text-decoration: none;
`;

const Info = styled.div`
  margin-top: 12px;
  font-size: 16px;
`;

const AuthorLink = styled(Link)`
  color: #ff8100;
  font-size: 18px;
`;

const ButtonWrapper = styled.div`
  flex-shrink: 0;
`;

const Button = styled.button`
  padding: 8px 4px;
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

function Post({ post }) {
  const history = useHistory();
  const location = useLocation();
  return (
    <Container>
      <Wrapper>
        <Title to={`/post/${post.id}`}>{post.title}</Title>
        <Info>
          posted by{"   "}
          <AuthorLink to={`/author/${post.user.id}`}>
            {post.user.nickname}
          </AuthorLink>
          {"   "}|{" "}
          {new Date(post.createdAt).toLocaleString("en", { hour12: false })}
        </Info>
      </Wrapper>
      {location.pathname === "/admin" && (
        <ButtonWrapper>
          <Button
            onClick={() => {
              deletePost(post.id);
            }}
          >
            Delete
          </Button>{" "}
          <Button
            onClick={() => {
              history.push(`/edit-post/${post.id}`);
            }}
          >
            Edit
          </Button>
        </ButtonWrapper>
      )}
    </Container>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default memo(Post);
