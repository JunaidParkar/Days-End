import {
  deleteObject,
  getBlob,
  getDownloadURL,
  getMetadata,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../cred/cred";
import { getRandomNumberString } from "../common";
import { updateProfile } from "firebase/auth";
import { checkUserHandle, registerUserStructure } from "../../api/endPoints";

const checkIfDirectoryExists = async (dirRef) => {
  try {
    await getMetadata(dirRef);
    return true; // Directory exists
  } catch (error) {
    console.error(error);
    if (error.code === "storage/object-not-found") {
      return false; // Directory does not exist
    } // Other errors are propagated
  }
};

export const updatePic = async (user, userData) => {
  try {
    // let pDoc = doc();
    let pRef = ref(storage, "account.png");
    let pBlob = await getBlob(pRef);
    let url = await getDownloadURL(pRef);
    // let userProfilePic = await getDownloadURL(userData.profilePic);

    if (user.photoURL && user.photoURL !== url) {
      let dirRef = ref(storage, user.photoURL);
      await deleteObject(dirRef);
    }

    if (pBlob === userData.profilePic) {
      await updateProfile(user, { photoURL: url });
      return { status: 200, message: "success", url: url };
    } else {
      let path = `${user.uid}/profilePic/${getRandomNumberString(
        10
      )}.${userData.profilePic.type.split("/").pop()}`;
      let picRef = ref(storage, path);

      const metadata = {
        contentType: userData.profilePic.type,
        customMetadata: {
          latitude: "",
          longitude: "",
          userAgent: navigator.userAgent,
        },
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            metadata.customMetadata.latitude = position.coords.latitude;
            metadata.customMetadata.longitude = position.coords.longitude;
          },
          () => {}
        );
      }

      await uploadBytes(picRef, userData.profilePic, metadata);
      let newUrl = await getDownloadURL(picRef);
      await updateProfile(user, { photoURL: newUrl });

      return { status: 200, message: "success", url: newUrl };
    }
  } catch (error) {
    console.error(error);
    return {
      status: 101,
      message: error.message || "Unknown error occurred",
      url: "",
    };
  }
};

export const updateProfileData = async (user, userData) => {
  try {
    const respo = await updatePic(user, userData);
    if (respo.status === 200) {
      if (user.displayName === userData.displayName.toLowerCase()) {
        let data = {
          bio: userData.bio,
          handle: userData.displayName.toLowerCase(),
          pic: respo.url,
        };
        await registerUserStructure(data);
      } else {
        const resp = await checkUserHandle(userData.displayName);
        if (resp.status === 200) {
          let data = {
            bio: userData.bio,
            handle: userData.displayName.toLowerCase(),
            pic: respo.url,
          };
          await registerUserStructure(data);
          await updateProfile(user, {
            displayName: userData.displayName.toLowerCase(),
          });
        } else {
          return { status: resp.status, message: resp.message };
        }
      }
      return { status: 200, message: "success" };
    } else {
      return { status: respo.status, message: respo.message };
    }
  } catch (error) {
    console.error(error);
    return {
      status: 101,
      message: error.message || "Unknown error occurred",
    };
  }
};
