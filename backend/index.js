const express = require('express');
const { firestoreAdmin } = require('./src/firebase/config');
const { registerUserSetup, deleteUserSetup, createPost, checkHandle, createTokenForAuthentication, fetchAllPost } = require('./src/handlers/handlers');
const { verifyToken, createAuthToken, generateUniqueId } = require('./src/sessionFunctions/sessionFunctions');
const cors = require('cors');
const { reqAuth } = require('./src/middleware/auth');


const app = express();
const port = 3000;
const corsOptions = {
  origin: ["http://localhost:5173"],
};


app.use(express.json())
app.use(cors(corsOptions));


app.post("/createToken", createTokenForAuthentication)
app.post("/checkHandle", checkHandle)
app.post("/userRegisterSetup", registerUserSetup)
app.post("/userSetupDelete", deleteUserSetup)


app.post("/getAllPost", reqAuth, fetchAllPost)


app.post("/uploadPost", createPost)
app.post("/deletePost", )
app.post("/jwt", async (req, res) => {
  let token = await createAuthToken(req.body)
  res.json(token)
})
app.post("/verify", async (req, res) => {
  let resu = await verifyToken(req.body.token, req.body.uid)
  res.json({data: resu})
})


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});