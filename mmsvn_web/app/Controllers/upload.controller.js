const savefile = require('../common/SaveFile');
const fs = require('fs');


exports.single = function (req){
    var file = req.file;
    if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
         return error.message ;
    }
        return file.originalname;
}

exports.photo = function (req){
    var img = req.file;
    var typei = ['image/png', 'image/jpg', 'image/jpeg'];
    if (!img) {
        const    error = new Error('Please upload an image');
        error.httpStatusCode = 400;
        return error ;
    }else if (typei.indexOf(img.mimetype) === -1){

        error = new Error('Please upload file image .jpg, .jpeg or .png ');
        fs.unlink('app/storage/'+ img.filename , function (err) {
            if (err) throw err;
            console.log('File deleted! ' +img.filename);
        });

        error.httpStatusCode = 401;
        return error;
    }
    return img.filename;
}

exports.upload_post = function (img){
//    var img = req.file;
    var typei = ['image/png', 'image/jpg', 'image/jpeg'];
    if (!img) {
        const    error = new Error('Please upload an image');
        error.httpStatusCode = 400;
        return error ;
    }else if (typei.indexOf(img.mimetype) === -1){

        error = new Error('Please upload file image .jpg, .jpeg or .png ');
        fs.unlink('app/storage/'+ img.filename , function (err) {
            if (err) throw err;
            console.log('File deleted! ' +img.filename);
        });

        error.httpStatusCode = 401;
        return error;
    }
    return img.filename;
}


