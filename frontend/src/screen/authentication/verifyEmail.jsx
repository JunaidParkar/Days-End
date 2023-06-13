import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAlert from '../../hooks/useAlert';
import { verifyEmailLink } from '../../firebaseFunctions/authentication/auth';
import AlertBox from '../../component/alertBox';

const VerifyEmail = () => {

    const [isAlert, showAlert, closeAlert] = useAlert(false, "");
    const [verifyData, setVerifyData] = useState({
        email: "",
        password: ""
    })
    const [disableBtn, setDisableBtn] = useState(true)
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        const updateBtn = () => {
            if (verifyData.email.trim() != "" && verifyData.password.trim() != "") {
                setDisableBtn(false)
            } else {
                setDisableBtn(true)
            }
        }
        updateBtn()
    }, [verifyData])


    const handleVerifyData = (e) => {
        setVerifyData({...verifyData, [e.target.name]: e.target.value})
    }

    const sendVerifyLink = async (e) => {
        e.preventDefault()
        setDisableBtn(true)
        setLoader(true)
        if (verifyData.email.trim() === "" || verifyData.password.trim() === "") {
            showAlert("E-Mail or password cannot be empty")
        } else {
            await verifyEmailLink(verifyData.email.trim(), verifyData.password.trim()).then(resp => {
                showAlert(resp.message)
            }).catch(error => {
                showAlert(error)
            })
        }
        setDisableBtn(false)
        setLoader(false)
    }
    return (
        <>
            <div className="flexCenter authContainer">
                <form method="post" className='flex' onSubmit={(e) => sendVerifyLink(e)} >
                    <h3>Verify your E-Mail</h3>
                    <input type="text" name="email" placeholder='Enter your E-Mail' onChange={(e) => handleVerifyData(e)} required />
                    <input type="password" name="password" placeholder='Enter your password' onChange={(e) => handleVerifyData(e)} required />
                    <div className="flex handlers">
                        <input type="submit" disabled={disableBtn} value="submit" />
                    </div>
                </form>
            </div>
            <Link to="/login" className={loader ? "none" : "redirectAuthPage"}>
                <p>login</p>
            </Link>

            {isAlert.state ? <AlertBox message={isAlert.log} closeAlert={closeAlert} /> : ""}
        </>
    )
}

export default VerifyEmail