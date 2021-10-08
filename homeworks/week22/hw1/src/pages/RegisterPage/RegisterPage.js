import LoginForm from "../../components/LoginForm";
import useUsers from "../../customHooks/useUsers";

function RegisterPage() {
  const {
    nickname,
    username,
    password,
    errorMessage,

    handleSubmit,
    handleNicknameInput,
    handleUsernameInput,
    handlePasswordInput,
  } = useUsers();

  const state = { nickname, username, password, errorMessage };
  const handle = {
    handleSubmit,
    handleNicknameInput,
    handleUsernameInput,
    handlePasswordInput,
  };

  return <LoginForm state={state} handle={handle} />;
}

export default RegisterPage;
