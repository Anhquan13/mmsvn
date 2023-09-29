module.exports = function(router){

    const postcontroller = require('../../Controllers/post.controller')
    upload = require('../../common/SaveFile');
    fs = require('fs');




    router.get('/post/list', postcontroller.get_list);

    router.get('/post/detail/:id', postcontroller.detail);

    router.post('/post/add',upload.single('image'), postcontroller.add_post);

    router.delete('/post/delete/:id', postcontroller.remove_post);

    router.put('/post/update/', upload.single('image'), postcontroller.update_post);
    
    



};