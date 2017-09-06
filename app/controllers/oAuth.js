const $env = require(__root + '/env.json')
const crypto = require('crypto')
const axios = require('axios')
const qs = require('querystring')
module.exports = {


AuthURL (req, res) {
  let state = 'getAuthURL'
  let scope = 'identity mysubreddits read'
  let duration = 'permanent'
  let response = 'code'
  let redirect = $env.reddit.redirect
  res.redirect(`https://www.reddit.com/api/v1/authorize?client_id=${$env.reddit.clientId}&response_type=${response}&state=${state}&redirect_uri=${redirect}&duration=${duration}&scope=${scope}`)
},

Accepted (req, res) {
  if (req.query.error) return res.send('Error: Looks like something went wrong in the authorization process')
  if (req.query.state !== 'getAuthURL')return res.send('This STATE is not what we expected.')

    axios.request({
      url: 'https://www.reddit.com/api/v1/access_token',
      method: 'post',
      auth: {
        username: $env.reddit.clientId,
        password: $env.reddit.clientSecret
      },
      withCredentials: true,
      data: qs.stringify({
        grant_type: 'authorization_code',
        code: req.query.code,
        redirect_uri: $env.reddit.redirect
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
    .then((response) =>{

      let session = response.data
          session.id = crypto.randomBytes(128).toString('base64')
          snoo(session.refresh_token).getMe().name
          .then((r) => {
            session.username = r
            res.cookie('snoo', session, {
              signed: true,
              expires: new Date(Date.now() + 1000 * session.expires_in)
            })
            let tz = new Date().getTimezoneOffset()/60
            let sign = (tz < 0) ? '+':'-'
            return redis.hset('users', session.username, JSON.stringify({
              username: session.username,
              joined_at: new Date( Date.now() ),
              platform: req.headers['user-agent'],
              timezone: 'UTC' + sign + tz,
              permission: 'none'
            }))
          })
          .then(()=>{
            res.redirect('/dashboard')
          })


    })
    .catch((error) => {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    })

}

}
