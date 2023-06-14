import api from "./api"

export const registerUserStructure = async (email, uid, handle) => {
    let response = {status: "", message: ""}
    let structuredData = {
        email: email,
        uid: uid,
        handle: handle
    }
    await api.post("/userRegisterSetup", structuredData).then(data => {
        response = {status: data.data.status, message: data.data.message}
    }).catch(error => {
        response = {status: 999, message: error}
    })
    return response
}

export const checkUserHandle = async (handle) => {
    let response = {status: "", message: ""}
    await api.post("/checkHandle", {handle: handle}).then(data => {
        response = {status: data.data.status, message: data.data.message}
    }).catch(error => {
        response = {status: 999, message: error}
    })
    return response
} 