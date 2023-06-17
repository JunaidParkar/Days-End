import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "../../cred/cred"
import { getRandomNumberString } from "../common"
import { updateProfile } from "firebase/auth"
import { checkUserHandle, registerUserStructure } from "../../api/endPoints"

export const updatePic = async (user, userData) => {
    let response = {status: "", message: ""}
    try {
        let path = `${user.uid}/profilePic/${getRandomNumberString(10)}.${userData.profilePic.name.split('.').pop()}`
        let picRef = ref(storage, path)
        const metadata = {
            contentType: `image/${userData.profilePic.name.split('.').pop()}`,
            customMetadata: {
                lattitude: "",
                longitude: "",
                userAgent: navigator.userAgent,
            }
        };
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                metadata.customMetadata.lattitude = position.coords.latitude
                metadata.customMetadata.longitude = position.coords.longitude
            }, () => {});
        }
        let upload = await uploadBytes(picRef, userData.profilePic, metadata)
        let newUrl = await getDownloadURL(ref(storage, upload.ref.fullPath))
        await updateProfile(user, {photoURL: newUrl})
        response = {status: 200, message: "success"}
        console.log(response, "p")
    } catch (error) {
        response = {status: 101, message: error.code}
    }
    return response
}

export const updateProfileData = async (user, userData) => {
    let response = {status: "", message: ""}
        if (user.displayName === userData.displayName.toLowerCase()) {
            if (userData.profilePic) {
                await registerUserStructure(user.email, userData.bio, userData.displayName.toLowerCase())
                await updatePic(user, userData)
                response = {status: 200, message:"success"}
            }
        } else {
            await updatePic(user, userData)
            await checkUserHandle(userData.displayName).then(async resp => {
                if (resp.status === 200) {
                    await registerUserStructure(user.email, userData.bio, userData.displayName.toLowerCase())
                    await updateProfile(user, {displayName: userData.displayName.toLowerCase()})
                    response = {status: 200, message:"success"}
                } else {
                    response = {status: resp.status, message: resp.message}
                }
            })
        }
    return response
}