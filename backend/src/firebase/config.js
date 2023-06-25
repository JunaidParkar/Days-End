const admin = require("firebase-admin");
const env = require("dotenv");

env.config();

let serviceAccount = require("./key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const firestoreAdmin = admin.firestore();
const realtimeAdmin = admin.database();

module.exports = {
    admin,
    firestoreAdmin,
    realtimeAdmin,
};