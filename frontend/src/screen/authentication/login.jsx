import React from 'react'
import { Link } from 'react-router-dom'


const Login = () => {
    return (
        <>
            <div className="flexCenter authContainer">
                <form method="post" className='flex' >
                    <h3>Login</h3>
                    <input type="text" name="email" placeholder='Enter your E-Mail' required />
                    <input type="password" name="password" placeholder='Enter your password' required />
                    <div className="flex handlers">
                        <input type="submit" value="Login" />
                        <Link to="/resetPassword">Forgot password??</Link>
                    </div>
                </form>
            </div>
            <Link to="/register" className="redirectAuthPage">
                <p>Create account</p>
            </Link>
        </>
    )
}

export default Login
