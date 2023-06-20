const { realtimeAdmin } = require("./config");


const submitTokens = async(tokens, uid) => {
    let response
    let tokenData = { token1: tokens[0], token2: tokens[1], token3: tokens[2], token4: tokens[3] }
    await realtimeAdmin.ref(`${uid}/token`).set(tokenData).then(() => {
        response = { status: 200, message: "success" }
    }).catch(err => {
        response = { status: 500, message: err }
    })
    return response
}

const getTokens = async(uid) => {
    let response
    await realtimeAdmin.ref(`${uid}/token`).once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                response = { stat: snapshot.val() };
            } else { response = { stat: 10 } }
        })
        .catch((error) => {
            response = error;
        });
    return response
}

module.exports = {
    submitTokens,
    getTokens
}