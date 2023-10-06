const about_us = require('../Models/about.model');
up = require('./upload.controller');
fs = require('fs');


exports.get_list = function(req,res){
    about_us.get_all(function(data){
        res.send({results: data })
    })
};

exports.update_about = function (req, res){
    var data = req.body;
//    console.log("hello ");
//    data.edit_date = date;
    if(data.image1==""){
        console.log("update no image");
        product.update(data, function (temp){
            res.send({resutl: temp});
        })
    }else{
        var rep = up.photo(req);
        if (rep instanceof Error){
            res.send(rep.message);
        } else{
            product.getByid(data.id_product,function (temp){
//       res.send({resutl: data})
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
            product.updateimg(data, function (temp){
                res.send({resutl: temp});
            })
        }
        console.log("update image");

    }

}
