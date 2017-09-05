const express     =  require('express')
const app         =  express()
const server      =  require('http').Server(app)
const io          =  require('socket.io')(server)
const Redis       =  require('ioredis');
const nunjucks    =  require('nunjucks')
const bodyParser  =  require('body-parser')
const _           =  require('lodash')
const snoowrap    =  require('snoowrap')
const $env        =  require('./env.json')
const path        =  require('path')
const cookieParser = require('cookie-parser')

global.redis = new Redis({
  port: $env.redis.port,
  host: $env.redis.host,
  family: $env.redis.IpProtocol,
  password: $env.redis.password,
  db: $env.redis.db
});

global.__root = path.resolve(__dirname)
nunjucks.configure('resources/views', {
  autoescape: true,
  express: app
})



snoo = function (refreshToken){
  return new snoowrap({
    userAgent: $env.reddit.userAgent,
    clientId: $env.reddit.clientId,
    clientSecret: $env.reddit.clientSecret,
    refreshToken: refreshToken
  })
}






app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser("secret"))

app.use((req, res, next) => {
  if(req.path !== '/auth'
     && req.path !== '/accepted'
     && req.path !== '/redis'
     && !req.signedCookies.snoo)
  {
      return res.redirect('/auth')
  }
  if (req.signedCookies.snoo) req.reddit = snoo(req.signedCookies.snoo.refresh_token)
  next()
})

require('./cache/routes.js')(app)

server.listen(8000)
//
