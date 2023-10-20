const about_us = require('../Models/about.model');
up = require('./upload.controller');
fs = require('fs');


exports.get_about = function(req,res){
    about_us.get_about(function(data){
        res.send({results: data })
    })
};

exports.update_about = function (req, res){
//    console.log("hello ");

        var data = req.body;
//    const files = this.req.file('image1');
    const files = req.files;
    if (!Array.isArray(files.image1)) {
        files.image1 = [];
        files.image2 = [];
        files.image3 = [];
    }
//    console.log("file lenght: "+ files.length);
    const image1 = req.files.image1[0];
    const image2 = req.files.image2[0];
    const image3 = req.files.image3[0];


    if(data.image1==""){
        console.log("update no image");
        about_us.update(data, function (temp){
            res.send({result: temp});
        })
    }else{
        var rep1 = up.upload_about(image1);
        var rep2 = up.upload_about(image2);
        var rep3 = up.upload_about(image3);
        if (rep1 instanceof Error || rep2 instanceof Error || rep3 instanceof Error){
            res.send("There are somes error, please update again");
        } else{
            about_us.get_about(function (temp){
                img1 = temp.image1.replace(/%2F/g, '/');
                img2 = temp.image2.replace(/%2F/g, '/');
                img3 = temp.image3.replace(/%2F/g, '/');
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
            data.image2 = 'app%2Fstorage%2F'+ rep2;
            data.image3 = 'app%2Fstorage%2F'+ rep3;

//            console.log("rep la:  "+ rep); //test
            about_us.updateimg(data, function (temp){
                res.send({result: temp});
            })
        }
        console.log("update image");

    }

}
