module.exports = function(router){

    const bannercontroller = require('../Controllers/banner.controller')
    upload = require('../common/SaveFile');




    router.get('/banner/list', bannercontroller.get_list);

    router.get('/banner/detail/:id', bannercontroller.detail);

//    router.post('/banner/add',upload.single('image'), bannercontroller.add_banner);

//    router.delete('/banner/delete/:id', bannercontroller.remove_banner);

    router.put('/banner/update/', upload.single('image'), bannercontroller.update_banner);





};