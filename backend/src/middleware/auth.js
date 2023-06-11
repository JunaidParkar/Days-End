const { verifyToken } = require('../sessionFunctions/sessionFunctions');

const reqAuth = async (req, res, next) => {
    let idToken;
    console.log(req.headers.authorization)
    if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        if (!req.body.uid) {
            res.json({status: 700, message: "UID not provided"})
        }
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
        return res.json({status: 700, message: "Unauthorized"});
    }
        
    await verifyToken(idToken, req.body.uid).then(data => {
        if (data.stat === 200) {
            return next()
        } else {
            res.json({status: data.stat, message: data.message})
        }
    }).catch(error => {
        res.json({status: 700, message: error})
    })
    console.log(idToken)
};

module.exports = {
    reqAuth
}