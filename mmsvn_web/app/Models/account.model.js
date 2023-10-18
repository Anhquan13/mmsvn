const db = require('../common/connect');

const account = function(){
    this.id_user = account.id_user;
    this.name = account.name;
    this.pw = account.pw;

}

account.get_all = function(resutl){

    db.query("select * from user", function (err,account){
        if(err){
            resutl( {status: "failed", msg: "không thành công"});
        }
        else     resutl(account);
    });
}
account.getByid = function(id_user, resutl  ){
    console.log(id_user);
    db.query("select * from user where id_user = ?",id_user,function (err,account){
        console.log (err,account);
        if(err|| account.length==0){
            resutl( {status: "failed", msg: "không thành công"});
        }
        else     resutl ( account[0]);
    });
}

account.create = function(data, resutl){
    db.query("INSERT INTO user set ?", data,function (err,account){
        console.log (err, account);
        if(err){
            resutl({status: "failed", msg: "Tạo mới không thành công"});
        } else resutl({status: "success", msg: "Upload thành công", data: data});
//        console.log (err, account);
    })

}

account.remove = function(id_user, resutl){
    db.query("DELETE FROM user WHERE id_user =?", id_user, function (err, account){
        if(err){
            resutl({status: "failed", msg: "Xóa không thành công"});
        }
        else{
            resutl({status: "success",msg:"xóa user " + id_user +" thành công!!!!"})
        }
    })
}

account.update = function (data, result){
    db.query ("UPDATE user SET name= ?, pw = ? WHERE id_user=?", [data.name, data.pw,data.id_user ],function (err, account) {
        console.log (err);
        if(err){
            result({status: "failed", msg: "Update không thành công"});
        }
        else {
            result({status: "success", msg: "Update thành công"})
        }
    })
}

account.check_login = function (data, result){
    db.query("Select name, id_user from user where id_user = ? and pw = ?", [data.id_user, data.pw], function (err, account){
        if (err || account.length == 0){
            result({status: "failed", msg: "username hoặc password sai"});
        }
        else {
            result(account[0]);
        }
    });
}


module.exports = account;
