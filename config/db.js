// config/db.js
const mysql = require('mysql');

const pool = mysql.createPool({
  host: '****',
  user: '****',
  password: '*****',
  database: '******',
  connectionLimit: 10,
});


module.exports = pool;
