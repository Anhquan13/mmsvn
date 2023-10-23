db = require('../common/connect');

const group_pr = function(){
    this.id_group = group.id_group;
    this.name = group.name;
    this.detail = group.detail;
    this.detail_en = group.detail_en;
}
group_pr.get_all = function(resutl){

    db.query("select * from group_pr", function (err,group_pr){
        if(err){
            resutl({status: "failed", msg: "Không tìm thấy"});
        }
        else     resutl(group_pr);
    });
}
group_pr.getByid = function(id_group, resutl  ){
    console.log(id_group);
    db.query("select * from group_pr where id_group = ?",id_group,function (err,group_pr){
        console.log (err,group_pr);
        if(err|| group_pr.length==0){
            resutl({status: "failed", msg: "Khong co group nay"});
        }
        else     resutl ( group_pr[0]);
    });
}

group_pr.create = function(data, resutl){
    db.query("INSERT INTO group_pr set ?", [data.name, data.detail, data.detail_en],function (err,group_pr){
        console.log (err, group_pr);
        if(err){
            resutl({status: "failed", msg: "Tạo mới không thành công"});
        } else resutl({status: "success", msg: "Tạo mới thành công", new_group: data});
//        console.log (err, group_pr);
    })

}

group_pr.remove = function(id_group, resutl){
    db.query("DELETE FROM group_pr WHERE id_group =?", id_group, function (err, group_pr){
        if(err){
            resutl({status: "failed", msg: "Xóa không thành công"});
        }
        else{
            resutl("xóa group_pr " + id_group +" thành công!!!!")
        }
    })
}

group_pr.update = function (data, result){
    console.log("id_group = "+ data.id_group);
    db.query ("UPDATE group_pr SET name= ?, detail = ?, detail_en=? WHERE id_group = ?", [data.name, data.detail, data.detail_en, parseInt(data.id_group) ],function (err, group_pr) {
        console.log (err);
        if(err){
            console.log (data.id_group);
            result({status: "failed", msg: "Update không thành công"});
        }
        else {
            result({status: "success", msg: "Update thành công"})
        }
    })
}

module.exports = group_pr;