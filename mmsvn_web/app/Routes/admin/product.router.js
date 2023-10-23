module.exports = function(router){

    const productcontroller = require('../../Controllers/product.controller')
    upload = require('../../common/SaveFile');




    router.get('/product/list', productcontroller.get_list);  //done

    router.get('/product/detail/:id', productcontroller.detail);

    router.post('/product/add',upload.single('image'), productcontroller.add_product); //done

    router.delete('/product/delete/:id', productcontroller.remove_product); //done

    router.put('/product/update/', upload.single('image'), productcontroller.update_product); //done
    
    



};