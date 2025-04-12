import AuthInputs from "../../components/auth/AuthInputs";
import "./style.css";

function Login() {
    return (
        <div className="signup-container">
            <div className="left-section">
                <div className="left-section-content">
                    <img src="images/tutor-hunter-logo.png" className="logo" alt="logo" />
                    <h1 className="signup-head">Welcome Back</h1>
                    <p className="signup-text">Glad to see you again – Log in to your account</p>

                    <AuthInputs></AuthInputs>

                    <button type="submit" className="submit">Login</button>
                    <p className="bottom-text">Don't have an account? <b>Sign up</b></p>
                </div>
            </div>
            <div className="right-section">
                <img src="images/auth-image.png" className="auth-image" alt="" />
            </div>
        </div>
    )
}

export default Login;