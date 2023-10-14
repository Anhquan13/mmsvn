module.exports = function(router) {

    const aboutcontroller = require('../../Controllers/about.controller')
    upload = require('../../common/SaveFile');

    router.get('/about-us/', aboutcontroller.get_about);

    router.put('/about/update/',upload.array(['image1', 'image2', 'image3']), aboutcontroller.update_about);
}