const about_us = require('../Models/about.model');
up = require('./upload.controller');
fs = require('fs');


exports.get_about = function(req,res){
    about_us.get_about(function(data){
        res.send({results: data })
    })
};

exports.update_about = function (req, res){
    console.log("hello ");
    var data = req.body;
//    const files = this.req.file('image1');
    const files = req.file;
    console.log("file lenght: "+ files.length);
    const image1 = files[0];
    const image2 = files[1];
    const image3 = files[2];
//    data.edit_date = date;
    if(data.image1==""){
        console.log("update no image");
        product.update(data, function (temp){
            res.send({resutl: temp});
        })
    }else{
        var rep1 = up.upload_post(image1);
        var rep2 = up.upload_post(image2);
        var rep3 = up.upload_post(image3);
        if (rep1 instanceof Error || rep2 instanceof Error || rep3 instanceof Error){
            res.send("There are somes error, please update again");
        } else{
            product.get_about(function (temp){
//       res.send({resutl: data})
                console.log("temp.image =" + temp.image);
                img1 = temp.image1;
                img2 = temp.image2;
                img3 = temp.image3;
//                console.log("image 1 = " +image);
                try {
                    fs.unlink(img1, function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('File1 deleted!');
                        }
                    });
                    fs.unlink(img2, function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('File2 deleted!');
                        }
                    });
                    fs.unlink(img3, function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('File3 deleted!');
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
            data.image1 = 'app%2Fstorage%2F'+ rep1;

//            console.log("rep la:  "+ rep); //test
            product.updateimg(data, function (temp){
                res.send({resutl: temp});
            })
        }
        console.log("update image");

    }

}
