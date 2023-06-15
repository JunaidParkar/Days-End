import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../../cred/cred"

export const createUser = async (email, password) => {
    let response = {status: "", message: ""}
        await createUserWithEmailAndPassword(auth, email, password).then(async data => {}).catch(createUserError => {response = {status: 101, error: createUserError.code}})
    return response
}