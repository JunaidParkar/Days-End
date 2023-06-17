import { logOut } from "../functions/authentication/authentication"
import { validateUser } from "../functions/common"
import api from "./api"

export const registerUserStructure = async (email, bio, handle) => {
    let response = {status: "", message: ""}
    let structuredData = {
        email: email,
        bio: bio,
        handle: handle
    }
    console.log(structuredData)
    await api.post("/userRegisterSetup", structuredData).then(async data => {
        await validateUser(data.data.status, "userStructure validator").then(() => {
            response = {status: data.data.status, message: data.data.message}
        }).catch(() => {
            response = {status: 700, message: "Access denied"}
        })
    }).catch(error => {
        response = {status: 999, message: error}
    })
    return response
}

export const checkUserHandle = async (handle) => {
    let response = {status: "", message: ""}
    await api.post("/checkHandle", {handle: handle}).then(async data => {
        await validateUser(data.data.status, "checkHandle validator").then(() => {
            response = {status: data.data.status, message: data.data.message}
        }).catch(() => {
            response = {status: 700, message: "Access denied"}
            logOut("checkUserHandle in endpoint").then()
        })
    }).catch(error => {
        response = {status: 999, message: error}
    })
    return response
}

export const getAuthToken = async (data) => {
    let response = {status: "", message: ""}
    await api.post("/createToken", {tokenData: data}).then(token => {
        if (token.data.status === 200) {
            localStorage.setItem("authToken", token.data.token)
            response = {status: 200, message: "tokenCreated"}
        } else {
            response = token.data
        }
    }).catch(error => {
        response = {status: 99, message: error}
    })
    console.log(response)
    return response
}

export const getAllPost = async (id) => {
    let response = {status: "", message: "", posts: {}, lastPost: ""}
    await api.post("/getAllPost", {lastId: id}).then(async respo => {
        await validateUser(respo.data.status).then(() => {
            response = {status: respo.data.status, message: respo.data.message, posts: respo.data.posts, lastPost: respo.data.lastPost}
        }).catch(() => {
            response = {status: 700, message: "Access denied"}
            logOut("getAllPost in endpoint").then()
        })
    }).catch(error => {
        response = {status: 999, message: error, posts: {}, lastPost: ""}
    })
    return response
}