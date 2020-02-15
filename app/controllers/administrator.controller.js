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
  const errors = []
  const { name, address, gender, phone } = req.body
  validator.required({fieldName: 'name', value: name}, errors)
  validator.required({fieldName: 'address', value: address}, errors)
  validator.required({fieldName: 'gender', value: gender}, errors)
  validator.required({fieldName: 'phone', value: phone}, errors)

  if (errors.length > 0) {
    return response.error(res, {
      status: 422,
      message: 'Validation Error',
      errors
    })
  }

  member.add({ name, address, gender, phone }).then(result => {
    response.ok(res, {
      data: result
    })
  }).catch(error => {
    response.error(res, {
      errors: error
    })
  })
}