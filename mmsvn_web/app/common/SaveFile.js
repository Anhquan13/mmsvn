const multer = require('multer');

// config nơi lưu, cách lưu
const storage = multer.diskStorage({
    destination : function (req, file, res){
        res(null, '.%2Fapp%2Fstorage%2F')
    },
    filename : function (req, file, res){
        res(null, Date.now()+ file.originalname)
        return this.filename
    }
});
// Khai báo đối tượng multer
var upload = multer({storage: storage})
module.exports = upload;
