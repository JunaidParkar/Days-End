const express = require("express");
const { firestoreAdmin } = require("./src/firebase/config");
const {
  registerUserSetup,
  deleteUserSetup,
  createPost,
  checkHandle,
  createTokenForAuthentication,
  fetchAllPost,
  getMyAllData,
  getUsers,
  getSpecificPost,
  updatePost,
  deletePost,
} = require("./src/handlers/handlers");
const {
  createAuthToken,
  updateCounts,
} = require("./src/functions/sessionFunctions");
const cors = require("cors");
const { reqAuth } = require("./src/middleware/auth");

const app = express();
const port = 3000;
const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(express.json());
app.use(cors(corsOptions));

app.post("/createToken", createTokenForAuthentication);

app.post("/checkHandle", reqAuth, checkHandle);

app.post("/userRegisterSetup", reqAuth, registerUserSetup);

app.post("/userSetupDelete", reqAuth, deleteUserSetup);

app.post("/getUsers", reqAuth, getUsers);

app.post("/getAllPost", fetchAllPost);

app.post("/getMyData", reqAuth, getMyAllData);

app.post("/getSpecificPost", getSpecificPost);

app.post("/uploadPost", reqAuth, createPost);
app.post("/setInteraction", reqAuth, async (req, res) => {
  let requiredFields = ["recipient", "type", "img"];

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
  try {
    if (req.body.type == "like") {
      let requiredFields = ["postId"];
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
      let data = {
        sender: req.body.uid,
        senderImg: req.body.img,
        recipient: req.body.recipient,
        postId: req.body.postId,
        createdAt: new Date().toISOString(),
        status: "unread".toLowerCase(),
      };
      let ref = firestoreAdmin.collection("likes").doc();
      await firestoreAdmin.collection("likes").doc(ref.id).set(data);
      let likeUpdate = await updateCounts(
        { postId: req.body.postId },
        "likeCount"
      );
      if (likeUpdate.status == 12) {
        res.json({
          status: 200,
          message: `Successfull but ${likeUpdate.message}`,
        });
      } else {
        res.json({ status: 200, message: "Successful" });
      }
    } else if (req.body.type == "comment") {
      let requiredFields = ["comment", "postId"];
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
    }
  } catch (err) {
    res.json({ status: 12, message: err });
  }
});
app.post("/updatePost", reqAuth, updatePost);
app.post("/deletePost", reqAuth, deletePost);

app.post("/jwt", async (req, res) => {
  let token = await createAuthToken(req.body);
  res.json(token);
});
app.post("/verify", async (req, res) => {
  res.json({ key: process.env.SECRET_KEY_TOKEN });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
