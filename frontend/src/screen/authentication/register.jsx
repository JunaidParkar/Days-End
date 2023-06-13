import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AlertBox from '../../component/alertBox'
import { registerNewUser, signOutUser } from '../../firebaseFunctions/authentication/auth'
import useAlert from '../../hooks/useAlert'

const Register = () => {

    const [isAlert, showAlert, closeAlert] = useAlert(false, "");
    

    const [registerData, setRegisterData] = useState({
        handle: "",
        email: "",
        password: "",
        confPassword: ""
    })
    const [disableBtn, setDisableBtn] = useState(true)
    const [loader, setLoader] = useState(false)

    
    useEffect(() => {
        const updateBtn = () => {
            if (registerData.email.trim() != "" && registerData.password.trim() != "" && registerData.confPassword.trim() != "" && registerData.handle.trim() != "") {
                setDisableBtn(false)
            } else {
                setDisableBtn(true)
            }
        }
        updateBtn()
    }, [registerData])
    

    const handleRegisterData = (e) => {
        setRegisterData({...registerData, [e.target.name] : e.target.value})
    }


    const registerUser = async (e) => {
        e.preventDefault()
        setDisableBtn(true)
        setLoader(true)
        if (registerData.confPassword === registerData.password) {
            if (registerData.password.trim().length < 6 || registerData.password.trim().length > 12) {
                showAlert("Password should be between 6 to 12 character. Password should not contain any white spaces.")
            } else {
                let reg = await registerNewUser(registerData.email, registerData.password, registerData.handle)
                if (reg.status === 401) {
                    await showAlert(reg.message, false)
                } else if (reg.status === 500) {
                    await showAlert(reg.message, false)
                }
            }
        } else {
            showAlert("Password didn't match")
        }
        setDisableBtn(false)
        setLoader(false)
    }


    return (
        <>
            <div className="flexCenter authContainer">
                <form method="post" className='flex' onSubmit={(e) => {registerUser(e)}} >
                    <h3>Create an account</h3>
                    <input type="text" name="handle" placeholder='Enter user name you want' onChange={(e) => handleRegisterData(e)} required />
                    <input type="text" name="email" placeholder='Enter your E-Mail' onChange={(e) => handleRegisterData(e)} required />
                    <input type="password" name="password" placeholder='Enter your password' onChange={(e) => handleRegisterData(e)} required />
                    <input type="password" name="confPassword" placeholder='Re-type your password' onChange={(e) => handleRegisterData(e)} required />
                    <div className="flex handlers">
                        <input disabled={disableBtn} type="submit" value="Register" />
                        <Link to="/verifyEmail" className={loader ? "none" : ""}>Verify E-Email??</Link>
                    </div>
                </form>
            </div>
            <Link to="/login" className={loader ? "none redirectAuthPage" : "redirectAuthPage"} >
                <p>login</p>
            </Link>

            {isAlert.state ? <AlertBox message={isAlert.log} closeAlert={closeAlert} /> : ""}
        </>
    )
}

export default Register
