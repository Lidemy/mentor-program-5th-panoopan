import { useState, useContext, useEffect, useCallback } from "react";
import { editPost, getPost } from "../../WebAPI";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context";
import { useParams } from "react-router-dom";
import PostForm from "../../components/PostForm";
import { checkLogin } from "../../utils";

function EditPostPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (checkLogin(user)) {
      getPost(id).then((post) => {
        setTitle(post.title);
        setBody(post.body);
      });
    } else {
      history.push("/");
    }
  }, [id, history, user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMessage(null);

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    editPost(id, title, body).then((data) => {
      setIsLoading(false);
      if (data.ok === 0) {
        return setErrorMessage(data.message);
      }

      history.push("/admin");
    });
  };

  const handleTitleInput = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const handleBodyInput = useCallback((e) => {
    setBody(e.target.value);
  }, []);

  const state = { title, body, errorMessage };
  const handle = { handleSubmit, handleTitleInput, handleBodyInput };

  return <PostForm state={state} handle={handle} />;
}

export default EditPostPage;
