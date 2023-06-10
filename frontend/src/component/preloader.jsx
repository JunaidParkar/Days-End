import React from 'react'

const Preloader = () => {
    return (
        <>
            <div className="flexCenter preloaderContainer">
                <div className="container">
	            	<div className="loader"><span></span></div>
	            	<div className="loader"><span></span></div>

	            	<div className="loader"><i></i></div>
	            	<div className="loader"><i></i></div>
	            </div>
            </div>
        </>
    )
}

export default Preloader