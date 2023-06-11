import React from 'react'
import heart from '../assets/heart.png'
import plane from '../assets/plane.png'
import comment from  "../assets/comment.png"

const UserPost = ({data}) => {
  return (
    <>
      <div className="postCard lightGreenColor">
        <div className="flex postPoemHeading">
          <h4>{data.heading}</h4>
          <p>{data.handle}</p>
        </div>
        <div className="postPoemSec">
          <p>{data.poem}</p>
          <div className="flex postPoemInteractionSec">
            <div className="flexCenter postPoemLike">
              <img src={heart} alt="Like" />
              <p>{data.like}</p>
            </div>
            <div className="flexCenter postPoemLike">
              <img src={comment} alt="Like" />
              <p>{data.comment}</p>
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