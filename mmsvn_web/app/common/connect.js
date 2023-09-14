var msql = require('mysql2');

var conn = msql.createConnection({
    host : 'localhost',
    user : 'root',
    password: '1234',
    database : 'mmsvn_db'
})
conn.connect(function (err){
    if(err) console.log("Fail rồi mẹ nó đéo biết lỗi ở đâu luôn á");
    else console.log("Connected!");
});

module.exports = conn;
