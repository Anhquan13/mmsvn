db = require('../common/connect');

const banner = function(){
    this.id_bn = banner.id_bn;
    this.link = banner.link;
}

banner.get_all = function(resutl){

    db.query("select * from banner", function (err,banner){
        if(err){
            resutl("hêloojfd");
        }
        else     resutl(banner);
    });
}
banner.getByid = function(id_bn, resutl  ){
    console.log(id_bn);
    db.query("select * from banner where id_bn = ?",id_bn,function (err,banner){
        console.log (err,banner);
        if(err|| banner.length==0){
            resutl("hêlofojcfd");
        }
        else     resutl ( banner[0]);
    });
}
/* banner ko có update hay remove, chinh sưa 5 bức hinh cũ thôi

banner.create = function(data, resutl){
    db.query("INSERT INTO banner set ?", data,function (err,banner){
        console.log (err, banner);
        if(err){
            resutl("lỗi cmnr");
        } else resutl({data});
//        console.log (err, banner);
    })

}

banner.remove = function(id_bn, resutl){
    db.query("DELETE FROM banner WHERE id_bn =?", id_bn, function (err, banner){
        if(err){
            resutl(null);
        }
        else{
            resutl("xóa banner " + id_bn +" thành công!!!!")
        }
    })
}
*/
banner.update = function (data, result){
    db.query ("UPDATE banner SET link= ? WHERE id_bn=?", [data.link ,data.id_bn ],function (err, banner) {
        console.log (err);
        if(err){
            result(null);
        }
        else {
            result({data})
        }
    })
}



module.exports = banner;
