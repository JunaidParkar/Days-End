import { ref, uploadBytes } from "firebase/storage"
import { storage } from "../../cred/cred"
import compressImage from "./imageCompresser"
import { getRandomNumberString } from "../common"

export const updateProfile = async (user, image, userName, bio) => {
    let authData = {
        photoURL: "",
        displayName: ""
    }
    if (user.photoURL !== null || user.photoURL !== "") {
        
    }
    compressImage(image, 1024*500).then((newImage) => {
        const randomName = `${getRandomNumberString(10)}.${newImage.name.split('.').pop()}`;
        const fileRef = ref(storage, `${user.uid}/profilePic/${randomName}`);
        // return fileRef(newImage)
        return uploadBytes(fileRef, image)
    }).then((snapshot) => {
        console.log('Image uploaded successfully:', snapshot);
    }).catch((error) => {
        console.log('Error uploading image:', error);
    });
    // await ref(storage, `${user.uid}/profilePicture/${image.name}`)
    // if (user.photoURL) {}
}