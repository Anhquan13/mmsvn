const db = require('../common/connect');

const account = function(){
    this.id_user = account.id_user;
    this.name = account.name;
    this.pw = account.pw;

}

account.get_all = function(resutl){

    db.query("select * from user", function (err,account){
        if(err){
            resutl("hêloojfd");
        }
        else     resutl(account);
    });
}
account.getByid = function(id_user, resutl  ){
    console.log(id_user);
    db.query("select * from user where id_user = ?",id_user,function (err,account){
        console.log (err,account);
        if(err|| account.length==0){
            resutl("hêlofojcfd");
        }
        else     resutl ( account[0]);
    });
}

account.create = function(data, resutl){
    db.query("INSERT INTO user set ?", data,function (err,account){
        console.log (err, account);
        if(err){
            resutl("lỗi cmnr");
        } else resutl({data});
//        console.log (err, account);
    })

}

account.remove = function(id_user, resutl){
    db.query("DELETE FROM user WHERE id_user =?", id_user, function (err, account){
        if(err){
            resutl(null);
        }
        else{
            resutl("xóa user " + id_user +" thành công!!!!")
        }
    })
}

account.update = function (data, result){
    db.query ("UPDATE user SET name= ?, pw = ? WHERE id_user=?", [data.name, data.pw,data.id_user ],function (err, account) {
        console.log (err);
        if(err){
            result(null);
        }
        else {
            result({data})
        }
    })
}

account.check_login = function (data, result){
    db.query("Select name from user where id_user = ? and pw = ?", [data.id_user, data.pw], function (err, account){
        if (err || account.length == 0){
            result(null);
        }
        else {
            result(account[0]);
        }
    });
}


module.exports = account;
