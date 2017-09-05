module.exports = {
  get(req, res) {
    let users = redis.hgetall('users').then((usersJSON)=>{
      res.render('admin-panel.html', {users: JSON.stringify(usersJSON)});
    })
  }
}
