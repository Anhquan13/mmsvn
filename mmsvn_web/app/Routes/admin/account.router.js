module.exports = function(router){

    const accountcontroller = require('../../Controllers/account.controller')
    upload = require('../../common/SaveFile');


router.get('/account/list', accountcontroller.get_list); // done

router.get('/account/detail/:id', accountcontroller.detail); //done

router.post('/account/add', accountcontroller.add_account); // done

//router.post('/account/login', accountcontroller.login); // done

router.delete('/account/delete/:id', accountcontroller.remove_account); //done

router.put('/account/update/', accountcontroller.update_account); //done


};