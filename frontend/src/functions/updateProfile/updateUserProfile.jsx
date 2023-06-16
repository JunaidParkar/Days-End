import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "../../cred/cred"
import { getRandomNumberString } from "../common"
import { updateProfile } from "firebase/auth"

export const updateProfileData = async (user, userData) => {
    let response = {status: "", message: ""}
    console.log(user)
    console.log(userData)
    let datas = {
        photoURL: "",
        displayName: userData.displayName
    }
    if (userData.profilePic) {
        let path = `${user.uid}/profilePic/${getRandomNumberString(10)}.${userData.profilePic.name.split('.').pop()}`
        let picRef = ref(storage, path)
        let lattitude, longitude
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                lattitude = position.coords.latitude;
                longitude = position.coords.longitude;
                const metadata = {
                    contentType: `image/${userData.profilePic.name.split('.').pop()}`,
                    customMetadata: {
                        lattitude: lattitude,
                        longitude: longitude,
                        userAgent: navigator.userAgent,
                    }
                };
            }, () => {});
        }
        try {
            let upload = await uploadBytes(picRef, userData.profilePic, metadata)
            datas.photoURL = await getDownloadURL(ref(storage, upload.ref.fullPath))
            console.log(datas)
        } catch (error) {
            response = {status: 101, message: error.code}
        }
        await updateProfile(user, datas)
        // await 
    }
    return response
}