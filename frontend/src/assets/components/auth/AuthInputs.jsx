import "./AuthInput.css";

function AuthInputs(){
    return (
        <div className="auth-input-container">
            <div className="email-container">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="" />
            </div>
            <div className="password-container">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="" />
            </div>
        </div>
    )
}

export default AuthInputs;