const db = require('./index')

exports.all = () => {
  return new Promise((resolve, reject) => {
    const queryString = 'SELECT * FROM members'
    db.promise().query(queryString).then(([rows]) => {
      resolve(rows)
    }).catch(err => {
      reject(err)
    })
  })
}

exports.findId = (id) => {
  return new Promise((resolve, reject) => {
    const queryString = 'SELECT * FROM members WHERE id=?'
    const queryParams = [id]

    db.promise().query(queryString, queryParams).then(([rows]) => {
      resolve(rows[0])
    }).catch(err => {
      reject(err)
    })
  })
}