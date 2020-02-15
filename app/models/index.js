const mysql = require('mysql2');

const {
  DB_HOST,
  DB_USER,
  DB_USER_PASSWORD,
  DB_NAME
} = process.env;

const connection = mysql.createConnection({
  host: DB_HOST || 'localhost',
  user: DB_USER || 'root',
  password: DB_USER_PASSWORD || 'root',
  database: DB_NAME || 'loundry_management_system'
});

connection.connect((err) => {
  if (err) {
    console.error('Cannot connect to database');
    throw err;
  }
});

module.exports = connection;
