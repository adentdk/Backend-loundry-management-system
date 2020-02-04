const jwt = require('jsonwebtoken');

const response = require('./../helpers/res');

module.exports = (req, res, next) => {
  try {
    const secretKey = process.env.APP_SECRET_KEY
    const authorization = req.headers.authorization;
    if (!!authorization) {
      const token = authorization.split('Bearer ')[1];
      const user = jwt.verify(token, secretKey);
      if (user.role === 'administrator') {
        return next();
      }
      throw new Error('Forbidden'); 
    }
    throw new Error('UnAuthenticate');
  } catch (error) {
    if (error.message === 'Forbidden') {
      return response.error(res, {
        status: 403,
        message: 'you doesn\'t have access to access this resource'
      });
    } else if (error.message === 'UnAuthenticate') {
      return response.error(res, {
        status: 401,
        message: 'no authentication headers'
      });
    } else {
      return response.error(res, {
        status: 401,
        message: 'invalid authentication'
      });
    }
  }
}