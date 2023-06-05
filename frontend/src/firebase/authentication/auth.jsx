import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth"
import { auth } from "../cred"
import { addNewUserStructure, checkHandle } from "../../api/request"


export const signOutUser = async () => {
    let response = {status: "", message: ""}
    try {
        await signOut(auth)
        response = {status: 200, message: "Logged Out"}
        console.log(response)
    } catch (error) {
        response = {status: 500, message: error.message}
        console.log(response)
    }
    return response
}

export const deleteUserAccount = async (email, password, uid) => {
    let response = {stat: "", msg: ""}
    try {
        const credential = EmailAuthProvider.credential(email, password);
        await reauthenticateWithCredential(auth.currentUser, credential);
        await api.post("/deleteUserData", {uid: uid})
        await deleteUser(auth.currentUser);
    } catch (error) {
        if (error.code === 'auth/wrong-password') {
            response = {stat: "Wrong Password", msg: 'Invalid password. Please try again.'}
        } else {
            response = {stat: 500, msg: error}
        }
    }
    return response
}

export const registerNewUser = async (email, password, handle) => {
    let response = {status: "", message: "", token: ""}
    await checkHandle(handle).then(async data => {
        if (data.status === 200) {
            await createUserWithEmailAndPassword(auth, email, password).then(async respo => {
                let structuredData = {
                    email: email,
                    uid: respo.user.uid,
                    handle: handle
                }
                let token = await addNewUserStructure(structuredData)
                if (token.status === 200) {
                    await sendEmailVerification(respo.user)
                    response = {status: 200, token: token.token}
                } else {
                    response = {status: 500, message: "Unable to add Structure"}
                }
            }).catch(error => {
                response = {status: 500, message: error.code}
            })
        } else if (data.status === 401) {
            response = {status: 401, message: "User handle already taken"}
        }
    }).catch(err => {
        response = {stat: 500, message: err}
    })
    return response
}