module.exports = function(router){

    fs = require('fs');

    router.get('/read_image/:link', function (req, res){
        console.log("rep la " +req.params.link);
        rimage = fs.readFileSync(req.params.link);

        // Gửi phản hồi về trình duyệt với nội dung của file ảnh dưới dạng định dạng jpg
        res.setHeader('Content-Type',  'image/jpg');
        res.send(rimage);
    })


};