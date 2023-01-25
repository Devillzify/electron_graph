var mysql = require('mysql');
const datos = require("./connection.json")
var connection = mysql.createConnection({
    host: datos.host,
    user: datos.user,
    password: datos.password,
    database: datos.database
});
module.exports = { connection };