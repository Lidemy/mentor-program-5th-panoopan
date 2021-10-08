import styled from "styled-components";
import Post from "../../components/Post";
import useGetPost from "../../customHooks/useGetPosts";

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
  const { posts } = useGetPost();

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
