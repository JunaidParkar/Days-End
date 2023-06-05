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
            response = {status: 200, message: resp.data.message, token: resp.data.token}
        } else {
            response = {status: 500, message: "Unable to process your request at the moment."}
        }
    }).catch(error => {
        response = {status: 500, message: error}
    })
    return response
}