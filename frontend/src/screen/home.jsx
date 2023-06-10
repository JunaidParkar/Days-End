import React from 'react'
import Navbar from '../component/navbar'
import UserPost from '../component/userPost'
import useAuth from '../hooks/useAuth'


const Home = () => {

    const [user] = useAuth()

    console.log(user.loggedIn)


    return (
        <>
            <div className="homeContainer">
                <Navbar page="house" />
                <div className="flex homeContentContainer">
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
        </>
    )
}

export default Home
