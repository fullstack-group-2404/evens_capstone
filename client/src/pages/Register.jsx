import { Link } from "react-router-dom";
import AuthForm from "../components/AuthForm/AuthForm";

const Register = ({ auth, authAction}) => {
  return (
    <div>
      <h1>Register for Business Reviews!</h1>
      {!auth.id ? (
        <>
          <AuthForm authAction={authAction} mode="register" />
        </>
      ) : null}


    </div>

  );

}

export default Register;