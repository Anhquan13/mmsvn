const group_pr = require('../Models/group_pr.model');

exports.get_list = function(req,res){
    group_pr.get_all(function(data){
        res.send({result: data})
    })
};

exports.detail = function(req,res){
    group_pr.getByid(req.params.id, function (data){
        res.send({result: data})
    });
};

exports.add_group_pr = function(req,res){
    var data = req.body;
    group_pr.create(data,function(temp){
        res.send({result: temp})
    })
}
exports.remove_group_pr = function (req, res){
    var id = req.params.id;
    group_pr.remove(id, function(temp){
        res.send({result: temp});
    })
}

exports.update_group_pr = function (req, res){
    var data = req.body;
    group_pr.update(data, function (temp){
        res.send({result: temp});
    })
}
