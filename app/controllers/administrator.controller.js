const jwt = require('jsonwebtoken');

const response = require('./../helpers/res');
const validator = require('./../helpers/validator');
const db = require('./../models');
const member = require('./../models/member.model');

exports.index = (req, res)  => {
  response.ok(res, {
    data: {
      text: 'Administrator/index'
    }
  })
}

exports.allMembers = (req, res) => {
   member.all().then(result => {
     response.ok(res, {
       data: result
     })
   }).catch(err => {
     console.log(err)
     response.error(res, {})
   })
}

exports.memberDetails = (req, res) => {
  const { id } = req.params
  member.findId(id).then(result => {
    response.ok(res, {
      data: result
    })
  }).catch(err => {
    console.log(err)
    response.error(res, {})
  })
}

exports.addMember = (req, res) => {
  response.ok(res, {})
}