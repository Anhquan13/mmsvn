const banner = require('../Models/banner.model');
up = require('./upload.controller');
fs = require('fs');

var today = new Date();
const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
exports.get_list = function(req,res){
    banner.get_all(function(data){
        res.send({resutl: data})
    })
};

exports.detail = function(req,res){
    banner.getByid(req.params.id, function (data){
        res.send({resutl: data})
    });
};
/*
exports.add_banner = function(req,res){
    var data = req.body;
    //   console.log("name là: ");
    var rep = up.photo(req);
    console.log("rep la1: "+ rep);
    if (rep instanceof Error){
        res.send(rep.message);
        console.log("rep la: "+ rep);
//        console.log('vao ham upload2: '+ rep.message);
    } else{
        data.image = 'app/storage/'+ rep;
        console.log("rep la:  "+ rep);
        banner.create(data, function(temp){
            res.send({resutl: temp})
        })
    }

}

exports.remove_banner = function (req, res){
    var id = req.params.id;
    var image;
    banner.getByid(req.params.id,function (data){
//       res.send({resutl: data})
//        console.log("data.image =" + data.image);
        image = data.image;
//        console.log("image 1 = " +image);
    });

    banner.remove(id, function(temp){
        res.send({result: temp});
        console.log("image  = " +image);
        fs.unlink(image , function (err) {
            if (err) throw err;
            console.log('File deleted!');
        });
    })

}
*/
exports.update_banner = function (req, res){
    var data = req.body;
    console.log("hello " + data.id_bn);
    if(data.image==""){
        console.log("chưa có ảnh");
        res.send("Nhập ảnh vô bro ei!!!");
    }else{
        var rep = up.photo(req);
//        console.log("rep la1: "+ rep);
        if (rep instanceof Error){
            res.send(rep.message);

        } else{
            banner.getByid(data.id_bn,function (temp){
                console.log("temp.link =" + temp.link);
                image = temp.link;
//        console.log("image 1 = " +image);
                fs.unlink(image , function (err) {
                    try{ console.log(image + " ko có trong db");}
                    catch {console.log('File deleted!');}
                });
            });
            data.link = 'app%2Fstorage%2F'+ rep;
//            console.log("rep la:  "+ rep); //test
            banner.update(data, function (temp){
                res.send({resutl: temp});
            })
        }

    }

}