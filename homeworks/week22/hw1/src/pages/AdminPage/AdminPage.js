import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { getAdminPosts } from "../../WebAPI";
import { AuthContext } from "../../context";
import Post from "../../components/Post";
import { checkLogin } from "../../utils";

const Root = styled.div``;

const PostList = styled.div`
  width: 60%;
  margin: 30px auto;
  max-height: 80vh;
  overflow: scroll;

  @media screen and (max-width: 768px) {
    margin: 100px auto;
    width: 80%;
  }
`;

function AdminPage() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (checkLogin(user)) {
      getAdminPosts(user).then((posts) => {
        setPosts(posts);
      });
    } else {
      history.push("/");
    }
  }, [user, posts, history]);

  return (
    <Root>
      <PostList>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </PostList>
    </Root>
  );
}

export default AdminPage;
