const product = require('../Models/product.model');
const up = require('./upload.controller');
fs = require('fs');

var today = new Date();
const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();


exports.get_list = function(req,res){
    product.get_all(function(data){
        res.send({results: data})
    })
};

exports.detail = function(req,res){
    product.getByid(req.params.id, function (data){
        res.send({results: data})
    });
};

exports.add_product = function(req,res){
    var data = req.body;
    data.cre_date = date;
 //   console.log("name là: ");
    var rep = up.photo(req);
//    console.log("befor if: "+ up.error);

    if (rep instanceof Error){
//        console.log("if true: "+ rep);
        res.send(rep.message);

        console.log('uploaded '+ rep.message);
    } else {
        data.image = '%2Fapp%2Fstorage%2F'+ rep;
        console.log("if false:  "+ rep);
        product.create(data, function(temp){
            res.send({results: temp})
        })
    }

}
exports.remove_product = function (req, res){
    var id = req.params.id;
    var image;
    product.getByid(req.params.id,function (data){
//       res.send({results: data})
//        console.log("data.image =" + data.image);
        image = data.image.replace(/%2F/g, '/');
//        console.log("image 1 = " +image);
    });

    product.remove(id, function(temp){
        res.send({results: temp});
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
exports.update_product = async function (req, res){
    var data = req.body;
    console.log("hello " + data.id_product);
    data.edit_date = date;

    if(data.image==""){

        console.log("update no image");
        product.update(data, function (temp){
            res.send({temp});
        })
    }else{
        var rep = up.photo(req);
        if (rep instanceof Error){
            res.send(rep.message);
        } else {
            await  product.getByid(data.id_product, function (temp) {
                if (temp.err === "error") {
                    console.log(temp);
                    res.send({result: temp});
                } else {
                    image = temp.image.replace(/%2F/g, '/');

                    console.log("image 1 = " +image);
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
                    data.image = 'app%2Fstorage%2F' + rep;
//            console.log("rep la:  "+ rep); //test
                    product.updateimg(data,  function (temp) {
                        res.send({result: temp});
                        console.log("update image");
                    })
                }
            });


        }
    }

}



