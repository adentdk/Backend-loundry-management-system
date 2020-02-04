'use strict'

var express = require('express');
var router = express.Router();
var controller = require('./../controllers/auth.controller');

/* GET home page. */
router.get('/', controller.index);
router.post('/login', controller.login);

module.exports = router;
