import React from 'react'
import "../css/pageNotFound.css"

const PageNotFound = () => {
  return (
    <>
      <div className="flexCenter pgnf">
        <div className="error-pg">
          <div className="error-number">
            <div className="number left-coffee">4</div>
            <div className="coffee-mug"></div>
            <div className="number right-coffee">4</div>
          </div>
          <div className="sm-screen">404</div>
          <div className="mean-msg">
            Nothing to see here
          </div>
        </div>
      </div>
    </>
  )
}

export default PageNotFound