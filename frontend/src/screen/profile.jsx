import React from 'react'
import Navbar from '../component/navbar'
import noUser from '../assets/noUser.jpg'
import UserPost from '../component/userPost'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="profileContainer">
        <Navbar page="profile" />
        <div className="profileContentContainer">

          <div className="myProfileHeader">
            <div className="flex myProfileHeaderInteractionCenter">
              <img src={noUser} alt="Profile Picture" />
              <div className="flex interaction">
                <h4>Junaid Parkar</h4>
                <div className="flex stats">
                  <div className="statCont">
                    <p className="statValue">0</p>
                    <p className="statName">Posts</p>
                  </div>
                  <div className="statCont">
                    <p className="statValue">0</p>
                    <p className="statName">Followers</p>
                  </div>
                  <div className="statCont">
                    <p className="statValue">0</p>
                    <p className="statName">Following</p>
                  </div>
                </div>
                <div className="flex interactionBtns">
                  <div className="editProfile">
                    <p>Edit profile</p>
                  </div>
                  <div className="addPoem editProfile" onClick={() => navigate("/addPoem")} >
                    <p>Add Poem</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="myBio">
              <p>"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"</p>
            </div>
          </div>
          
          <div className="flex postsContainer">

            <UserPost />
            <UserPost />
            <UserPost />
            <UserPost />
            <UserPost />
            <UserPost />
            <UserPost />
            <UserPost />
            <UserPost />
            
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
