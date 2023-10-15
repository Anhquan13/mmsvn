const mailer = require('../common/mailer');

exports.sendmail = async function(req,res){
    try {
        // Lấy data truyền lên từ form phía client
        const to = "anhquanmai655@gmail.com";
        subject = 'Từ Website: Có Khách hàng quan tâm đến sản phẩm của bạn';
        content = req.body.content;
        // Thực hiện gửi email
        await mailer.sendMail(to, subject, content);
        // Quá trình gửi email thành công thì gửi về thông báo success cho người dùng
        res.send('<h3>Your email has been sent successfully.</h3>')
    } catch (error) {
        // Nếu có lỗi thì log ra để kiểm tra và cũng gửi về client
        console.log(error)
        res.send(error)
    }
};