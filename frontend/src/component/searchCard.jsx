import React from 'react'
import noUser from '../assets/noUser.jpg'

const SearchCard = () => {
    return (
        <>
            <div className="searchCard skinColor">
                <div className="flex searchCardHeader">
                    <div className="searchCardDP">
                        <img src={noUser} alt="User Profile Picture" />
                    </div>
                    <div className="flex searchCardInteraction">
                        <h4>Junaid Parkar</h4>
                        <div className="flex interact">
                            <h5>Posts: <span>90</span></h5>
                            <div className="followBtn">
                            <h5>Follow</h5>
                        </div> 
                        </div>
                    </div>
                </div>
                <div className="flex searchProfileBio">
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                </div>
            </div>
        </>
    )
}

export default SearchCard