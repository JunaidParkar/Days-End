import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAlert from '../../hooks/useAlert';
// import { loginUser, signOutUser } from '../../firebaseFunctions/authentication/auth';
import AlertBox from '../../component/alertBox';
import { browserSessionPersistence, onAuthStateChanged, setPersistence } from 'firebase/auth';
import { auth } from '../../cred/cred';
import { useDispatch } from 'react-redux';
import { getMyData } from '../../redux/actions/myDataAction';
import { loginUserDataInRedux } from '../../redux/actions/authAction';
import Preloader from '../../component/preloader';


const Login = () => {

    const [isAlert, showAlert, closeAlert] = useAlert(false, "");

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const [disableBtn, setDisableBtn] = useState(true)
    const [loader, setLoader] = useState(false)
    const [preloader, setPreloader] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const updateBtn = () => {
            if (loginData.email.trim() != "" && loginData.password.trim() != "") {
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

    let navigate = useNavigate()

    const loginUserAccount = async e => {
        e.preventDefault()
        setPreloader(true)
        if (loginData.email.trim() == "" || loginData.password.trim() == "") {
            showAlert("E-Mail or passwords cannot be invalid", false)
        } else {
            // await setPersistence(auth, browserSessionPersistence);
            // await loginUser(loginData.email.trim(), loginData.password.trim()).then(async data => {
            //     if (data.status === 200) {
            //         // if (data.logInData.emailVerified) {
            //             let loggingIn = {
            //                 loggedIn: true,
            //                 uid: data.logInData.uid,
            //                 email: data.logInData.email,
            //                 photo: data.logInData.photoURL,
            //                 emailVerified: data.logInData.emailVerified,
            //                 handle: data.logInData.displayName
            //               }
            //               dispatch(loginUserDataInRedux(loggingIn))
                    // }
                    // let loggingIn = {
                    //     loggedIn: true,
                    //     uid: data.logInData.uid,
                    //     email: data.logInData.email,
                    //     photo: data.logInData.photoURL,
                    //     emailVerified: false,
                    //     handle: data.logInData.displayName
                    // }
                    // let myPostsData = {}
                    // dispatch(loginUserDataInRedux(loggingIn))
                    // console.log(loggingIn)
                    // console.log(data)
                //     navigate("/")
                // } else {
                //     showAlert(data.message, true)
                // }
            // })
        }
        setPreloader(false)
    }


    return (
        <>
            {preloader ? <Preloader /> : ""}
            <div className="flexCenter authContainer">
                <form method="post" className='flex' onSubmit={(e) => loginUserAccount(e)} >
                    <h3>Login</h3>
                    <input type="text" name="email" placeholder='Enter your E-Mail' onChange={(e) => handleLoginData(e)} required />
                    <input type="password" name="password" placeholder='Enter your password' onChange={(e) => handleLoginData(e)} required />
                    <div className="flex handlers">
                        <input type="submit" value="Login" />
                        <Link to="/auth/resetPassword">Forgot password??</Link>
                    </div>
                </form>
            </div>
            <Link to="/auth/register" className="redirectAuthPage" >
                <p>Create account</p>
            </Link>


            {isAlert.state ? <AlertBox message={isAlert.log} closeAlert={closeAlert} /> : ""}
        </>
    )
}

export default Login