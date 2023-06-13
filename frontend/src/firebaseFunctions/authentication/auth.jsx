import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "../cred"
import { addNewUserStructure, checkHandle, getAllOfMyDatas, getToken } from "../../api/request"


export const signOutUser = async () => {
    let response = {status: "", message: ""}
    try {
        await signOut(auth)
        localStorage.clear()
        response = {status: 200, message: "Logged Out"}
    } catch (error) {
        response = {status: 500, message: error.message}
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
                    response = {status: 200}
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

export const loginUser = async (email, password) => {
    let response = {status: "", message: "", data: "", logInData: ""}
    await signInWithEmailAndPassword(auth, email, password).then(async user => {
        let tokenData = {
            uid: user.user.uid,
            email: user.user.email
        }
        await getToken(tokenData).then(async token => {
            if (token.status === 200) {
                localStorage.setItem("AuthToken", token.token)
                response = {status: 200, message: "Successfully logged in", data: "", logInData: ""}
                await getAllOfMyDatas(user.user.uid).then(resp => {
                    response = { status: resp.status, message: resp.message, data: resp.data, logInData: user.user}
                }).catch(erro => {
                    response = {status: 500, message: erro.code, data: "", logInData: ""}
                })
            } else {
                response = {status: token.status, message: token.message, data: "", logInData: ""}
            }
        }).catch(async err => {
            response = {status: 500, message: err, data: "", logInData: ""}
        })
    }).catch(signInError => {
        response = {status: 500, message: signInError.code, data: "", logInData: ""}
    })
    return response
}

export const verifyEmailLink = async (email, password) => {
    let response = {status: "", message: ""}
    await signInWithEmailAndPassword(auth, email, password).then(async user => {
        if (!user.user.emailVerified) {
            await sendEmailVerification(user.user).then(() => {
                response = {status: 200, message: "E-Mail verification link has been sent to your E-Mail inbox."}
            }).catch(err => {
                response = {status: 500, message: err.code}
                console.log(err.code)
            })
        }
    }).catch(signInError => {
        response = {status: 500, message: signInError.code}
    })
    return response
}

export const resetPassword = async (email) => {
    let response = {status: "", message: ""}
    await sendPasswordResetEmail(auth, email).then(resp => {
        response = {status: 200, message: resp ? resp : "Password reset E-Mail has been sent to your E-Mail."}
    }).catch(error => {
        response = {status: 500, message: error.code}
    })
    return response
}