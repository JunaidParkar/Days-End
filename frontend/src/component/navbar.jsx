import React, { useEffect, useState } from 'react'
import house from "../assets/house.png"
import houseFilled from "../assets/houseFilled.png"
import search from "../assets/search.png"
import searchActive from "../assets/searchActive.png"
import notification from "../assets/notification.png"
import notificationFilled from "../assets/notificationFilled.png"
import userOutline from "../assets/user.png"
import userFilled from "../assets/userFilled.png"
import logout from "../assets/logout.png"
import { useNavigate } from 'react-router-dom'
import { signOutUser } from '../firebase/authentication/auth'
import useAuth from '../hooks/useAuth'

const Navbar = (props) => {

    const [user] = useAuth()
    const [status, setStatus] = useState({
        house: false,
        search: false,
        notification: false,
        profile: false
    })

    useEffect(() => {
      const use = () => {
        console.log(props.page)
        setStatus({[props.page]: true})
      }
      use()
    }, [])

    const logOut = async () => {
        await signOutUser().then(data => {
        })
    }
    


    return (
        <>
            <div className="flex navContainer">
                <div className='flex navList' >
                    <img src={house} onClick={() => navigate("/")} className={status.house ? 'displayNone' : ''} alt="Home" />
                    <img src={houseFilled} className={status.house ? '' : 'displayNone'} alt="Home" />
                    <img src={search} onClick={() => navigate("/search")} className={status.search ? 'displayNone' : ''} alt="Search" />
                    <img src={searchActive} className={status.search ? '' : 'displayNone'} alt="Search" />
                    <div className="not">
                        <img src={notification} onClick={() => navigate("/notifications")} className={status.notification ? 'displayNone' : ''} alt="Notification" />
                        <img src={notificationFilled} className={status.notification ? '' : 'displayNone'} alt="Notification" />
                        <p className='flexCenter notCount' >2+</p>
                    </div>
                    <img src={userOutline} onClick={() => navigate("/profile")} className={status.profile ? 'displayNone' : ''} alt="Your profile" />
                    <img src={userFilled} className={status.profile ? '' : 'displayNone'} alt="Your profile" />
                    <div className="flex logout" onClick={() => logOut()} >
                        <img src={logout} alt="" />
                        <p>logout</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
