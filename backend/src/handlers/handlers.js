const { firestoreAdmin } = require("../firebase/config");
const {
  createAuthToken,
  generateUniqueId,
} = require("../functions/sessionFunctions");

const registerUserSetup = async (req, res) => {
  console.log(req.body);
  let requiredFields = ["data"];
  for (let field of requiredFields) {
    if (!req.body[field]) {
      return res.json({
        status: 500,
        message: `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } not provided`,
      });
    }
  }
  let postsQuery = await firestoreAdmin
    .collection("posts")
    .where("uid", "==", req.body.uid)
    .get();
  let structureToSet = req.body.data;
  structureToSet.uid = req.body.uid;
  structureToSet.updatedAt = new Date().toISOString();
  structureToSet.followers = 0;
  structureToSet.following = 0;
  structureToSet.posts = postsQuery.empty ? 0 : postsQuery.docs.length;
  req.body.data.handle === "user" ? (req.body.data.handle = "") : "";
  req.body.data.bio === "user" ? (req.body.data.bio = "") : "";
  req.body.data.pic === "user" ? (req.body.data.pic = "") : "";
  console.log(structureToSet);
  await firestoreAdmin
    .collection("users")
    .doc(req.body.uid)
    .set(structureToSet)
    .then(async () => {
      res.json({
        status: 200,
        message: "User registration structure created successfully",
      });
    })
    .catch((err) => {
      res.json({ status: 12, message: err });
    });
};

const checkHandle = async (req, res) => {
  let requiredFields = ["handle"];
  for (let field of requiredFields) {
    if (!req.body[field]) {
      return res.json({
        status: 500,
        message: `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } not provided`,
      });
    }
  }
  await firestoreAdmin
    .collection(`users`)
    .where("handle", "==", req.body.handle)
    .get()
    .then((doc) => {
      if (doc.size > 0) {
        res.json({ status: 401, message: "User handle already taken" });
      } else {
        res.json({ status: 200, message: "User handle available" });
      }
    })
    .catch((err) => {
      res.json({ status: 12, message: err });
    });
};

const deleteUserSetup = async (req, res) => {
  if (!req.body.handle) {
    res.json({ status: 500, message: "Handle not provided" });
  }
  await firestoreAdmin
    .collection(`users`)
    .doc(req.body.handle)
    .delete()
    .then(async (data) => {
      res.json({ status: 200, message: "User setup deleted" });
    })
    .catch((error) => {
      res.json({ status: 12, message: error });
    });
};

const createPost = async (req, res) => {
  let requiredFields = ["uid", "email", "handle", "poem", "heading", "img"];

  for (let field of requiredFields) {
    if (!req.body[field]) {
      return res.json({
        status: 500,
        message: `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } not provided`,
      });
    }
  }
  let postData = {
    handle: req.body.handle,
    heading: req.body.heading,
    img: req.body.img,
    poem: req.body.poem,
    like: 0,
    comment: 0,
    createdAt: new Date().toISOString(),
    postId: generateUniqueId(),
    uid: req.body.uid,
  };
  try {
    const postRef = await firestoreAdmin.collection("posts").doc();
    const userRef = await firestoreAdmin.doc(`users/${req.body.uid}`).get();

    if (!userRef.exists) {
      res.json({
        status: 401,
        message: "Handle is incorrect. Please log in again.",
      });
    } else {
      await firestoreAdmin.collection("posts").doc(postRef.id).set(postData);
      await firestoreAdmin
        .doc(`users/${req.body.uid}`)
        .update({ posts: userRef.data().posts + 1 });
      res.json({ status: 200, message: "Post uploaded" });
    }
  } catch (error) {
    res.json({
      status: 12,
      message: "An error occurred while creating the post.",
      cd: error.message || error,
    });
  }
};

const deletePost = async (req, res) => {
  let requiredFields = ["postId", "handle"];
  for (let field of requiredFields) {
    if (!req.body[field]) {
      return res.json({
        status: 500,
        message: `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } not provided`,
      });
    }
  }
  await firestoreAdmin
    .collection("posts")
    .where("postId", "==", req.body.postId)
    .where("handle", "==", req.body.handle)
    .get()
    .then((snapShot) => {
      snapShot.forEach((doc) => {
        doc.ref
          .delete()
          .then(async (e) => {
            await firestoreAdmin
              .doc(`users/${req.body.handle}`)
              .get()
              .then(async (data) => {
                await firestoreAdmin
                  .doc(`users/${req.body.handle}`)
                  .update({ posts: data.data().posts - 1 })
                  .then(() => {
                    res.json({ status: 200, message: "Post deleted" });
                  })
                  .catch((err) => {
                    res.json({ status: 12, message: err });
                  });
              })
              .catch((err) => {
                res.json({ status: 12, message: err });
              });
          })
          .catch((error) => {
            res.json({ statu: 12, message: error });
          });
      });
    });
};

