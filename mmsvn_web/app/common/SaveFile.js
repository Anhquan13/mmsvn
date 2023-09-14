const multer = require('multer');

// config nơi lưu, cách lưu
const storage = multer.diskStorage({
    destination : function (req, file, res){
        res(null, './app/storage/')
    },
    filename : function (req, file, res){
        res(null, file.originalname)
    }
});
// Khai báo đối tượng multer
var upload = multer({storage: storage})
module.exports = upload;
