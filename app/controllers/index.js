exports.index = (req, res) => {
  res.status(200);
  res.json({
    status: true,
    message: 'Welcome to Loundry Management API',
    data: {},
    meta: {}
  });
};