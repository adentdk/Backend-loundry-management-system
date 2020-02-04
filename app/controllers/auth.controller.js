const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const response = require('./../helpers/res');
const validator = require('./../helpers/validator');
const db = require('./../models');

exports.index = (req, res, next) => {
  next();
};


exports.login = (req, res, next) => {
  const secretKey = process.env.APP_SECRET_KEY
  const { username, password } = req.body;
  const errors = [];
  const queryString = `
  SELECT
    users.id,
    users.name, 
    users.username,
    users.password,
    roles.name as role
  FROM users
  INNER JOIN roles
  WHERE users.role_id = roles.id
    AND (users.username = ?)`;
  const queryParams = [username];
  let user = {};
  let token = '';
  validator.required({ fieldName: 'username', value: username }, errors);
  validator.required({ fieldName: 'password', value: password }, errors);
  if (errors.length > 0) {
    return response.error(res, {
      message: 'validation error',
      errors: errors
    });
  }
  db.promise().query(queryString, queryParams).then(([rows]) => {
    if (rows.length === 0) {
      throw new Error('username not found');
    }
    user = rows[0];
    return bcrypt.compare(password, user.password);
  }).then(result => {
    if (!result) {
      throw new Error('incorrect password');
    }
    token = jwt.sign({
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role
    }, secretKey);
    return response.ok(res, {
      message: 'login success',
      data: {
        token: token
      }
    });
  }).catch(error => {
    console.log(error)
    return response.error(res, {
      message: 'account not found',
    });
  });
}

exports.registration = (req, res, next) => {
}