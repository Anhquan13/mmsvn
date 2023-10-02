module.exports = function(router) {

    const aboutcontroller = require('../../Controllers/about.controller')

    router.get('/about-us/', aboutcontroller.get_list);

}