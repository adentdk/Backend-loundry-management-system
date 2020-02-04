'use strict'

exports.ok = (res, {message = 'success', data = {}, errors = [], meta = {}, status = 200}) => {
  const resData = {
    'status': true,
    'message': message,
    'data': data,
    'errors': errors,
    'meta': meta
  };

  res.status(status)
  res.json(resData);
  res.end();
}

exports.error = (res, {message = 'failed', data = {}, errors = [], meta = {}, status = 400}) => {
  const resData = {
    'status': false,
    'message': message,
    'data': data,
    'errors': errors,
    'meta': meta
  };

  res.status(status)
  res.json(resData);
  res.end();
}