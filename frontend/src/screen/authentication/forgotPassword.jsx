import React from 'react'
import { Link } from 'react-router-dom'

const ResetPassword = () => {
    return (
        <>
            <div className="flexCenter authContainer">
                <form method="post" className='flex' >
                    <h3>Reset your password</h3>
                    <input type="text" name="email" placeholder='Enter your E-Mail' required />
                    <div className="flex handlers">
                        <input type="submit" value="submit" />
                    </div>
                </form>
            </div>
            <Link to="/login" className="redirectAuthPage">
                <p>login</p>
            </Link>
        </>
    )
}

export default ResetPassword
