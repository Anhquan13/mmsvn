module.exports = function(router){

    const subcontroller = require('../../Controllers/sub_pr.controller')
    upload = require('../../common/SaveFile');




    router.get('/sub/list', subcontroller.get_list);

    router.get('/sub/detail/:id', subcontroller.detail);
/* just admin
    router.post('/sub/add',upload.single('image'), subcontroller.add_sub);

    router.delete('/sub/delete/:id', subcontroller.remove_sub);

    router.put('/sub/update/', upload.single('image'), subcontroller.update_sub);


 */

};