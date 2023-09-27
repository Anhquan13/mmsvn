db = require('../common/connect');

const webinf = function(){
    this.id = webinf.id;
    this.head_office = webinf.head_office;
    this.Vungtau_office = webinf.Vungtau_office;
    this.link1 = webinf.link1;
    this.link2 = webinf.link2;
    this.link3 = webinf.link3
}

webinf.get_all = function(resutl){

    db.query("select * from web_info", function (err,webinf){
        if(err){
            resutl("hêloojfd");
        }
        else     resutl(webinf);
    });
}
webinf.getByid = function(id, resutl  ){
    console.log(id);
    db.query("select * from web_info where id = ?",id,function (err,webinf){
        console.log (err,webinf);
        if(err|| webinf.length==0){
            resutl("hêlofojcfd");
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
    db.query ("UPDATE web_info SET head_office= ?, Vung_tau_office =?, link1=?,link2=?,link3=? WHERE id=?", [data.head_office, data.Vungtau_office, data.link1, data.link2, data.link3 ,data.id ],function (err, webinf) {
        console.log (err);
        try{
            result(null);
        }
        catch {
            result({data})
        }
    })
}



module.exports = webinf;
