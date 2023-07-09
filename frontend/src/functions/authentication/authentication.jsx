import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../cred/cred";

export const createUser = async (email, password) => {
  let response = { status: "", message: "" };
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (data) => {
      response = { status: 200, message: "done" };
    })
    .catch((createUserError) => {
      response = { status: 101, message: createUserError.code };
    });
  return response;
};

export const loginUser = async (email, password) => {
  let response = { status: "", message: "" };
  await signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      response = { status: 200, message: "" };
    })
    .catch((error) => {
      alert(error);
      response = { status: 101, message: error.code };
    });
  return response;
};

export const logOut = () => {
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};
