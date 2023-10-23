const mailer = require('../common/mailer');
const account = require('../Models/account.model');

exports.sendmail = async function(req,res){
    var data = req.body;
    console.log("data +++" + data.name);
//     account.create(data,function(temp){
//        res.send({result: temp})
//     })
    var data = req.body;
    console.log("data " + data.hehe);
    try {
        // Lấy data truyền lên từ form phía client
        const to = "anhquanmai655@gmail.com";
        subject = 'Từ Website: Có Khách hàng quan tâm đến sản phẩm của bạn';

        // Thực hiện gửi email
        await mailer.sendMail(to, subject, data.content);
        // Quá trình gửi email thành công thì gửi về thông báo success cho người dùng
        res.send({status: "success", msg: "Your email has been sent successfully.", content: data.content})
        console.log(data.content);
    } catch (error) {
        // Nếu có lỗi thì log ra để kiểm tra và cũng gửi về client
        console.log(error);
        res.send({status: "fail", msg: "something miss", error: error});
    }
};
