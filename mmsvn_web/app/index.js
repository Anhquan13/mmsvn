const express = require('express');


const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const _AuthMiddleWare = require('./common/_AuthMiddleWare');

app.use(function (req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        return res.status(200).json({});
    }

    next();
})
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


require('./Routes/Guest/about.router')(app);
require('./Routes/Guest/account.router')(app);
require('./Routes/Guest/banner.router')(app);
require('./Routes/Guest/web_inf.router')(app);
require('./Routes/Guest/post.router')(app);
require('./Routes/Guest/sub_pr.router')(app);
require('./Routes/Guest/customer.router')(app);
require('./Routes/Guest/group_pr.router')(app);
require('./Routes/Guest/product.router')(app);
require('./Routes/readfile_router')(app);
require('./Routes/refresh.router')(app);
app.use(_AuthMiddleWare.isAuth);
require('./Routes/admin/about.router')(app);
require('./Routes/admin/account.router')(app);
require('./Routes/admin/banner.router')(app);
require('./Routes/admin/web_inf.router')(app);
require('./Routes/admin/post.router')(app);
require('./Routes/admin/sub_pr.router')(app);
require('./Routes/admin/customer.router')(app);
require('./Routes/admin/group_pr.router')(app);
require('./Routes/admin/product.router')(app);

console.log('Ready for new challenges');
 

app.listen(port, ()=> console.log('Listening at http://localhost: ' + port))
