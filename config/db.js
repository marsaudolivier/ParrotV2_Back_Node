// config/db.js
const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'mysql-marsaudolivier.alwaysdata.net',
  user: '315610_test',
  password: 'Mapadis1701',
  database: 'marsaudolivier_garageparrot2',
  connectionLimit: 10,
});


module.exports = pool;
