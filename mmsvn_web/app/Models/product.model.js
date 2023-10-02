db = require('../common/connect');


const product = function(){
    this.id_product = product.id_product;
    this.name = product.name;
    this.des = product.des;
    this.spec = product.spec;
    this.des_en = product.des_en;
    this.spec_en = product.spec_en;
    this.cre_date = product.cre_date;
    this.edit_date = product.cre_date;
    this.image = product.image;
    this.brochure = product.brochure;
    this.status = product.status;
    this.id_user = product.id_user;
    this.id_group = product.id_group;
}
product.get_all = function(resutl){

    db.query("select * from product", function (err,product){
        if(err){
            resutl("yes!");
        }
        else     resutl(product);
    });
}
product.getByid = function(id_product, resutl  ){
//    console.log(id_product);
    db.query("select * from product where id_product = ?",id_product,function (err,product){
//        console.log (err,product);
        if(err || (product.length==0)){
            resutl("Khong co san pham");
        }
        else     {resutl (product[0]);}
    });
}

product.create = function(data, resutl){
//    console.log ("tên là: " + data.name);  //kiểm tra bug
    db.query("INSERT INTO product set name =?, des =?, spec =?, des_en =?,spec_en =?, cre_date =?, edit_date=?,image= ?, brochure= ?, status =?, id_user=?, id_group =? ", [data.name, data.des, data.spec, data.des_en, data.spec_en, data.cre_date, data.edit_date,data.image, data.brochure ,data.status, data.id_user, data.id_group],function (err,product){
        console.log (err, product);
        if(err){
            resutl("lỗi cmnr ");
        } else resutl({data});
        console.log (err);
    })

}

product.remove = function(id_product, resutl){
    db.query("DELETE FROM product WHERE id_product =?", id_product, function (err, product){
        if(err){
            resutl(null);
        }
        else{
            resutl("xóa product " + id_product +" thành công!!!!")
        }
    })
}

product.update = function (data, result){
    db.query ("UPDATE product  SET name= ?, des = ?, spec= ?, des_en=?,spec_en=?, edit_date=?, brochure=?, status =?, id_group=?  WHERE id_product=?", [data.name, data.des, data.spec, data.des_en, data.spec_en, data.edit_date, data.brochure ,data.status, data.id_group,parseInt(data.id_product) ],function (err, product) {
        if(err){
            console.log (err);
            result(null);

        }
        else {
            console.log("update thanh cong");
            result({data})
        }
    })
}

product.updateimg = function (data, result){
    db.query ("UPDATE product  SET name= ?, des = ?, spec= ?, des_en=?,spec_en=?, edit_date=?, image =?, status =?, id_group=?  WHERE id_product=?", [data.name, data.des, data.spec, data.des_en, data.spec_en, data.edit_date, data.image , data.status, data.id_group,parseInt(data.id_product) ],function (err, product) {
        if(err){
            console.log (err);
            result(null);
        }
        else {
            console.log("update thanh cong");
            result({data})
        }
    })
}

module.exports = product;