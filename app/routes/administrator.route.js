'use strict'

var express = require('express');
var router = express.Router();
var controller = require('./../controllers/administrator.controller');

router.get('/', controller.index)
/* Member */
router.get('/members', controller.allMembers)
router.get('/member/:id', controller.memberDetails)
router.post('/member', controller.addMember)

module.exports = router;
