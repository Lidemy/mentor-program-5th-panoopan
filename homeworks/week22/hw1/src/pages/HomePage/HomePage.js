import { useContext } from "react";
import styled from "styled-components";
import Post from "../../components/Post";
import Paginator from "../../components/Paginator";
import useGetPost from "../../customHooks/useGetPosts";
import usePaginate from "../../customHooks/usePaginate";
import { PageContext } from "../../context";

const Root = styled.div``;

const PostList = styled.div`
  width: 60%;
  margin: 60px auto;
  max-height: 80vh;
  overflow: scroll;

  @media screen and (max-width: 768px) {
    margin: 100px auto 60px auto;
    width: 80%;
  }
`;

function HomePage() {
  const { posts } = useGetPost();
  const { handleButtonClick } = usePaginate();
  const { page } = useContext(PageContext);

  return (
    <Root>
      <PostList>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </PostList>
      <Paginator page={page} handleButtonClick={handleButtonClick} />
    </Root>
  );
}

export default HomePage;
