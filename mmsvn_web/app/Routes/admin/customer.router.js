module.exports = function(router){

    const customercontroller = require('../../Controllers/customer.controller')
    upload = require('../../common/SaveFile');




    router.get('/customer/list', customercontroller.get_list);//done

    router.get('/customer/detail/:id', customercontroller.detail); //done

    router.post('/customer/add',upload.single('image'), customercontroller.add_customer);//done

    router.delete('/customer/delete/:id', customercontroller.remove_customer); //done

    router.put('/customer/update/', upload.single('image'), customercontroller.update_customer);//done





};