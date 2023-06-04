import React from 'react'

const AlertBox = ({message, closeError}) => {
  return (
    <>
        <div className="flexCenter alertBoxContainer">
            <div className="mainContainer">
                <h3>alert</h3>
                <p>{message}</p>
                <div className="flex backContainer">
                    <p onClick={() => closeError(true)} >close</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default AlertBox