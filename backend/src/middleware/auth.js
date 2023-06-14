const { verifyToken } = require('../functions/sessionFunctions');

const reqAuth = async(req, res, next) => {
    let idToken;
    // console.log(req.body.uid)
    console.log(req.body)
    console.log(req.headers)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        if (!req.body.uid) {
            res.json({ status: 700, message: "UID not provided" })
        }
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
        return res.json({ status: 700, message: "Unauthorized" });
    }
    console.log(idToken)

    await verifyToken(idToken, req.body.uid).then(data => {
        if (data.stat === 200) {
            return next()
        } else {
            res.json({ status: data.stat, message: data.message })
        }
    }).catch(error => {
        res.json({ status: 700, message: error })
    })
};

module.exports = {
    reqAuth
}