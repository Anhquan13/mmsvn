const account = require('../Models/account.model');
const JWT = require('../common/JsonWebToken');
 

exports.get_list = function(req,res){
    account.get_all(function(data){
        res.send({resutl: data})
    })
};

exports.detail = function(req,res){
    account.getByid(req.params.id, function (data){
        res.send({resutl: data})
    });
};

exports.add_account = function(req,res){
    var data = req.body;
    account.create(data,function(temp){
        res.send({resutl: temp})
    })
}
exports.remove_account = function (req, res){
    var id = req.params.id;
    account.remove(id, function(temp){
        res.send({results: temp});
    })
}

exports.update_account = function (req, res){
    var data = req.body;
    account.update(data, function (temp){
        res.send({resutl: temp});
            })
}

exports.login = function (req, res){
    var data = req.body;
    account.check_login(data, async function (response){
        if(response){
            const _token = await JWT.make(response);
            const _rtoken = await JWT.rt_make(response);
            res.send({token: _token, refresh_token : _rtoken, status: true});
        }else{
            res.send({results: 'Password hoặc tên đăng nhập sai ', status: false});
        }
    })
}

