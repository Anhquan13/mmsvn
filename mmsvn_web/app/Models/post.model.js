db = require('../common/connect');


const post = function(){
    this.id_post = post.id_post;
    this.name = group.name;
    this.name_en = post.name_en;
    this.content = post.content;
    this.content_en = post.content_en;
    this.image = post.image;
    this.cre_date = post.cre_date;
    this.author = post.author;
    this.id_user = post.id_user;
}
post.get_all = function(resutl){

    db.query("select * from post order by cre_date desc", function (err,post){
        if(err){
            resutl({status: "failed", msg: "Khong co post"});
        }
        else     resutl(post);
    });
}
post.getByid = function(id_post, resutl  ){
//    console.log(id_post);
    db.query("select * from post where id_post = ?",id_post,function (err,post){
//        console.log (err,post);
        if(err || (post.length==0)){
            resutl({status: "failed", msg: "Khong co post nay"});
        }
        else     {resutl (post[0]);}
    });
}

post.create = function(data, resutl){
//    console.log ("tên là: " + data.name);  //kiểm tra bug
    db.query("INSERT INTO post set name =?, name_en =?, content =?, content_en  =?,image =?, cre_date =?,  author =?, id_user=? ", [data.name, data.name_en, data.content, data.content_en, data.image, data.cre_date, data.author, data.id_user],function (err,post){
        console.log (err, post);
        try{
            resutl({status: "success", msg: "Tạo mới thành công", new_post: data});
        } catch(err){
            resutl({status: "failed", msg: "Tạo mới không thành công"});
            console.log (err );}

    })

}

post.remove = function(id_post, resutl){
    db.query("DELETE FROM post WHERE id_post =?", id_post, function (err, post){

        try{
            resutl("xóa post " + id_post +" thành công!!!!")
        }catch(err){
            resutl({status: "failed", msg: "Xóa không thành công"});
            console.log(err + "Loi r ");
        }
    })
}

post.update = function (data, result){ //no image
    db.query ("UPDATE post  SET name= ?, name_en =?, content =?, content_en  =?, author =?  WHERE id_post =?", [data.name, data.name_en, data.content, data.content_en, data.author,parseInt(data.id_post) ],function (err, post) {
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

post.updateimg = function (data, result){
    db.query ("UPDATE post  SET name= ?, name_en =?, content =?, content_en  =?,image =?, author =?  WHERE id_post = ?", [data.name, data.name_en, data.content, data.content_en, data.image, data.author, parseInt(data.id_post)],function (err, post) {
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

module.exports = post;