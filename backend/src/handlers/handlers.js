const { firestoreAdmin } = require("../firebase/config")
const { createAuthToken, generateUniqueId } = require("../sessionFunctions/sessionFunctions")

const registerUserSetup = async(req, res) => {
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
    await firestoreAdmin.collection("users").doc(structureToSet.userHandle).set(structureToSet).then(async() => {
        res.json({ status: 200, message: "User registration structure created successfully" })
    }).catch(err => {
        res.json({ status: 12, message: err })
    })
}

const checkHandle = async(req, res) => {
    await firestoreAdmin.collection(`users`).doc(req.body.handle).get().then(doc => {
        if (doc.exists) {
            res.json({ status: 401, message: "User handle already taken" })
        } else {
            res.json({ status: 200 })
        }
    }).catch(err => {
        res.json({ status: 500, message: err })
    })
}

const deleteUserSetup = async(req, res) => {
    if (!req.body.handle) {
        res.json({ status: 500, message: "Handle not provided" })
    }
    await firestoreAdmin.collection(`users`).doc(req.body.handle).delete().then(async data => {
        res.json({ status: 200, message: "User setup deleted" })
    }).catch(error => {
        res.json({ status: 12, message: error })
    })
}

const createPost = async(req, res) => {
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
    try {
        const postRef = await firestoreAdmin.collection('posts').doc();
        const userRef = await firestoreAdmin.doc(`users/${req.body.handle}`).get();

        if (!userRef.exists) {
            res.json({ status: 401, message: 'Handle is incorrect. Please log in again.' });
        } else {
            await firestoreAdmin.collection('posts').doc(postRef.id).set(postData);
            await firestoreAdmin.doc(`users/${req.body.handle}`).update({ posts: userRef.data().posts + 1 });
            res.json({ status: 200, message: 'Post uploaded' });
        }
    } catch (error) {
        res.json({ status: 500, message: 'An error occurred while creating the post.' });
    }
}

const deletePost = async(req, res) => {
    let requiredFields = ['postId', 'handle'];
    for (let field of requiredFields) {
        if (!req.body[field]) {
            return res.json({ status: 500, message: `${field.charAt(0).toUpperCase() + field.slice(1)} not provided` });
        }
    }
    await firestoreAdmin.collection("posts").where("postId", "==", req.body.postId).where("handle", "==", req.body.handle).get().then(snapShot => {
        snapShot.forEach(doc => {
            doc.ref.delete().then(async e => {
                await firestoreAdmin.doc(`users/${req.body.handle}`).get().then(async data => {
                    await firestoreAdmin.doc(`users/${req.body.handle}`).update({ posts: data.data().posts - 1 }).then(() => {
                        res.json({ status: 200, message: "Post deleted" })
                    }).catch(err => {
                        res.json({ status: 12, message: err })
                    })
                }).catch(err => {
                    res.json({ status: 12, message: err })
                })
            }).catch(error => {
                res.json({ statu: 12, message: error })
            })
        })
    })
}

const createTokenForAuthentication = async(req, res) => {
    let requiredFields = ['tokenData'];

    for (let field of requiredFields) {
        if (!req.body[field]) {
            return res.json({ status: 500, message: `${field.charAt(0).toUpperCase() + field.slice(1)} not provided` });
        }
    }
    let resp = await createAuthToken(req.body.tokenData)
    res.json(resp)
}

const fetchAllPost = async(req, res) => {
    let requiredFields = ['lastId'];
    for (let field of requiredFields) {
        if (!req.body[field]) {
            return res.json({ status: 500, message: `${field.charAt(0).toUpperCase() + field.slice(1)} not provided`, posts: "", lastPost: "" });
        }
    }
    try {
        let lastFetchedId
        let query = firestoreAdmin.collection('posts').orderBy('createdAt', 'desc').limit(10);
        if (req.body.lastId !== "no") {
            let lastFetchedPost = await firestoreAdmin.collection('posts').doc(req.body.lastId).get();
            query = query.startAfter(lastFetchedPost);
        }
        let snapshot = await query.get();
        let posts = {};
        snapshot.forEach(doc => {
            let post = doc.data();
            posts[doc.id] = post;
        });
        if (Object.keys(posts).length > 0) {
            lastFetchedId = snapshot.docs[snapshot.docs.length - 1].id;
        }
        res.json({ status: 200, message: "", posts: Object.keys(posts).length === 0 ? "no more data" : posts, lastPost: lastFetchedId });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'An error occurred while fetching posts.', posts: "", lastPost: "" });
    }
}

module.exports = {
    registerUserSetup,
    deleteUserSetup,
    createPost,
    deletePost,
    checkHandle,
    createTokenForAuthentication,
    fetchAllPost
}