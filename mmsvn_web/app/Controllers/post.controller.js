const post = require('../Models/post.model');
const up = require('./upload.controller');
fs = require('fs');

var today = new Date();
const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
exports.get_list = function(req,res){
    post.get_all(function(data){
        res.send({result: data})
    })
};

exports.detail = function(req,res){
    post.getByid(req.params.id, function (data){
        res.send({result: data});
    });
};

exports.add_post = function(req,res){
    var data = req.body;
    data.cre_date = date;
    //   console.log("name là: ");
    var rep = up.photo(req);
    console.log("rep la1: "+ rep);
    if (rep instanceof Error){
        res.send(rep.message);
        console.log("rep la: "+ rep);

    } else{
        data.image = '%2Fapp%2Fstorage%2F'+ rep;
        console.log("rep la2: ");
        post.create(data, function(temp){
            res.send({result: temp})
        })
    }

}
exports.remove_post = function (req, res){
    var id = req.params.id;
    var image;
    post.getByid(req.params.id,function (data){
//       res.send({result: data})
//        console.log("data.image =" + data.image);
        image = data.image;
//        console.log("image 1 = " +image);
    });

    post.remove(id, function(temp){
        res.send({result: temp});
        console.log("image  = " +image);
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

exports.update_post = function (req, res){
    var data = req.body;
    console.log("hello " + data.id_post);
    data.edit_date = date;
    if(data.image==""){
        console.log("update no image");
        post.update(data, function (temp){
            res.send({result: temp});
        })
    }else{
        var rep = up.photo(req);
        console.log("rep la1: "+ rep);
        if (rep instanceof Error){
            res.send(rep.message);
//            console.log("rep la: "+ rep); //test
//        console.log('vao ham upload2: '+ rep.message);
        } else{   //update co image
            post.getByid(data.id_post,function (temp){
//       res.send({result: data})
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
            data.image = '%2Fapp%2Fstorage%2F'+ rep;
//            console.log("rep la:  "+ rep); //test
            post.updateimg(data, function (temp){
                res.send({result: temp }  );
            })
        }
        console.log("update image");

    }

}

