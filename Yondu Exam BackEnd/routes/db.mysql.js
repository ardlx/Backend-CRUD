const mysql = require('mysql');

const conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'admin',
    database : 'yondu'
});

module.exports = conn
