module.exports = function(router){

    const groupcontroller = require('../../Controllers/group_pr.controller')



    router.get('/group/list', groupcontroller.get_list);

    router.get('/group/detail/:id', groupcontroller.detail);

    router.post('/group/add', groupcontroller.add_group_pr);

    router.delete('/group/delete/:id', groupcontroller.remove_group_pr);

    router.put('/group/update/', groupcontroller.update_group_pr);



};