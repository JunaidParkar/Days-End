import { api } from "./axios"

export const addNewUserStructure = async (userData) => {
    let response = {status: "", message: "", token: ""}
    await api.post("/userRegisterSetup", userData).then((resp) => {
        response = {status: resp.data.status, message: resp.data.message, token: resp.data.token}
    }).catch(error => {
        response = {status: 500, message: error}
    })
    return response
}

export const checkHandle = async (handle) => {
    let response = {status: "", message: ""}
    await api.post("/checkHandle", {handle: handle}).then(resp => {
        response = {status: resp.data.status, message: resp.data.message}
        console.log(resp.data)
    }).catch(err => {
        response = {status: 500, message: err}
    })
    return response
}