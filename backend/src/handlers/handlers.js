const { firestoreAdmin } = require("../firebase/config")
const { createAuthToken, generateUniqueId } = require("../sessionFunctions/sessionFunctions")

const registerUserSetup = async (req, res) => {
    let requiredFields = ['handle', 'uid', 'email'];

    for (let field of requiredFields) {
        if (!req.body[field]) {
            return res.json({ status: 500, message: `${field.charAt(0).toUpperCase() + field.slice(1)} not provided` });
        }
    }
    let structureToSet = {
        createdAt: new Date().toISOString(),
        followers: 0,
        following: 0,
        posts: 0,
        userHandle: req.body.handle,
        uid: req.body.uid
    }
    let tokenData = {
        handle: req.body.handle,
        email: req.body.email,
        uid: req.body.uid
    }
    await firestoreAdmin.collection("users").doc(structureToSet.userHandle).set(structureToSet).then( async () => {
        let authToken = await createAuthToken(tokenData)
        res.json({status: 200, message: "User registration structure created successfully", token: authToken.token})
    }).catch(err => {
        res.json({status: 12, message: err})
    })
}

const checkHandle = async (req, res) => {
    await firestoreAdmin.collection(`users`).doc(req.body.handle).get().then(doc => {
        if (doc.exists) {
            res.json({status: 401, message: "User handle already taken"})
        } else {
            res.json({status: 200})
        }
    }).catch(err => {
        res.json({status: 500, message: err})
    })
}

const deleteUserSetup = async (req, res) => {
    if (!req.body.handle) {
        res.json({status: 500, message: "Handle not provided"})
    }
    await firestoreAdmin.collection(`users`).doc(req.body.handle).delete().then( async data => {
        res.json({status: 200, message: "User setup deleted"})
    }).catch(error => {
        res.json({status: 12, message: error})
        console.log("g")
    })
}

const createPost =  async (req, res) => {
    let requiredFields = ['uid', 'email', 'handle', 'poem', 'heading', 'img'];

    for (let field of requiredFields) {
        if (!req.body[field]) {
            return res.json({ status: 500, message: `${field.charAt(0).toUpperCase() + field.slice(1)} not provided` });
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
        postId: generateUniqueId()
    }
    await firestoreAdmin.collection(`posts`).doc().set(postData).then( async () => {
        await firestoreAdmin.doc(`users/${req.body.handle}`).get().then(async data => {
            await firestoreAdmin.doc(`users/${req.body.handle}`).update({posts: data.data().posts + 1}).then(() => {
                res.json({stat: 200, message: "Post uploaded"})
            }).catch(err => {
                res.json({stat: 12, message: err})
            })
        }).catch(err => {
            res.json({stat: 12, message: err})
        })
    }).catch(error => {
        res.json({stat: 12, message: error})
    })
}

const deletePost = async (req, res) => {
    let requiredFields = ['postId', 'handle'];
    for (let field of requiredFields) {
        if (!req.body[field]) {
            return res.json({ status: 500, message: `${field.charAt(0).toUpperCase() + field.slice(1)} not provided` });
        }
    }
    await firestoreAdmin.collection("posts").where("postId", "==", req.body.postId).where("handle", "==", req.body.handle).get().then(snapShot => {
        snapShot.forEach(doc => {
            doc.ref.delete().then( async e => {
                await firestoreAdmin.doc(`users/${req.body.handle}`).get().then(async data => {
                    await firestoreAdmin.doc(`users/${req.body.handle}`).update({posts: data.data().posts - 1}).then(() => {
                        res.json({stat: 200, message: "Post deleted"})
                    }).catch(err => {
                        res.json({stat: 12, message: err})
                    })
                }).catch(err => {
                    res.json({stat: 12, message: err})
                })
            }).catch(error => {
                res.json({statu: 12, message: error})
            })
        })
    })
}

module.exports = {
    registerUserSetup,
    deleteUserSetup,
    createPost,
    deletePost,
    checkHandle
}