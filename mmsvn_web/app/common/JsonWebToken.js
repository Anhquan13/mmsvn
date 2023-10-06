const jwt = require("jsonwebtoken");
const _APP = require("./_APP");
const _REFRESH = require("./_REFRESH");

// make -> tạo mã


let make = function (user){
    return new Promise(function (resolve, reject){
        jwt.sign(
            {data: user},
            _APP.ACCESS_TOKEN,
            {
                algorithm: "HS256",
                expiresIn: _APP.TOKEN_TIME_LIFE,
            },
            function (err,_token){
                if(err){
                    return reject(err)
                } return resolve(_token)
            }

        );

     });
};

// verify -> check mã
 let check = function (token){
     return new Promise(function (resolve , reject){
         jwt.verify(token, _APP.ACCESS_TOKEN, function (err, data){
             if(err){
                 return reject(err);
             } return resolve(data);
         });
     });
 }


//----------------- Refresh token
let rt_make = function (user){
    return new Promise(function (resolve, reject){
        jwt.sign(
            {data: user},
            _REFRESH.REFRESH_TOKEN,
            {
                algorithm: "HS256",
                expiresIn: _REFRESH.R_TOKEN_TIME_LIFE,
            },
            function (err,_token){
                if(err){
                    return reject(err)
                } return resolve(_token)
            }

        );

    });
};

// verify -> check mã
let rt_check = function (token){
    return new Promise(function (resolve , reject){
        jwt.verify(token, _REFRESH.REFRESH_TOKEN, function (err, data){
            if(err){
                return reject(err);
            } return resolve(data);
        });
    });
}
module.exports = {
    make: make,
    check: check,
    rt_make : rt_make,
    rt_check : rt_check,
};
