import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AlertBox from '../../component/alertBox'
// import { registerNewUser, signOutUser } from '../../firebaseFunctions/authentication/auth'
import useAlert from '../../hooks/useAlert'
import { createUser } from '../../functions/authentication/authentication'

const Register = () => {

    const [isAlert, showAlert, closeAlert] = useAlert(false, "");
    

    const [registerData, setRegisterData] = useState({
        email: "",
        password: "",
        confPassword: ""
    })
    const [disableBtn, setDisableBtn] = useState(true)
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()

    
    useEffect(() => {
        const updateBtn = () => {
            if (registerData.email.trim() != "" && registerData.password.trim() != "" && registerData.confPassword.trim() != "") {
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
                showAlert("Password should be between 6 to 12 character. Password should not contain any white spaces.", false)
            } else {
                await createUser(registerData.email.trim(), registerData.password.trim()).then(resp => {
                    showAlert(resp.message, false)
                    navigate("/")

                }).catch(error => {
                    showAlert(error.code, false)
                })
            }
        } else {
            showAlert("Password didn't match", false)
        }
        setDisableBtn(false)
        setLoader(false)
    }


    return (
        <>
            <div className="flexCenter authContainer">
                <form method="post" className='flex' onSubmit={(e) => {registerUser(e)}} >
                    <h3>Create an account</h3>
                    <input type="text" name="email" placeholder='Enter your E-Mail' onChange={(e) => handleRegisterData(e)} required />
                    <input type="password" name="password" placeholder='Enter your password' onChange={(e) => handleRegisterData(e)} required />
                    <input type="password" name="confPassword" placeholder='Re-type your password' onChange={(e) => handleRegisterData(e)} required />
                    <div className="flex handlers">
                        <input disabled={disableBtn} type="submit" value="Register" />
                        <Link to="/auth/verifyEmail" className={loader ? "none" : ""}>Verify E-Email??</Link>
                    </div>
                </form>
            </div>
            <Link to="/auth/login" className={loader ? "none redirectAuthPage" : "redirectAuthPage"} >
                <p>login</p>
            </Link>

            {isAlert.state ? <AlertBox message={isAlert.log} closeAlert={closeAlert} /> : ""}
        </>
    )
}

export default Register
