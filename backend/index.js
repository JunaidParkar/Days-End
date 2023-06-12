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
app.post("/getMyData", async(req, res) => {
    let requiredFields = ['uid'];

    for (let field of requiredFields) {
        if (!req.body[field]) {
            return res.json({ status: 500, message: `${field.charAt(0).toUpperCase() + field.slice(1)} not provided` });
        }
    }

    try {
        let userQuerySnapshot = await firestoreAdmin.collection('users').where('uid', '==', req.body.uid).get();

        if (userQuerySnapshot.empty) {
            return res.json({ status: 500, message: "UID Incorrect" });
        }

        let userData = userQuerySnapshot.docs[0].data();
        return res.json({ status: 200, data: userData });
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.json({ status: 300, message: error.code });
    }
})


app.post("/uploadPost", createPost)
app.post("/deletePost", )
app.post("/jwt", async(req, res) => {
    let token = await createAuthToken(req.body)
    res.json(token)
})
app.post("/verify", async(req, res) => {
    let resu = await verifyToken(req.body.token, req.body.uid)
    res.json({ data: resu })
})


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});