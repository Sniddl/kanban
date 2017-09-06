const _ = require('lodash')
module.exports = {

  get(req, res) {
    let users = redis.hgetall('users')
    .then((usersJSON)=>{
      _.forEach(usersJSON, function (value, key) {
        usersJSON[key] = JSON.parse(value)
      })
      res.render('admin-panel.html', {users: usersJSON})
    })
  },

  
}
