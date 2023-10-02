const db = require('../common/connect');

const about_us = function(){
    this.content = about_us.content;
    this.content_en = about_us.content_en;
    this.image1 = about_us.image1;
    this.image2 = about_us.image2;
    this.image3 = about_us.image3;


}

about_us.get_all = function(resutl){

    db.query("select * from about_us", function (err,about_us){
        if(err){
            resutl("err ");
        }
        else     resutl(about_us);
    });
}

module.exports = about_us;