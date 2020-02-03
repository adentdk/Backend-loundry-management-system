'use strict'

exports.ok = ({message = 'success', data = {}, meta = {}, status = 200}, res) => {
  const resData = {
    'status': true,
    'message': message,
    'data': data,
    'meta': meta
  };

  res.status(status)
  res.json(resData);
  res.end();
}

exports.error = ({message = 'failed', data = {}, meta = {}, status = 400}, res) => {
  const resData = {
    'status': false,
    'message': message,
    'data': data,
    'meta': meta
  };

  res.status(status)
  res.json(resData);
  res.end();
}