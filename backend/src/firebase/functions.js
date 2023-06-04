const { realtimeAdmin } = require("./config");


const submitTokens = async (tokens, uid) => {
    let response
    let tokenData = {token1: tokens[0], token2: tokens[1], token3: tokens[2], token4: tokens[3]}
    await realtimeAdmin.ref(`tokens/${uid}`).set(tokenData).then(() => {
        response =  {stat: 200}
    }).catch(() => {
        response =  {stat: 500}
    })
    return response
}

const getTokens = async (uid) => {
    let response
    await realtimeAdmin.ref(`tokens/${uid}`).once('value')
    .then((snapshot) => {
        if (snapshot.exists()) {
            response = {stat: snapshot.val()};
        } else {response = {stat: 10}}
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