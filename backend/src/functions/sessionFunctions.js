const jwt = require("jsonwebtoken");
const { submitTokens, getTokens } = require("../firebase/functions");
const { firestoreAdmin } = require("../firebase/config");

const generateToken = (length) => {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * chars.length);
    password += chars.charAt(randomIndex);
  }
  let token = password.split(".").join();
  return token;
};

const createAuthToken = async (dataInJson) => {
  let response;
  let randomToken1 = generateToken(100);
  let randomToken2 = generateToken(100);
  let randomToken3 = generateToken(100);
  let randomToken4 = generateToken(100);
  let jsonWebToken = jwt.sign(dataInJson, process.env.SECRET_KEY_TOKEN, {
    expiresIn: "12h",
  });
  let tokenArry = jsonWebToken.split(".");
  let dbStructure = [randomToken1, randomToken2, randomToken3, randomToken4];
  let token = `${tokenArry[0]}.${randomToken1}.${randomToken2}.${tokenArry[2]}.${randomToken3}.${tokenArry[1]}.${randomToken4}`;
  await submitTokens(dbStructure, dataInJson.uid)
    .then((data) => {
      response = { ...data, token: token };
    })
    .catch((err) => {
      response = { status: 500, message: err };
    });
  return response;
};

const verifyToken = async (token, uid) => {
  try {
    const data = await getTokens(uid);
    let tokenList = token.split(".");
    let tokenPart0 = tokenList[0];
    let tokenPart1 = tokenList[1];
    let tokenPart2 = tokenList[2];
    let tokenPart3 = tokenList[3];
    let tokenPart4 = tokenList[4];
    let tokenPart5 = tokenList[5];
    let tokenPart6 = tokenList[6];
    if (
      tokenPart1 === data.stat.token1 &&
      tokenPart2 === data.stat.token2 &&
      tokenPart4 === data.stat.token3 &&
      tokenPart6 === data.stat.token4
    ) {
      try {
        const decoded = jwt.verify(
          `${tokenPart0}.${tokenPart5}.${tokenPart3}`,
          process.env.SECRET_KEY_TOKEN
        );
        console.log(decoded);
        return { stat: 200, message: decoded };
      } catch (err) {
        return { stat: 700, message: err };
      }
    } else {
      return { stat: 700, message: "Invalid token" };
    }
  } catch (errors) {
    return { stat: 700, message: errors };
  }
};

const generateUniqueId = () => {
  const timestamp = new Date().getTime().toString();
  const randomDigits = Math.floor(Math.random() * 100000000000000000)
    .toString()
    .padStart(18, "0");
  const uniqueId = timestamp + randomDigits;
  return uniqueId;
};

const updateCounts = async (data, type) => {
  let response = { status: "", message: "" };
  try {
    if (type == "postCount") {
      let postsQuery = await firestoreAdmin
        .collection("posts")
        .where("uid", "==", data.uid)
        .get();

      let updatedData = {
        posts: postsQuery.empty ? 0 : postsQuery.docs.length,
      };
      await firestoreAdmin.collection("users").doc(uid).update(updatedData);
    } else if (type == "likeCount") {
      let postConfig = firestoreAdmin
        .collection("posts")
        .where("postId", "==", data.postId);
      let postSnapshot = await postConfig.get();
      let postDocRef = postSnapshot.docs[0].ref;
      let likeCount = postSnapshot.docs[0].get("like") + 1;
      postDocRef.update({ like: likeCount });
    }
    response = { status: 200, message: "successful" };
  } catch (err) {
    response = { status: 12, message: err };
  }
  return response;
};

const isLiked = async (uid, post) => {
  let response = { status: "", message: "", posts: {} };

  try {
    if (Object.keys(post).length > 0) {
      const likeQueries = Object.keys(post).map(async (key) => {
        const querySnapshot = await firestoreAdmin
          .collection("likes")
          .where("sender", "==", uid)
          .where("postId", "==", post[key]["postId"])
          .get();

        if (!querySnapshot.empty) {
          post[key]["liked"] = true;
        } else {
          post[key]["liked"] = false;
        }
      });

      await Promise.all(likeQueries);
      response = { status: 200, message: "successful", posts: { ...post } };
    } else {
      response = { status: 200, message: "successful", posts: { ...post } };
    }
  } catch (error) {
    response = { status: 12, message: error.message, posts: { ...post } };
  }

  return response;
};

module.exports = {
  createAuthToken,
  verifyToken,
  generateUniqueId,
  updateCounts,
  isLiked,
};
