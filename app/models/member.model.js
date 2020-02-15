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
