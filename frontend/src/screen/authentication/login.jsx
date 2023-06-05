import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAlert from '../../hooks/useAlert';
import { loginUser, signOutUser } from '../../firebase/authentication/auth';
import AlertBox from '../../component/alertBox';


const Login = () => {

    const [isAlert, toggleAlert, alertLog, addAlertLog] = useAlert(false);

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const [disableBtn, setDisableBtn] = useState(true)
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        const updateBtn = () => {
            if (loginData.email != "" && loginData.password != "") {
                setDisableBtn(false)
            } else {
                setDisableBtn(true)
            }
        }
        updateBtn()
    }, [loginData])

    const handleLoginData = (e) => {
        setLoginData({...loginData, [e.target.name]: e.target.value})
    }

    const setAlert = (stat, log) => {
        toggleAlert(stat)
        addAlertLog(log)
    }

    const closeAlert = () => {
        setAlert(false, "")
    }

    const loginUserAccount = async e => {
        e.preventDefault()
        setDisableBtn(true)
        setLoader(true)
        if (loginData.email.trim() == "" || loginData.password.trim() == "") {
            setAlert(true, "E-Mail or passwords cannot be invalid")
        } else {
            await loginUser(loginData.email.trim(), loginData.password.trim()).then(async data => {
                if (data.status === 200) {
                    console.log(localStorage.getItem("AuthToken"))
                } else {
                    setAlert(true, data.message)
                    await signOutUser()
                }
            })
        }
        setDisableBtn(false)
        setLoader(false)
    }


    return (
        <>
            <div className="flexCenter authContainer">
                <form method="post" className='flex' onSubmit={(e) => loginUserAccount(e)} >
                    <h3>Login</h3>
                    <input type="text" name="email" placeholder='Enter your E-Mail' onChange={(e) => handleLoginData(e)} required />
                    <input type="password" name="password" placeholder='Enter your password' onChange={(e) => handleLoginData(e)} required />
                    <div className="flex handlers">
                        <input disabled={disableBtn} type="submit" value="Login" />
                        <Link to="/resetPassword" className={loader ? "none" : ""}>Forgot password??</Link>
                    </div>
                </form>
            </div>
            <Link to="/register" className={loader ? "none" : "redirectAuthPage"}>
                <p>Create account</p>
            </Link>


            {isAlert ? <AlertBox message={alertLog} closeError={closeAlert} /> : ""}
        </>
    )
}

export default Login
