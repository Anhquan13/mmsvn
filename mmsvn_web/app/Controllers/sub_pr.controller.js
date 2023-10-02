const sub = require('../Models/sub_pr.model');
const up = require('./upload.controller');
fs = require('fs');

var today = new Date();
const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
exports.get_list = function(req,res){
    sub.get_all(function(data){
        res.send({results: data})
    })
};

exports.detail = function(req,res){
    sub.getByid(req.params.id, function (data){
        res.send({results: data})
    });
};

exports.add_sub = function(req,res){
    var data = req.body;
    data.cre_date = date;
    //   console.log("name là: ");
    var rep = up.photo(req);
    console.log("rep la1: "+ rep);
    if (rep instanceof Error){
        res.send(rep.message);
        console.log("rep la: "+ rep);
//        console.log('vao ham upload2: '+ rep.message);
    } else{
        data.image = '%2Fapp%2Fstorage%2F'+ rep;
        console.log("rep la:  "+ rep);
        sub.create(data, function(temp){
            res.send({results: temp})
        })
    }

}
exports.remove_sub = function (req, res){
    var id = req.params.id;
    var image;
    sub.getByid(req.params.id,function (data){
//       res.send({results: data})
//        console.log("data.image =" + data.image);
        image = data.image;
//        console.log("image 1 = " +image);
    });

    sub.remove(id, function(temp){
        res.send({results: temp});
//        console.log("image  = " +image);
        try {
            fs.unlink(image, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('File deleted!');
                }
            });
        } catch (err) {
            if (err.code === 'ENOENT') {
                console.log('File not found');
            } else {
                throw err;
            }
        }
    })

}

exports.update_sub = function (req, res){
    var data = req.body;
    console.log("hello " + data.id_sub);
    data.edit_date = date;
    if(data.image==""){
        console.log("update no image");
        sub.update(data, function (temp){
            res.send({results: temp});
        })
    }else{
        var rep = up.photo(req);
        if (rep instanceof Error){
            res.send(rep.message);
//            console.log("rep la: "+ rep); //test
//        console.log('vao ham upload2: '+ rep.message);
        } else{
            sub.getByid(data.id_sub,function (temp){
//       res.send({results: data})
                console.log("temp.image =" + temp.image);
                image = temp.image;
//                console.log("image 1 = " +image);
                try {
                    fs.unlink(image, function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('File deleted!');
                        }
                    });
                } catch (err) {
                    if (err.code === 'ENOENT') {
                        console.log('File not found');
                    } else {
                        throw err;
                    }
                }
            });
            data.image = 'app%2Fstorage%2F'+ rep;
//            console.log("rep la:  "+ rep); //test
            sub.updateimg(data, function (temp){
                res.send({results: temp});
            })
        }
        console.log("update image");

    }

}

