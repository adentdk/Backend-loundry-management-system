const mysql = require('mysql2');

const {
  APP_DB_HOST,
  APP_DB_USER,
  APP_DB_USER_PASSWORD,
  APP_DB_NAME
} = process.env;

const connection = mysql.createConnection({
  host: APP_DB_HOST || 'localhost',
  user: APP_DB_USER || 'root',
  password: APP_DB_USER_PASSWORD || 'root',
  database: APP_DB_NAME || 'loundry_management_system',
  multipleStatements: true
});

connection.connect((err) => {
  if (err) {
    console.error('Cannot connect to database');
    throw err;
  }
});

module.exports = connection;
