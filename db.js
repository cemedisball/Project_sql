const mysql = require('mysql2');
const dbConfig = require('./dbconfig'); //การเอาไฟลฺ์ db.config มาเก็บไว้ใน dbConfig

//createPool เป็นการอณุญาติให้ user เข้ามามากว่า1คนสามารถเข้าพร้อมๆกันได้
const connection = mysql.createPool({
    host : dbConfig.HOST,
    user : dbConfig.USER,
    database:dbConfig.DATABASE,
    password : dbConfig.PASSWORD,
    port : dbConfig.PORT,
}); 
module.exports = connection.promise();