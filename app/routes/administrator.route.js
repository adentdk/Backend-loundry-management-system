'use strict'

var express = require('express');
var router = express.Router();
var controller = require('./../controllers/administrator.controller');

router.get('/', controller.index)
/* Member */
router.get('/members', controller.allMembers)
router.post('/member', controller.addMember)
router.get('/member/:id', controller.memberDetails)
router.put('/member/:id', controller.updateMember)
router.patch('/member/:id', controller.updateMember)
router.delete('/member/:id', controller.deleteMember)

module.exports = router;
