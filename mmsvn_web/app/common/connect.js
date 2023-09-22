var msql = require('mysql2');

var conn = msql.createConnection({
    host : '192.168.51.2',
    port : '3306',
    user : 'sa',
    password: '1234',
    database : 'mmsvn_db'
})
conn.connect(function (err){
    if(err) console.log("Fail rồi  mẹ nó đéo biết lỗi ở đâu luôn á/n"+err);
    else console.log("Connected!");
});

module.exports = conn;
