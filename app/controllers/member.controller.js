const response = require('./../helpers/res');
const validator = require('./../helpers/validator');

const member = require('./../models/member.model');

exports.index = (req, res)  => {
  return response.ok(res, {
    data: {
      text: 'member/index'
    }
  })
}

exports.allMembers = (req, res) => {
   member.all().then(result => {
     return response.ok(res, {
       data: result
     })
   }).catch(err => {
     console.log(err)
     return response.error(res, {})
   })
}

exports.memberDetails = (req, res) => {
  const { id } = req.params
  member.findId(id).then(result => {
    return response.ok(res, {
      data: result
    })
  }).catch(err => {
    console.log(err)
    return response.error(res, {})
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
    return response.ok(res, {
      data: result
    })
  }).catch(error => {
    return response.error(res, {
      errors: error
    })
  })
}

exports.updateMember = async (req, res) => {
  const errors = []
  try {
    const { name, address, gender, phone } = req.body
    const { id } = req.params
    if (req.method === 'PUT') {
      validator.required({fieldName: 'name', value: name}, errors)
      validator.required({fieldName: 'address', value: address}, errors)
      validator.required({fieldName: 'gender', value: gender}, errors)
      validator.required({fieldName: 'phone', value: phone}, errors)
    }

    if (errors.length > 0) {
      throw new Error('error validation')
    }

    const data = {
      name,
      address,
      gender,
      phone
    }

    const result = req.method === 'PUT' ? await member.update(id, data) : await member.updatePartial(id, data)
    return response.ok(res, { data: result })

  } catch (error) {
    if (error.message === 'error validation') {
      return response.error(res, {
        status: 422,
        message: 'Validation Error',
        errors: errors
      }) 
    } 
    return response.error(res, { message: 'Something went wrong' })
  }
}

exports.deleteMember = (req, res) => {
  const { id } = req.params
  member.delete(id).then(result => {
    return response.ok(res, {
      data: result
    })
  }).catch(error => {
    return response.error(error)
  })
}