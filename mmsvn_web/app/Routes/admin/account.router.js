module.exports = function(router){

    const accountcontroller = require('../../Controllers/account.controller')



router.get('/account/list', accountcontroller.get_list);

router.get('/account/detail/:id', accountcontroller.detail);

router.post('/account/add', accountcontroller.add_account);

router.post('/account/login', accountcontroller.login);

router.delete('/account/delete/:id', accountcontroller.remove_account);

router.put('/account/update/', accountcontroller.update_account);



};