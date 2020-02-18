'use strict'

var express = require('express');
var router = express.Router();
var controller = require('./../controllers/member.controller');
var errorController = require('./../controllers/error.controller');

router.route('/')
  .get(controller.allMembers)
  .post(controller.addMember)
  .all(errorController.methodNotAllowed)

router.route('/:id')
  .get(controller.memberDetails)
  .put(controller.updateMember)
  .patch(controller.updateMember)
  .delete(controller.deleteMember)
  .all(errorController.methodNotAllowed)

module.exports = router;
