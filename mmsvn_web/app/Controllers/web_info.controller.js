const webinf = require('../Models/web_info.model');

exports.get_list = function(req,res){
    webinf.get_all(function(data){
        res.send({results: data})
    })
};

exports.detail = function(req,res){
    webinf.getByid(req.params.id, function (data){
        res.send({results: data})
    });
};
/*
exports.add_webinf = function(req,res){
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
        webinf.create(data, function(temp){
            res.send({results: temp})
        })
    }

}

exports.remove_webinf = function (req, res){
    var id = req.params.id;
    var image;
    webinf.getByid(req.params.id,function (data){
//       res.send({results: data})
//        console.log("data.image =" + data.image);
        image = data.image;
//        console.log("image 1 = " +image);
    });

    webinf.remove(id, function(temp){
        res.send({resultss: temp});
        console.log("image  = " +image);
        fs.unlink(image , function (err) {
            if (err) throw err;
            console.log('File deleted!');
        });
    })

}
*/
exports.update_webinf = function (req, res){
    var data = req.body;
    webinf.update(data, function (temp){
        res.send({results: temp});
    })
}