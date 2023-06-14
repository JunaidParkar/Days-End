import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../../cred/cred"
import { checkUserHandle } from "../../api/endPoints"

export const registerUser = async (email, password, userHandle) => {
    let response = {status: "", message: ""}
    await checkUserHandle(userHandle).then(async handleData => {
        if (handleData.status === 200) {
            await createUserWithEmailAndPassword(auth, email, password).then(async data => {
                await updateProfile(data.user, {
                    displayName: userHandle
                }).then().catch(updateProfileError => {
                    response = {status: 101, error: updateProfileError.code}
                })
            }).catch(createUserError => {
                response = {status: 101, error: createUserError.code}
            })
        } else {
            response = {status: handleData.status, message: handleData.message}
        }
    })
    return response
}