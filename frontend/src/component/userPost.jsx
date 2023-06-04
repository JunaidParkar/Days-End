import React from 'react'
import heart from '../assets/heart.png'
import plane from '../assets/plane.png'
import comment from  "../assets/comment.png"

const UserPost = () => {
  return (
    <>
      <div className="postCard lightGreenColor">
        <div className="flex postPoemHeading">
          <h4>Poem Heading is all about testing</h4>
          <p>Junaid Parkar</p>
        </div>
        <div className="postPoemSec">
          <p>
            "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
          </p>
          <div className="flex postPoemInteractionSec">
            <div className="flexCenter postPoemLike">
              <img src={heart} alt="Like" />
              <p>10</p>
            </div>
            <div className="flexCenter postPoemLike">
              <img src={comment} alt="Like" />
              <p>Review</p>
            </div>
            <div className="flexCenter postPoemShare">
              <img src={plane} alt="Share" />
              <p>Share</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserPost