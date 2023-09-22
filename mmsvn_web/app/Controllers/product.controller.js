const product = require('../Models/product.model');
const up = require('./upload.controller');
fs = require('fs');

var today = new Date();
const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
exports.get_list = function(req,res){
    product.get_all(function(data){
        res.send({resutl: data})
    })
};

exports.detail = function(req,res){
    product.getByid(req.params.id, function (data){
        res.send({resutl: data})
    });
};

exports.add_product = function(req,res){
    var data = req.body;
 //   console.log("name là: ");
    var rep = up.photo(req);
    console.log("rep la1: "+ rep);
    if (rep === up.error){
        res.send(rep.message);
        console.log("rep la: "+ rep);
//        console.log('vao ham upload2: '+ rep.message);
    } else{
        data.image = 'app/storage/'+ rep;
        console.log("rep la:  "+ rep);
        product.create(data, function(temp){
            res.send({resutl: temp})
        })
    }

}
exports.remove_product = function (req, res){
    var id = req.params.id;
    var image;
    product.getByid(req.params.id,function (data){
//       res.send({resutl: data})
//        console.log("data.image =" + data.image);
        image = data.image;
//        console.log("image 1 = " +image);
    });

    product.remove(id, function(temp){
        res.send({result: temp});
        console.log("image  = " +image);
        fs.unlink(image , function (err) {
            if (err) throw err;
            console.log('File deleted!');
        });
    })

}

exports.update_product = function (req, res){
    var data = req.body;
    console.log("hello " + data.id_product);
    product.getByid(data.id_product,function (temp){
//       res.send({resutl: data})
        console.log("temp.image =" + temp.image);
        image = temp.image;
//        console.log("image 1 = " +image);
        fs.unlink(image , function (err) {
            if (err) throw err;
            console.log('File deleted!');
        });
    });
    data.edit_date = date;
    if(data.image==""){
        console.log("update no image");
        product.update(data, function (temp){
            res.send({resutl: temp});
        })
    }else{
        var rep = up.photo(req);
        console.log("rep la1: "+ rep);
        if (rep === up.error){
            res.send(rep.message);
//            console.log("rep la: "+ rep); //test
//        console.log('vao ham upload2: '+ rep.message);
        } else{
            data.image = 'app/storage/'+ rep;
//            console.log("rep la:  "+ rep); //test
            product.updateimg(data, function (temp){
                res.send({resutl: temp});
            })
        }
        console.log("update image");

    }

}

