import { Link } from "react-router-dom";
import AuthForm from "../components/AuthForm/AuthForm";

const Login = ({ auth, authAction, users }) => {
  return (
    <div className="center-home">
      <h1>Login or Register</h1>
      {!auth.id ? (
        <>
          <AuthForm authAction={authAction} mode="login" />
        </>
      ) : null}
      <><Link to="/Register">Don't Have an account? Register</Link></>
    </div>

  );

}

export default Login;