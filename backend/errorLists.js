// GLOBAL RESPONSE

let response = [
  {
    status: 500,
    meaning: "Data is missing while post request is made",
  },
  {
    status: 12,
    meaning: "Firebase error",
  },
  {
    status: 700,
    meaning:
      "Server client authentication failed. Reason will be send via message key in response",
  },
  {
    status: 200,
    meaning: "Request fulfilled succesfully",
  },
];

// let jwt = [{
//         "data": {
//             "stat": 19,
//             "message": {
//                 "name": "TokenExpiredError",
//                 "message": "jwt expired",
//                 "expiredAt": "2023-06-01T08:00:17.000Z"
//             }
//         }
//     },
//     {
//         "data": {
//             "stat": 12,
//             "message": "Invalid token"
//         }
//     },
//     {
//         "data": {
//             "stat": 500,
//             "msg": error
//         }
//     }
// ]

// let getMyData = [{
//         "status": 500,
//         "message": "UID Incorrect"
//     },
//     {
//         "status": 200,
//         "data": {}
//     },
//     {
//         "status": 300,
//         "message": ""
//     }
// ]

let userRegisterSetup = [];

let checkHandle = [
  {
    status: 401,
    message: "User handle already taken",
  },
];

let getAllPost = [];

let getSpecificPost = [
  {
    status: 41,
    message: "Post not available",
  },
];
