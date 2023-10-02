const express = require('express');


const app = express();
const port = 3001;
const bodyParser = require('body-parser');
app.use(function (req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
})
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

require('./Routes/Guest/about.router')(app);
require('./Routes/admin/account.router')(app);
require('./Routes/admin/banner.router')(app);
require('./Routes/admin/web_info.router')(app);
require('./Routes/admin/post.router')(app);
require('./Routes/admin/sub_pr.router')(app);
require('./Routes/admin/readfile_router')(app);
require('./Routes/admin/customer.router')(app);
require('./Routes/admin/group_pr.router')(app);
require('./Routes/admin/product.router')(app);
console.log('Ready for new challenges');
 

app.listen(port, ()=> console.log('Listening at http://localhost: ' + port))
