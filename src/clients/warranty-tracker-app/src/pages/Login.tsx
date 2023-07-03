function Login() {
    return (
        <div id="login-page">
            <div>
                <h2>Login to proceed</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>

                    <button>Login</button>
                </form>
            </div>
        </div>)
}

export default Login;