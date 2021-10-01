import styled from "styled-components";
import useGetPost from "../../customHooks/useGetPosts";
import { useHistory } from "react-router-dom";

const Root = styled.div``;

const PostContainer = styled.div`
  width: 50%;
  margin: 100px auto;

  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;

const PostTop = styled.div`
  border-bottom: 1px solid #ff8100;
  text-align: left;
`;

const PostTitle = styled.div`
  font-size: 24px;
  white-space: pre-wrap;
  word-break: break-all;
  color: #ff8100;
`;

const PostInfo = styled.div`
  margin-top: 12px;
`;

const PostBody = styled.div`
  font-size: 18px;
  margin-top: 30px;
  max-height: 60vh;
  white-space: pre-line;
  overflow: scroll;
  word-break: break-all;
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

function PostPage() {
  const { post } = useGetPost();
  const history = useHistory();

  return (
    <Root>
      <PostContainer>
        <PostTop>
          <PostTitle>{post.title}</PostTitle>
          <PostInfo>
            {new Date(post.createdAt).toLocaleString("en", { hour12: false })}
          </PostInfo>
        </PostTop>
        <PostBody>{post.body}</PostBody>
        <Button
          onClick={() => {
            history.goBack();
          }}
        >
          Back
        </Button>
      </PostContainer>
    </Root>
  );
}

export default PostPage;
