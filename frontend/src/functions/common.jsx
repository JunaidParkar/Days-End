import { sendInteraction } from "../api/endPoints";
import { logOut } from "./authentication/authentication";

export const getRandomNumberString = (digits) => {
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < digits; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const validateUser = (data, by) => {
  return new Promise((resolve, reject) => {
    if (data.status === 700) {
      logOut(by)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      resolve();
    }
  });
};

export const setLike = async (recipient, img, postId) => {
  let data = {
    type: "like",
    recipient: recipient,
    img: img,
    postId: postId,
  };
  await sendInteraction(data).then(() => {});
};
