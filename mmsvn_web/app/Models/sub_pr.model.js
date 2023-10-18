db = require('../common/connect');


const sub = function(){
    this.id_sub = sub.id_sub;
    this.name = group.name;
    this.name_en = sub.name_en;
    this.content = sub.content;
    this.content_en = sub.content_en;
    this.image = sub.image;
    this.cre_date = sub.cre_date;
    this.author = sub.author;
    this.id_user = sub.id_user;
}
sub.get_all = function(resutl){

    db.query("select * from sub", function (err,sub){
        if(err){
            resutl({status: "failed", msg: "Khong co sub"});
        }
        else     resutl(sub);
    });
}
sub.getByid = function(id_sub, resutl  ){
//    console.log(id_sub);
    db.query("select * from sub where id_sub = ?",id_sub,function (err,sub){
//        console.log (err,sub);
        if(err || (sub.length==0)){
            resutl({status: "success", msg: "Khong co sub"});
        }
        else     {resutl (sub[0]);}
    });
}

sub.create = function(data, resutl){
//    console.log ("tên là: " + data.name);  //kiểm tra bug
    db.query("INSERT INTO sub set name =?, name_en =?, content =?, content_en  =?,image =?, cre_date =?,  id_product=?, id_user=? ", [data.name, data.name_en, data.content, data.content_en, data.image, data.cre_date, data.id_product, data.id_user],function (error,sub){
        console.log (error, sub);
        try{
            resutl({status: "success", msg: "Tạo mới thành công", new_sub_product: data});
        } catch(error){
            resutl({status: "failed", msg: "Tạo mới không thành công"});
            console.log ("bug again!! "+ err );}

    })

}

sub.remove = function(id_sub, resutl){
    db.query("DELETE FROM sub WHERE id_sub =?", id_sub, function (err, sub){

        try{
            resutl("xóa sub " + id_sub +" thành công!!!!")
        }catch(err){
            console.log("bug: " + err );
            resutl({status: "failed", msg: "Xóa không thành công"});
        }
    })
}

sub.update = function (data, result){ //no image
    db.query ("UPDATE sub  SET name= ?, name_en =?, content =?, content_en  =?, id_product=?  WHERE id_sub =?", [data.name, data.name_en, data.content, data.content_en, data.id_product,parseInt(data.id_sub) ],function (err, sub) {
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

sub.updateimg = function (data, result){
    db.query ("UPDATE sub  SET name= ?, name_en =?, content =?, content_en  =?,image =?, id_product =?  WHERE id_sub = ?", [data.name, data.name_en, data.content, data.content_en, data.image, data.id_product, parseInt(data.id_sub)],function (err, sub) {
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

module.exports = sub;