module.exports = function(router){

    const webinfcontroller = require('../Controllers/web_info.controller')



    router.get('/webinf/list', webinfcontroller.get_list);

    router.get('/webinf/detail/:id', webinfcontroller.detail);

//    router.post('/webinf/add', webinfcontroller.add_webinf);

//    router.delete('/webinf/delete/:id', webinfcontroller.remove_webinf);

    router.put('/webinf/update/', webinfcontroller.update_webinf);



};