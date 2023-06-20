import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../cred/cred";
import { getRandomNumberString } from "../common";
import { updateProfile } from "firebase/auth";
import { checkUserHandle, registerUserStructure } from "../../api/endPoints";

export const updatePic = async (user, userData) => {
  let response = { status: "", message: "" };
  try {
    let dirPath = `${user.uid}/profilePic`;
    let delRef = ref(storage, dirPath);
    let dirData = await listAll(delRef);

    if (dirData.items && dirData.items.length > 0) {
      await Promise.all(dirData.items.map((item) => deleteObject(item)));
    }

    let path = `${user.uid}/profilePic/${getRandomNumberString(
      10
    )}.${userData.profilePic.name.split(".").pop()}`;
    let picRef = ref(storage, path);

    const metadata = {
      contentType: `image/${userData.profilePic.name.split(".").pop()}`,
      customMetadata: {
        lattitude: "",
        longitude: "",
        userAgent: navigator.userAgent,
      },
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          metadata.customMetadata.lattitude = position.coords.latitude;
          metadata.customMetadata.longitude = position.coords.longitude;
        },
        () => {}
      );
    }

    await uploadBytes(picRef, userData.profilePic, metadata);
    let newUrl = await getDownloadURL(picRef);
    await updateProfile(user, { photoURL: newUrl });

    response = { status: 200, message: "success", url: newUrl };
  } catch (error) {
    console.error(error);
    response = {
      status: 101,
      message: error.message || "Unknown error occurred",
    };
  }

  alert(response.message);
  return response;
};

export const updateProfileData = async (user, userData) => {
  let response = { status: "", message: "" };
  if (user.displayName === userData.displayName.toLowerCase()) {
    if (userData.profilePic) {
      let pic = await updatePic(user, userData);
      await registerUserStructure(
        user.email,
        userData.bio,
        userData.displayName.toLowerCase(),
        pic.status === 200 ? pic.url : ""
      );
      response = { status: pic.status, message: pic.message };
    }
  } else {
    let pic = await updatePic(user, userData);
    response = { status: pic.status, message: pic.message };
    if (pic.status === 200) {
      await checkUserHandle(userData.displayName).then(async (resp) => {
        if (resp.status === 200) {
          await registerUserStructure(
            user.email,
            userData.bio,
            userData.displayName.toLowerCase(),
            pic.status === 200 ? pic.url : ""
          );
          await updateProfile(user, {
            displayName: userData.displayName.toLowerCase(),
          });
          response = { status: 200, message: "success" };
        } else {
          response = { status: resp.status, message: resp.message };
        }
      });
    }
  }
  return response;
};
