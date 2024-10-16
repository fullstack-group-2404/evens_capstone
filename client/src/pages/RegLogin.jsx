import AuthForm from "../components/AuthForm/AuthForm";

const RegLogin = ({auth, authAction, users}) => {
    return (
        <div>
            <h1>Login or Register</h1>
        

        <>
          <AuthForm authAction={authAction} mode="login" />
          <AuthForm authAction={authAction} mode="register" />
        </>


        </div>

    );

}

//changes made 


export default RegLogin;