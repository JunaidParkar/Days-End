import React, { useEffect, useState } from 'react'
import noUser from "../assets/noUser.jpg"
import useAuth from '../hooks/useAuth'

const UpdateProfile = () => {

    const [userData, setUserData] = useState({
        displayName: "",
        bio: "",
        profilePic: ""
    })
    const [disableBtn, setDisableBtn] = useState(true)
    const { user, isLoggedIn, isEmailVerified, isLoading } = useAuth();
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        const updateBtn = () => {
            if (userData.displayName.trim() != "" && userData.bio.trim() != "") {
                setDisableBtn(false)
            } else {
                setDisableBtn(true)
            }
        }
        updateBtn()
    }, [userData])
    

    const handleUserdata = (e) => {
        if (e.target.name === "profilePic") {
            setUserData({...userData, [e.target.name]: e.target.files[0]})
        } else {
            setUserData({...userData, [e.target.name]: e.target.value})
        }
    }

    const uploadProfile = async (e) => {
        e.preventDefault()
        setLoader(true)
        setLoader(false)
    }

  return (
    <>
        <div className="updateProfileContainer">
            <div className="flexCenter profilePicContainer">
                <img src={userData.profilePic === "" ? noUser : URL.createObjectURL(userData.profilePic)} onClick={() => document.getElementById("profilePicInput").click()} alt="Profile picture" />
            </div>
            <form className='flex' method='post' onSubmit={e => uploadProfile(e)}>
                <input type="text" disabled value={!isLoading ? user.email : ""} />
                <input type="text" name='displayName' defaultValue={!isLoading ? user.displayName === null || user.displayName == "" ? "" : user.displayName : ""} placeholder='Enter username you want...' onChange={(e) => handleUserdata(e)} required />
                <textarea rows="3" name='bio' placeholder='Write about your self...' onChange={(e) => handleUserdata(e)} required />
                <input type="submit" disabled={disableBtn} value="Submit" />
            </form>
        </div>
        <input type="file" name="profilePic" hidden id="profilePicInput" multiple={false} accept="image/*" onChange={(e) => handleUserdata(e)} />
    </>
  )
}

export default UpdateProfile