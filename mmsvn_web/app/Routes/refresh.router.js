module.exports = function(router){

    const  _JWT = require('../common/JsonWebToken');

    router.get('/refresh/', async function (req, res){
        var _rtoken = req.headers.authorization;
//        console.log("1: " +_rtoken);
        if(_rtoken){
            try{
                console.log(_rtoken);
                var authData = await _JWT.rt_check(_rtoken);
                req.auth = authData;
                const _token = await _JWT.make();
                res.send({new_access_token: _token});
            } catch (err){
                console.log(err);
                return res.send({data: "Mã không hợp lệ"});
            }
        }else {
            return res.send({data: "Chưa gửi kèm token"});
        }
    })

};