const customer = require('../Models/customer.model');
const up = require('./upload.controller');
fs = require('fs');

exports.get_list = function(req,res){
    customer.get_all(function(data){
        res.send({results: data})
    })
};

exports.detail = function(req,res){
    customer.getByid(req.params.id, function (data){
        res.send({results: data})
    });
};

exports.add_customer = function(req,res){
    var data = req.body;
//    data.cre_date = date;
    //   console.log("name là: ");
    var rep = up.photo(req);
    if (rep instanceof Error){
        res.send(rep.message);
    } else{
        data.image = 'app%2Fstorage%2F'+ rep;
        console.log("rep la:  "+ rep);
        customer.create(data, function(temp){
            res.send({results: temp})
        })
    }

}
exports.remove_customer = function (req, res){
    var id = req.params.id;
    var image;
    customer.getByid(req.params.id,function (data){
//       res.send({results: data})
//        console.log("data.image =" + data.image);
        image = data.image.replace(/%2F/g, '/');
//        console.log("image 1 = " +image);
    });

    customer.remove(id, function(temp){
        res.send({results: temp});
        console.log("image  = " +image);
        fs.unlink(image , function (err) {
            if (err) throw err;
            console.log('File deleted!');
        });
    })

}

exports.update_customer = function (req, res){
    var data = req.body;
    console.log("hello " + data.id);
    if(data.image==""){
        console.log("update no image");
        customer.update(data, function (temp){
            res.send({results: temp});
        })
    }else{
        var rep = up.photo(req);
        if (rep instanceof Error){
            res.send(rep.message);
        } else{
            customer.getByid(data.id,function (temp){
                console.log("temp.image =" + temp.image);
                image = temp.image.replace(/%2F/g, '/');
//                console.log("image 1 = " +image);
                fs.unlink(image , function (err) {
                    try{
                        console.log('File deleted!');}
                    catch(err){console.log(err)}
                });
            });
            data.image = 'app%2Fstorage%2F'+ rep;
//            console.log("rep la:  "+ rep); //test
            customer.updateimg(data, function (temp){
                res.send({results: temp});
            })
        }
        console.log("update image");

    }

}

