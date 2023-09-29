db = require('../common/connect');


const customer = function(){
    this.id = customer.id;
    this.name = customer.name;
    this.name_en = customer.name_en;
    this.image = customer.image;
    this.detail = customer.detail;
    this.detail_en = customer.detail_en;
}
customer.get_all = function(resutl){

    db.query("select * from customer", function (err,customer){
        if(err){
            resutl("yes!");
        }
        else     resutl(customer);
    });
}
customer.getByid = function(id, resutl  ){
//    console.log(id);
    db.query("select * from customer where id = ?",id,function (err,customer){
//        console.log (err,customer);
        if(err || (customer.length==0)){
            resutl("Khong co customer");
        }
        else     {resutl (customer[0]);}
    });
}

customer.create = function(data, resutl){
//    console.log ("tên là: " + data.name);  //kiểm tra bug
    db.query("INSERT INTO customer set name =?, name_en =?, image= ?, detail =?, detail_en? ", [data.name, data.name_en, data.image, data.detail, data.detail_en],function (err,customer){
        console.log (err, customer);
        if(err){
            resutl("lỗi cmnr ");
        } else resutl({data});
        console.log (err);
    })

}

customer.remove = function(id, resutl){
    db.query("DELETE FROM customer WHERE id =?", id, function (err, customer){
        if(err){
            resutl(null);
        }
        else{
            resutl("xóa customer " + id +" thành công!!!!")
        }
    })
}

customer.update = function (data, result){
    db.query ("UPDATE customer  SET name= ?, name_en = ?, detail = ?, detail_en=?  WHERE id=?", [data.name, data.name_en, data.detail, data.detail_en,parseInt(data.id) ],function (err, customer) {
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

customer.updateimg = function (data, result){
    db.query ("UPDATE customer  SET name= ?,  name_en = ?, image=?, detail = ?, detail_en=?  WHERE id=?", [data.name, data.name_en, data.image, data.detail, data.detail_en,parseInt(data.id) ],function (err, customer) {
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

module.exports = customer;