const db = require('../common/connect');

const about_us = function(){
    this.id = about_us.id;
    this.content = about_us.content;
    this.content_en = about_us.content_en;
    this.image1 = about_us.image1;
    this.image2 = about_us.image2;
    this.image3 = about_us.image3;


}

about_us.get_about = function(resutl){

    db.query("select * from about_us where  id =0 ", function (err, about_us){
//        console.log (err,about_us);
        if(err|| about_us.length==0){
            resutl({status: "failed", msg: "không thành công"});
        }
        else     resutl (about_us[0]);
    });
}

about_us.update = function (data, result){
    db.query ("UPDATE about_us  SET content =? , content_en= ?  WHERE id= 0", [data.content, data.content_en],function (err, about_us) {
        if(err){
            console.log (err);
            result({status: "failed", msg: "Update không thành công"});

        }
        else {
            console.log("update thanh cong");
            result({status: "success", msg: "Update thành công"})
        }
    })
}

about_us.updateimg = function (data, result){
    db.query ("UPDATE about_us  SET content =? , content_en= ?, image1=?, image2 =?,image3 =?  WHERE id= 0", [data.content, data.content_en, data.image1, data.image2, data.image3],function (err, about_us) {
        if(err){
            console.log (err);
            result({status: "failed", msg: "Update không thành công"});
        }
        else {
            console.log("update thanh cong");
            result({status: "success", msg: "Update thành công"})
        }
    })
}

module.exports = about_us;