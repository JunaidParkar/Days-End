import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AlertBox from '../../component/alertBox'
import { registerNewUser } from '../../firebase/authentication/auth'

const Register = () => {

    const [registerData, setRegisterData] = useState({
        handle: "",
        email: "",
        password: "",
        confPassword: ""
    })
    const [disableBtn, setDisableBtn] = useState(true)
    const [disableLoginBtn, setdisableLoginBtn] = useState(false)
    const [alertBox, setAlertBox] = useState([false])
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        const updateBtn = () => {
            if (registerData.email != "" && registerData.password != "" && registerData.confPassword != "" && registerData.handle != "") {
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
            if (registerData.password.length < 6 || registerData.password.length > 12) {
                setAlertBox([true, "Password should be between 6 to 12 character"])
            } else {
                let reg = await registerNewUser(registerData.email, registerData.password, registerData.handle)
                if (reg.status === 401) {
                    setAlertBox([true, reg.message])
                } else if (reg.status === 500) {
                    setAlertBox([true, reg.message || "Internal server error. Kindly try again later!!"])
                } else if (reg.status === 200) {
                    console.log(reg)
                    setAlertBox([true, "Check your E-Mail inbox for E-Mail verification"])
                }
            }
        } else {
            setAlertBox([true, "Password didn't match"])
        }
        setDisableBtn(false)
        setLoader(false)
    }

    const closeAlert = () => {
        setAlertBox(false)
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
                    <div className="flex handlers" >
                        <input type="submit" disabled={disableBtn} value="Create account" style={{width: '100%'}} />
                    </div>
                </form>
            </div>
            <Link to="/login" className={loader ? "none redirectAuthPage" : "redirectAuthPage"} >
                <p>Login</p>
            </Link>

            {alertBox[0] ? <AlertBox message={alertBox[1]} closeError={closeAlert} /> : ""}
        </>
    )
}

export default Register
