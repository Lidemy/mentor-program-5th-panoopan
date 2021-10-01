import LoginForm from "../../components/LoginForm";
import useUsers from "../../customHooks/useUsers";

function LoginPage() {
  const {
    username,
    password,
    errorMessage,

    handleSubmit,
    handleUsernameInput,
    handlePasswordInput,
  } = useUsers();

  const state = { username, password, errorMessage };
  const handle = { handleSubmit, handleUsernameInput, handlePasswordInput };

  return <LoginForm state={state} handle={handle} />;
}

export default LoginPage;
