import React, { useEffect, useState } from 'react'
import Navbar from '../component/navbar'
import UserPost from '../component/userPost'
import useAuth from '../hooks/useAuth'
import UserPostSkeleton from '../component/userPostSkeleton'
import Preloader from '../component/preloader'
import useAlert from '../hooks/useAlert'
import { getAllPosts } from '../api/request'
import { useDispatch, useSelector } from 'react-redux';
import { storeAllPosts } from '../redux/actions/homePageAction'
import store from '../redux/store';
import { signOutUser } from '../firebaseFunctions/authentication/auth'


const Home = () => {

    const [user] = useAuth()
    const [isAlert, showAlert, closeAlert] = useAlert(false, "");
    const [lastPostId, setlastPostId] = useState("no")
    const [hasMore, setHasMore] = useState(true)
    const [postLoading, setPostLoading] = useState(true)
    const dispatch = useDispatch();
    const allPosts = useSelector((state) => state.appPost);


    useEffect(() => {
        if (user.loggedIn) {
            getPosts()
        }
    }, [user.loggedIn])

    console.log(user.loggedIn)

    // console.log(allPosts)

    const getPosts = async () => {
        if (!user.loading && !user.error) {
            setPostLoading(true)
            await getAllPosts(lastPostId, user.loggedIn.uid).then(resp => {
                if (resp.status === 200) {
                    
                    if (resp.data === "no more data") {
                        setHasMore(false)
                    } else {
                        // setPosts({...posts, ...resp.data})
                        // setlastPostId(resp.lastPostId)
                        // setHasMore(true)
                        dispatch(storeAllPosts(resp.data));
                        setlastPostId(resp.lastPostId);
                        setHasMore(true);
                    }
                } else if (resp.status === 700) {
                    signOutUser()
                    console.log(resp.message)
                }
            })
            setPostLoading(false)
        }
    }

    console.log(hasMore)

    const scroller = async () => {
        if (hasMore) {
            if (
                window.innerHeight + document.documentElement.scrollTop + 1 >=
                document.documentElement.scrollHeight
              ) {
                await getPosts()
              }
          }
    }

    window.onscroll = scroller
    // console.log(posts)
      

    if (user.loading) {
        return <Preloader />
    }

    // console.log(lastPostId)

    if (!user.loading) {
        if (user.error) {
            showAlert("Encountering some error please login again")
            return (
                <>
                    {isAlert.state ? <AlertBox message={isAlert.log} closeAlert={closeAlert} /> : ""}
                </>
            )
        } else {
            return (
                <>
                    <div className="homeContainer">
                        <Navbar page="house" />
                        <div className="flex homeContentContainer">
                            {
                                allPosts != {} ? Object.keys(allPosts).map((key) => (
                                    <UserPost key={key} data={allPosts[key]} />
                                    )) : ""
                            }
                            {
                                console.log(allPosts)
                            }
                            {postLoading ? <UserPostSkeleton /> : ""}
                            {postLoading ? <UserPostSkeleton /> : ""}
                            {postLoading ? <UserPostSkeleton /> : ""}
                            {postLoading ? <UserPostSkeleton /> : ""}
                            {postLoading ? <UserPostSkeleton /> : ""}
                            {postLoading ? <UserPostSkeleton /> : ""}
                                {/* <UserPost key={key} data={posts[key]} /> */}
                        </div>
                    </div>
                </>
            )
        }
    }
}

export default Home
