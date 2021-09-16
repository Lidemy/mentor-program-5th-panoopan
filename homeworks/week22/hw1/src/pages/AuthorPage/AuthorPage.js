import { useState, useEffect } from "react";
import styled from "styled-components";
import { getUserPosts } from "../../WebAPI";
import { useParams } from "react-router-dom";
import Post from "../../components/Post";

const Root = styled.div``;

const PostList = styled.div`
  width: 60%;
  margin: 30px auto;
  max-height: 80vh;
  overflow: scroll;

  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;

const Title = styled.div`
  text-align: center;
  font-size: 28px;
  margin: 50px 0;

  span {
    font-weight: bold;
    color: #ff8100;
  }

  @media screen and (max-width: 768px) {
    margin: 100px 0 50px 0;
  }
`;

function AuthorPage() {
  let { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState();

  useEffect(() => {
    getUserPosts(id).then((posts) => {
      setPosts(posts);
      setAuthor(posts[0].user.nickname);
    });
  }, [id]);

  return (
    <Root>
      <Title>
        <span>{author}</span> 的所有文章
      </Title>
      <PostList>
        {posts
          .slice(0)
          .reverse()
          .map((post) => (
            <Post key={post.id} post={post} />
          ))}
      </PostList>
    </Root>
  );
}

export default AuthorPage;
