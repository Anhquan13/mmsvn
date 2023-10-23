module.exports = function(router){

    const mailcontroller = require('../Controllers/mail.controller');


    router.post('/sendmail/',mailcontroller.sendmail);



};