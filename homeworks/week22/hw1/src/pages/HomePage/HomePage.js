import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { getPosts, countTotalPosts } from "../../WebAPI";
import Post from "../../components/Post";
import Paginator from "../../components/Paginator";

const Root = styled.div``;

const PostList = styled.div`
  width: 60%;
  margin: 60px auto;
  max-height: 80vh;
  overflow: scroll;

  @media screen and (max-width: 768px) {
    margin: 100px auto;
    width: 80%;
  }
`;

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();

  useEffect(() => {
    countTotalPosts().then((posts) => {
      const totalPost = Number(posts.length);
      setTotalPage(Math.ceil(totalPost / 5));
    });
  }, [posts]);

  useEffect(() => {
    getPosts(page).then((posts) => {
      setPosts(posts);
    });
  }, [page]);

  const handleButtonClick = useCallback(
    (button) => {
      if (button === "First") {
        return setPage(1);
      }

      if (button === "Prev" && page > 1) {
        return setPage(page - 1);
      }

      if (button === "Next" && page < totalPage) {
        return setPage(page + 1);
      }

      if (button === "Last") {
        return setPage(totalPage);
      }
    },
    [page, totalPage]
  );

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
