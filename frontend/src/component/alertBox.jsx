import React from 'react'
import { signOutUser } from '../firebaseFunctions/authentication/auth'

const AlertBox = ({message, closeAlert, logout}) => {
  const handleLogout = async () => {
    if (logout) {
      await signOutUser()
      closeAlert()
    } else {
      closeAlert()
    }
  }
  return (
    <>
        <div className="flexCenter alertBoxContainer">
            <div className="mainContainer">
                <h3>alert</h3>
                <p>{message}</p>
                <div className="flex backContainer">
                    <p onClick={async () => handleLogout()} >close</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default AlertBox