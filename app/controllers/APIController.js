const $env = require(__root + '/env.json')
module.exports = {


AuthURL (req, res) {
  let state = 'getAuthURL'
  let scope = 'identity'
  let duration = 'permanent'
  let response = 'code'
  let redirect = 'http://localhost:8000'
  res.redirect(`https://www.reddit.com/api/v1/authorize?client_id=${$env.reddit.clientId}&response_type=${response}&state=${state}&redirect_uri=${redirect}&duration=${duration}&scope=${scope}`)
},

Verified (req, res) {
  // res.send('you have been Verified')
  res.render('index.html')
}

}