const createTokenForAuthentication = async (req, res) => {
  let requiredFields = ["tokenData"];

  for (let field of requiredFields) {
    if (!req.body[field]) {
      return res.json({
        status: 500,
        message: `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } not provided`,
      });
    }
  }
  let resp = await createAuthToken(req.body.tokenData);
  console.log(resp);
  res.json(resp);
};

const fetchAllPost = async (req, res) => {
  let requiredFields = ["lastId"];
  for (let field of requiredFields) {
    if (!req.body[field]) {
      return res.json({
        status: 500,
        message: `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } not provided`,
        posts: "",
        lastPost: "",
      });
    }
  }
  try {
    let lastFetchedId;
    let query = firestoreAdmin
      .collection("posts")
      .orderBy("createdAt", "desc")
      .limit(10);
    if (req.body.lastId !== "no") {
      let lastFetchedPost = await firestoreAdmin
        .collection("posts")
        .doc(req.body.lastId)
        .get();
      query = query.startAfter(lastFetchedPost);
    }
    let snapshot = await query.get();
    let posts = {};
    snapshot.forEach((doc) => {
      let post = doc.data();
      posts[doc.id] = post;
    });
    if (Object.keys(posts).length > 0) {
      lastFetchedId = snapshot.docs[snapshot.docs.length - 1].id;
    }
    res.json({
      status: 200,
      message: "",
      posts: Object.keys(posts).length === 0 ? "no more data" : posts,
      lastPost: lastFetchedId,
    });
  } catch (error) {
    res.json({
      status: 12,
      message: "An error occurred while fetching posts.",
      posts: "",
      lastPost: "",
    });
  }
};

const getMyAllData = async (req, res) => {
  try {
    let userBasicData;
    let postData = {
      myPosts: {},
    };
    console.log("hello 1");

    const userQuerySnapshot = await firestoreAdmin
      .collection("users")
      .where("uid", "==", req.body.uid)
      .get();
    if (userQuerySnapshot.empty) {
      return res.json({ status: 500, message: "UID Incorrect", data: "" });
    } else {
      userBasicData = userQuerySnapshot.docs[0].data();
      console.log(userBasicData);
      const postQuerySnapshot = await firestoreAdmin
        .collection("posts")
        .where("handle", "==", userBasicData.handle)
        .where("uid", "==", userBasicData.uid)
        .orderBy("createdAt", "desc")
        .get();
      if (!postQuerySnapshot.empty) {
        postQuerySnapshot.forEach((doc) => {
          postData.myPosts[doc.id] = doc.data();
        });
      }
    }
    console.log("hello 2");
    res.json({
      status: 200,
      message: "",
      data: { ...userBasicData, ...postData },
    });
  } catch (error) {
    return res.json({ status: 12, message: error.message, data: "" });
  }
};

let getUsers = async (req, res) => {
  try {
    let userDatas = await firestoreAdmin.collection("users").get();
    let dataSets = {};
    userDatas.forEach((doc) => {
      if (doc.id != req.body.uid) {
        dataSets[doc.id] = doc.data();
      }
    });
    res.json({ status: 200, message: "success", data: dataSets });
  } catch (error) {
    res.json({ status: 12, message: error.message || error.code, data: "" });
  }
};

let getSpecificPost = async (req, res) => {
  let requiredFields = ["postID"];

  for (let field of requiredFields) {
    if (!req.body[field]) {
      return res.json({
        status: 500,
        message: `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } not provided`,
      });
    }
  }

  await firestoreAdmin
    .collection("posts")
    .where("postId", "==", req.body.postID)
    .get()
    .then((response) => {
      if (response.docs.length > 0 && response.docs[0].exists) {
        res.json({
          status: 200,
          message: "success",
          data: response.docs[0].data(),
        });
      } else {
        res.json({ status: "41", message: "Post not available", data: "" });
      }
    })
    .catch((err) => {
      res.json({ status: 12, message: err.message || err.code, data: "" });
    });
};

module.exports = {
  registerUserSetup,
  deleteUserSetup,
  createPost,
  deletePost,
  checkHandle,
  createTokenForAuthentication,
  fetchAllPost,
  getMyAllData,
  getUsers,
  getSpecificPost,
};
