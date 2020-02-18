const createError = require('http-errors');

const indexRoute = require('./index.route');
const authRoute = require('./auth.route');
const memberRoute = require('./member.route');

const errorController = require('./../controllers/error.controller');

module.exports = (app) => {
  app.use('/', indexRoute);
  app.use('/auth', authRoute);
  app.use('/member', memberRoute);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    if (err.status === 500) {
      return errorController.serverError(req, res)
    } else if (err.status === 404) {
      return errorController.notFound(req, res)
    } else {
      res.status(err.status || 500);
      res.json({
        'error': true
      });
    }

  });

};