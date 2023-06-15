import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "../../cred/cred"
import { getRandomNumberString } from "../common"
import { updateProfile } from "firebase/auth"

export const updateProfileData = async (user, userData) => {
    let response = {status: "", message: ""}
    // const { displayName, bio, profilePic } = userData
    let datas = {
        photoURL: userData.photoURL,
        displayName: userData.displayName
    }
    if (profilePic) {
        let path = `${user.uid}/profilePic/${getRandomNumberString(10)}.${profilePic.name.split('.').pop()}`
        let picRef = ref(storage, path)
        let lattitude, longitude
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                lattitude = position.coords.latitude;
                longitude = position.coords.longitude;
                console.log("Latitude: ", lattitude);
                console.log("Longitude: ", longitude);
            }, () => {});
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
        const metadata = {
            contentType: 'image',
            lattitude: lattitude,
            longitude: longitude,
            userAgent: navigator.userAgent
        };
        await uploadBytes(picRef, profilePic, metadata).then(async response => {
            await getDownloadURL(ref(storage, response.ref.fullPath)).then(downloadUrl => {
                datas.photoURL = downloadUrl
            }).catch(err => {
                response = {status: 101, message: err.code}
            })
        }).catch(error => {
            response = {status: 101, message: error.code}
        })
    }
    console.log(datas)
    await updateProfile(user, datas).then(user => {
        console.log(user)
    })
    console.log("done")
}