module.exports = function(router){

    const customercontroller = require('../../Controllers/customer.controller')
    upload = require('../../common/SaveFile');




    router.get('/customer/list', customercontroller.get_list);

    router.get('/customer/detail/:id', customercontroller.detail);

    router.post('/customer/add',upload.single('image'), customercontroller.add_customer);

    router.delete('/customer/delete/:id', customercontroller.remove_customer);

    router.put('/customer/update/', upload.single('image'), customercontroller.update_customer);





};