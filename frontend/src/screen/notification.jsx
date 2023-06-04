import React from 'react'
import Navbar from '../component/navbar'
import Preloader from '../component/preloader'

const Notify = () => {
    return (
        <>
            {/* <Preloader /> */}
            <div className="notificationContainer">
                <Navbar page="notification" />
            </div>
        </>
    )
}

export default Notify
