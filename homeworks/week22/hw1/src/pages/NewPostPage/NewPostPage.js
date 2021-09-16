import { useState, useContext, useLayoutEffect, useCallback } from "react";
import { newPost } from "../../WebAPI";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context";
import PostForm from "../../components/PostForm";
import { checkLogin } from "../../utils";

function NewPostPage() {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useLayoutEffect(() => {
    if (!checkLogin(user)) {
      history.push("/");
    }
  }, [user, history]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMessage(null);

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    newPost(title, body).then((data) => {
      setIsLoading(false);
      if (data.ok === 0) {
        return setErrorMessage(data.message);
      }

      history.push("/");
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

export default NewPostPage;
