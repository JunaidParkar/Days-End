import React, { useEffect, useState } from 'react'
import noUser from "../assets/noUser.jpg"
import useAuth from '../hooks/useAuth'
import { updateProfileData } from '../functions/updateProfile/updateProfile'
import imageCompressor from '../functions/updateProfile/imageCompresser'

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

    const handleImage = async (e) => {
        await imageCompressor(e.target.files[0], 800).then((compressedFile) => {
          setUserData({ ...userData, profilePic: compressedFile });
        });
      };
      
      

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
        updateProfileData(user, userData)
        setLoader(false)
    }

    let uu = !user ? "" : user.photoURL

    let aa = uu ? true : false

    if (aa) {
        // if (photoURL) {
            const profilePicBlob = fetch(uu).then((response) => {console.log(response); return (response.blob())});
            // const profilePicObjectURL = URL.createObjectURL(profilePicBlob);
            // setProfilePicURL(profilePicObjectURL);
            // console.log(profilePicObjectURL)
        //   }
    }

    // console.log(aa)

    // console.log(!user ? "" : URL.createObjectURL(uu))

  return (
    <>
        <div className="updateProfileContainer">
            <div className="flexCenter profilePicContainer">
                {/* <img src={!isLoading ? !user.photoURL ? !userData.profilePic ? noUser : URL.createObjectURL(userData.profilePic) : URL.createObjectURL(user.photoURL) : ""} onClick={() => document.getElementById("profilePicInput").click()} alt="Profile picture" /> */}
            </div>
            <form className='flex' method='post' onSubmit={e => uploadProfile(e)}>
                <input type="text" disabled value={!isLoading ? user.email : ""} />
                <input type="text" name='displayName' defaultValue={!isLoading ? user.displayName === null || user.displayName == "" ? "" : user.displayName : ""} placeholder='Enter username you want...' onChange={(e) => handleUserdata(e)} required />
                <textarea rows="3" name='bio' placeholder='Write about your self...' onChange={(e) => handleUserdata(e)} required />
                <input type="submit" disabled={disableBtn} value="Submit" />
            </form>
        </div>
        <input type="file" name="profilePic" hidden id="profilePicInput" multiple={false} accept="image/*" onChange={(e) => handleImage(e)} />
    </>
  )
}

export default UpdateProfile