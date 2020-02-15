'use strict'

var express = require('express');
var router = express.Router();
var controller = require('./../controllers/administrator.controller');

/* Member */
router.get('/members', controller.members)

module.exports = router;
