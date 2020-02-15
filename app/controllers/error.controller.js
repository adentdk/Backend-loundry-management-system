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