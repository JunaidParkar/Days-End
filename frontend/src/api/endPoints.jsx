import { logOut } from "../functions/authentication/authentication";
import { validateUser } from "../functions/common";
import api from "./api";

export const registerUserStructure = async (data) => {
  let response = { status: "", message: "" };
  await api
    .post("/userRegisterSetup", { data: data })
    .then(async (data) => {
      await validateUser(data.data, "userStructure validator").then(() => {
        response = { status: data.data.status, message: data.data.message };
      });
    })
    .catch((error) => {
      response = { status: 999, message: error };
    });
  return response;
};

export const checkUserHandle = async (handle) => {
  let response = { status: "", message: "" };
  await api
    .post("/checkHandle", { handle: handle })
    .then(async (data) => {
      await validateUser(data.data, "checkHandle validator").then(() => {
        response = { status: data.data.status, message: data.data.message };
      });
    })
    .catch((error) => {
      response = { status: 999, message: error };
    });
  return response;
};

export const getAuthToken = async (data) => {
  let response = { status: "", message: "" };
  await api
    .post("/createToken", { tokenData: data })
    .then((token) => {
      if (token.data.status === 200) {
        localStorage.setItem("authToken", token.data.token);
        response = { status: 200, message: "tokenCreated" };
      } else {
        response = token.data;
      }
    })
    .catch((error) => {
      response = { status: 99, message: error };
    });
  console.log(response);
  return response;
};

export const getAllPost = async (id) => {
  let response = {
    status: "",
    message: "",
    posts: {},
    lastPost: "",
    likes: "",
  };
  await api
    .post("/getAllPost", { lastId: id })
    .then(async (respo) => {
      await validateUser(respo.data).then(() => {
        response = {
          status: respo.data.status,
          message: respo.data.message,
          posts: respo.data.posts,
          lastPost: respo.data.lastPost,
          likes: respo.data.likes,
        };
      });
    })
    .catch((error) => {
      response = { status: 999, message: error, posts: {}, lastPost: "" };
    });
  return response;
};

export const getAllUsers = async () => {
  let response = { status: "", message: "", data: {} };
  await api
    .post("/getUsers")
    .then(async (resp) => {
      await validateUser(resp.data).then(() => {
        response = { ...resp.data };
      });
    })
    .catch((error) => {
      response = {
        status: 999,
        message: error.message || error,
        data: "",
      };
    });
  return response;
};

export const getAllOfMyDatas = async () => {
  let response = { status: "", message: "", data: "" };
  await api
    .post("/getMyData")
    .then(async (respo) => {
      await validateUser(respo.data).then(() => {
        response = { ...respo.data };
      });
    })
    .catch((err) => {
      response = { status: 999, message: err.message || err, data: "" };
    });
  return response;
};

export const uploadPost = async (data) => {
  let response = { status: "", message: "" };
  await api
    .post("/uploadPost", data)
    .then(async (respo) => {
      await validateUser(respo.data).then(() => {
        response = { ...respo.data };
      });
    })
    .catch((err) => {
      response = { status: 999, message: err.message || err };
    });
  return response;
};

export const updatePost = async (data) => {
  let response = { status: "", message: "" };
  await api
    .post("/updatePost", data)
    .then(async (respo) => {
      await validateUser(respo.data).then(() => {
        response = { ...respo.data };
      });
    })
    .catch((err) => {
      response = { status: 999, message: err.message || err };
    });
  return response;
};

export const getSpecificPost = async (id) => {
  let response = { status: "", message: "", data: "", liked: "" };
  await api
    .post("/getSpecificPost", { postID: id })
    .then((respo) => {
      response = { ...respo.data };
    })
    .catch((err) => {
      response = {
        status: 999,
        message: err.message || err,
        data: "",
        like: "",
      };
    });
  return response;
};

export const deletePost = async (data) => {
  let response = { status: "", message: "" };
  await api
    .post("/deletePost", data)
    .then(async (data) => {
      await validateUser(data.data).then(() => {
        response = { ...data.data };
      });
    })
    .catch((err) => {
      response = { status: 999, message: err.message || err, data: "" };
    });
  return response;
};

export const sendInteraction = async (data) => {
  let response = { status: "", message: "" };
  await api
    .post("/setInteraction", data)
    .then(async (resp) => {
      await validateUser(data.data).then(() => {
        response = { ...resp.data };
      });
    })
    .catch((err) => {
      response = { status: 999, message: err.message || err, data: "" };
    });
  return response;
};
