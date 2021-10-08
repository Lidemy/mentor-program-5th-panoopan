import { useState, useEffect, useContext } from "react";
import { useRouteMatch, useHistory, useParams } from "react-router-dom";
import { getAdminPosts, getPosts, getUserPosts, getPost } from "../WebAPI";
import { AuthContext, PageContext } from "../context";
import { checkLogin } from "../utils";

function useGetPosts() {
  const [post, setPost] = useState([]);
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const { page } = useContext(PageContext);
  const history = useHistory();
  const match = useRouteMatch();
  const { id } = useParams();
  const [author, setAuthor] = useState();

  useEffect(() => {
    if (match.path === "/admin") {
      if (checkLogin(user)) {
        getAdminPosts(user).then((posts) => {
          setPosts(posts);
        });
      } else {
        history.push("/");
      }
    }
  }, [match, user, posts, history]);

  useEffect(() => {
    if (match.path === "/") {
      getPosts(page).then((posts) => {
        setPosts(posts);
      });
    }
  }, [match, page]);

  useEffect(() => {
    if (match.path === "/author/:id") {
      getUserPosts(id).then((posts) => {
        setPosts(posts);
        setAuthor(posts[0].user.nickname);
      });
    }
  }, [match, id]);

  useEffect(() => {
    if (match.path === "/post/:id") {
      getPost(id).then((data) => {
        setPost(data);
      });
    }
  }, [match, id]);

  return {
    post,
    posts,
    author,
  };
}

export default useGetPosts;
