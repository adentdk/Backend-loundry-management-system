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

exports.findId = id => {
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

exports.add = data => {
  return new Promise((resolve, reject) => {
    const queryString = `
      INSERT
        INTO members (name, address, gender, phone)
      VALUES (?, ?, ?, ?)
    `
    const queryParams = [data.name, data.address, data.gender, data.phone]

    db.promise().query(queryString, queryParams).then(([result]) => {
      resolve({
        id: result.insertId,
        ...data,
      })
    }).catch(err => {
      reject(err)
    })
  })
}

exports.update = (id, data) => {
  return new Promise((resolve, reject) => {
    const queryString = `
      UPDATE members
      SET
        name=?,
        address=?,
        gender=?,
        phone=?
      WHERE id=?;
      SELECT * FROM members WHERE id=?
    `
    const queryParams = [data.name, data.address, data.gender, data.phone, id, id]

    db.promise().query(queryString, queryParams).then(([result]) => {
      resolve(result[1])
    }).catch(err => {
      reject(err)
    })
  })
}

exports.updatePartial = (id, data) => {
  return new Promise((resolve, reject) => {

    const dataUpdate = {}

    const queryString = `
      UPDATE members SET ? WHERE id=?;
      SELECT * FROM members WHERE id=?
    `
    
    Object.keys(data).map(item => {
      if (data[item]) {
        dataUpdate[item] = data[item]
      }
    })

    const queryParams = [dataUpdate, id, id]
      
    db.promise().query(queryString, queryParams).then(([result]) => {
      const [queryResult, updatedData] = result
      resolve(updatedData[0])
    }).catch(error => {
      reject(error)
    })
  })
}

exports.delete = id => {
  return new Promise((resolve, reject) => {
    const queryString = 'DELETE FROM members WHERE id=?'
    const queryParams = [id]

    db.promise().query(queryString, queryParams).then(([result])=> {
      if (result.affectedRows > 0) {
        return resolve(result)
      } else {
        throw new Error('no_affectedRow')
      }
    }).catch(error => {
      reject(error)
    })
  })
}
 