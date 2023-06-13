import { api } from "./axios"

export const addNewUserStructure = async (userData) => {
    let response = {status: "", message: ""}
    await api.post("/userRegisterSetup", userData).then((resp) => {
        response = {status: resp.data.status, message: resp.data.message}
    }).catch(error => {
        response = {status: 500, message: error}
    })
    return response
}

export const checkHandle = async (handle) => {
    let response = {status: "", message: ""}
    await api.post("/checkHandle", {handle: handle}).then(resp => {
        response = {status: resp.data.status, message: resp.data.message}
    }).catch(err => {
        response = {status: 500, message: err}
    })
    return response
}

export const getToken = async (data) => {
    let response = {status: "", message: "", token: ""}
    await api.post("/createToken", {tokenData: data}).then(resp => {
        if (resp.data.status === 500) {
            response = {status: 500, message: resp.data.message}
        } else if (resp.data.status === 200) {
            localStorage.clear()
            response = {status: 200, message: resp.data.message, token: resp.data.token}
        } else {
            response = {status: 500, message: "Unable to process your request at the moment."}
        }
    }).catch(error => {
        response = {status: 500, message: error}
    })
    return response
}

export const getAllPosts = async (lastId, uid) => {
    let response = {status: "", message: "", data: "", lastPostId: ""}
    await api.post("/getAllPost", {uid: uid,lastId: lastId}).then(resp => {
        if (resp.data.status === 700) {
            response = {status: 700, message: resp.data.message, data: "", lastPostId: ""}
        } else {
            response = {status: resp.data.status, message: resp.data.message, data: resp.data.posts, lastPostId: resp.data.lastPost}
        }
    }).catch(error => {
        response = {status: 500, message: error.code, data: "", lastPostId: ""}
    })
    return response
}

export const getAllOfMyDatas = async (uid) => {
    let response = {status: "", message: "", data: ""}
    await api.post("/getMyData", {uid: uid}).then(respo => {
        if (respo.data.status === 200) {
            response = {status: 200, message: "", data: respo.data.data}
        } else {
            response = {status: respo.status, message: respo.data.message, data: respo.data.data}
        }
    }).catch(error => {
        response = {status: 500, message: error.code, data: ""}
    })
    return response
}