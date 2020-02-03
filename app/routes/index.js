const createError = require('http-errors');

const indexRoute = require('./index.route.js');
const usersRoute = require('./users.route.js');

module.exports = (app) => {
  app.use('/', indexRoute);
  app.use('/users', usersRoute);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.json({
      'error': true
    });
  });

};