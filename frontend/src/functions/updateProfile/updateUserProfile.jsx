import {
  deleteObject,
  getDownloadURL,
  getMetadata,
  listAll,
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
  let response = { status: "", message: "", url: "" };
  console.log(userData);

  try {
    if (user.photoURL) {
      let dirRef = ref(storage, user.photoURL);
      await deleteObject(dirRef);
    }

    let path = `${user.uid}/profilePic/${getRandomNumberString(
      10
    )}.${userData.profilePic.type.split("/").pop()}`;
    let picRef = ref(storage, path);

    const metadata = {
      contentType: userData.profilePic.type,
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
      url: "",
    };
  }
  return response;
};

export const updateProfileData = async (user, userData) => {
  let response = { status: "", message: "" };
  await updatePic(user, userData).then(async (respo) => {
    if (respo.status === 200) {
      if (user.displayName == userData.displayName.toLowerCase()) {
        let data = {
          bio: userData.bio,
          handle: userData.displayName.toLowerCase(),
          pic: respo.url,
        };
        await registerUserStructure(data).then((respp) => {
          response = { status: respp.status, message: respp.message };
        });
      } else {
        await checkUserHandle(userData.displayName).then(async (resp) => {
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
            response = { status: 200, message: "success" };
          } else {
            response = { status: resp.status, message: resp.message };
          }
        });
      }
    } else {
      response = { status: respo.status, message: respo.message };
    }
  });
  return response;
};
