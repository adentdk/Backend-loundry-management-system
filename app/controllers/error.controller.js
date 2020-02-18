const response = require('./../helpers/res');

exports.notFound = (req, res) => {
  response.error(res, {
    status: 404,
    message: 'Not Found'
  });
};

exports.serverError = (req, res) => {
  response.error(res, {
    status: 500,
    message: 'Internal Server Error'
  })
}

exports.methodNotAllowed = (req, res) => {
  response.error(res, {
    status: 405,
    message: 'Method Not Allowed'
  })
}

exports.forbiden = (req, res) => {
  response.error(res, {
    status: 403,
    message: 'you doesn\'t have access to access this resource'
  })
}

exports.unAuthenticated = (req, res) => {
  response.error(res, {
    status: 401,
    message: 'no Authorization headers'
  });
}

exports.invalidAuthorization = (req, res) => {
  response.error(res, {
    status: 401,
    message: 'invalid Authorization'
  });
}