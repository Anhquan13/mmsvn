db = require('../common/connect');

const webinf = function(){
    this.id = webinf.id;
    this.address = webinf.address;
    this.address_en = webinf.address_en;
    this.phone_num = webinf.phone_num;
    this.email = webinf.email;
    this.link1 = webinf.link1;
    this.link2 = webinf.link2;
    this.link3 = webinf.link3
}

webinf.get_all = function(resutl){

    db.query("select * from web_inf", function (err,webinf){
        if(err){
            resutl({status: "success", msg: "Khong co infomation"});
        }
        else     resutl(webinf);
    });
}
webinf.getByid = function(id, resutl  ){
    console.log(id);
    db.query("select * from web_inf where id = ?",id,function (err,webinf){
        console.log (err,webinf);
        if(err|| webinf.length==0){
            resutl({status: "success", msg: "Khong co thong tin nay"});
        }
        else     resutl ( webinf[0]);
    });
}
/* webinf ko có update hay remove, chinh sưa 5 bức hinh cũ thôi

webinf.create = function(data, resutl){
    db.query("INSERT INTO webinf set ?", data,function (err,webinf){
        console.log (err, webinf);
        if(err){
            resutl("lỗi cmnr");
        } else resutl({data});
//        console.log (err, webinf);
    })

}

webinf.remove = function(id, resutl){
    db.query("DELETE FROM webinf WHERE id =?", id, function (err, webinf){
        if(err){
            resutl(null);
        }
        else{
            resutl("xóa webinf " + id +" thành công!!!!")
        }
    })
}
*/
webinf.update = function (data, result){
    try {
        const webinfData = db.query("UPDATE web_inf SET adress= ?, adress_en =?, phone_num=?, email=?, link1=?,link2=?,link3=? WHERE id=?", [data.adress, data.adress_en, data.phone_num, data.email, data.link1, data.link2, data.link3, data.id], function (err, webinf){
            if (webinfData.error) {
                throw webinfData.error;
            }
            result({status: "success", msg: "Update thành công"});
//            console.log(webinfData); // fixed
        });

    } catch (err) {
        console.log(err);
        result({status: "failed", msg: "Update không thành công", error: err });
    }
};



module.exports = webinf;
