let jwt = [{
        "data": {
            "stat": 19,
            "message": {
                "name": "TokenExpiredError",
                "message": "jwt expired",
                "expiredAt": "2023-06-01T08:00:17.000Z"
            }
        }
    },
    {
        "data": {
            "stat": 12,
            "message": "Invalid token"
        }
    },
    {
        "data": {
            "stat": 500,
            "msg": error
        }
    }
]

let getMyData = [{
        "status": 500,
        "message": "UID Incorrect"
    },
    {
        "status": 200,
        "data": {}
    },
    {
        "status": 300,
        "message": ""
    }
]