module.exports = function(router) {

    const aboutcontroller = require('../../Controllers/about.controller')
    upload = require('../../common/SaveFile');

    router.get('/about-us/', aboutcontroller.get_about);

    router.put('/about/update/',upload.fields([{name:'image1', maxCount: 1}, {name:'image2', maxCount: 1}, {name:'image3', maxCount: 1}]), aboutcontroller.update_about);
}