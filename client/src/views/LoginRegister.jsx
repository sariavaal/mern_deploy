import UserForm from "../components/FormComponent";

const LoginRegister = () => {
    return (
        <div className="container mt-">
            <h1 className="text-center"> Welcome to Pirate Crew</h1>
            <hr />
            <div className="row">
                <div className="col-6">
                    <h3>Login</h3>
                    <UserForm formType="login" />
                </div>
                <div className="col-6">
                    <h3>Register</h3>
                    <UserForm formType="register" />
                </div>
            </div>
        </div>
    )
}

export default LoginRegister