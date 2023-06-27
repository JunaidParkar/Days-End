const jwt = require("jsonwebtoken");
const { submitTokens, getTokens } = require("../firebase/functions");

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
    console.log("gtk 1");
    const data = await getTokens(uid);
    console.log("gtk");
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
        const decoded = await jwt.verify(
          `${tokenPart0}.${tokenPart5}.${tokenPart3}`,
          process.env.SECRET_KEY_TOKEN
        );
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

module.exports = {
  createAuthToken,
  verifyToken,
  generateUniqueId,
};
