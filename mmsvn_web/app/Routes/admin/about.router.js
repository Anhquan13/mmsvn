module.exports = function(router) {

    const aboutcontroller = require('../../Controllers/about.controller')
    upload = require('../../common/SaveFile');

    router.get('/about-us/', aboutcontroller.get_list);

    router.put('/about/update/', upload.single('image1'),upload.single('image2'),upload.single('image3'), aboutcontroller.update_about);
}