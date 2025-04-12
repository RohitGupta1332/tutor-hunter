import AuthInputs from "../../components/auth/AuthInputs";
import "./style.css";

function SignUp() {
    return (
        <div className="signup-container">
            <div className="left-section">
                <div className="left-section-content">
                    <img src="images/tutor-hunter-logo.png" className="logo" alt="logo" />
                    <h1 className="signup-head">Get Started</h1>
                    <p className="signup-text">Welcomee to TutorHunter - Let's create your account</p>

                    <AuthInputs></AuthInputs>

                    <button type="submit" className="submit">Sign up</button>
                    <p className="bottom-text">Already have an account? <b>Log in</b></p>
                </div>
            </div>
            <div className="right-section">
                <img src="images/auth-image.png" className="auth-image" alt="" />
            </div>
        </div>
    )
}

export default SignUp;