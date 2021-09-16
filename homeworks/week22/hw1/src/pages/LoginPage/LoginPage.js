import { useState, useContext, useCallback } from "react";
import { login, getMe } from "../../WebAPI";
import { setAuthToken } from "../../utils";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context";
import LoginForm from "../../components/LoginForm";

function LoginPage() {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("Lidemy");
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMessage(null);

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    login(username, password).then((data) => {
      setIsLoading(false);
      if (data.ok === 0) {
        return setErrorMessage(data.message);
      }

      setAuthToken(data.token);

      getMe().then((response) => {
        if (response.ok !== 1) {
          setAuthToken(null);
          return setErrorMessage(response.message);
        }
        setUser(response.data);
        history.push("/");
      });
    });
  };

  const handleUsernameInput = useCallback((e) => {
    setUsername(e.target.value);
  }, []);

  const handlePasswordInput = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const state = { username, password, errorMessage };
  const handle = { handleSubmit, handleUsernameInput, handlePasswordInput };

  return <LoginForm state={state} handle={handle} />;
}

export default LoginPage;
