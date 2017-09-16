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
const fs = require('fs');

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

global.c = (str)=>{
  let file = str.split('@')[0]
  let method = str.split('@')[1]
  return require(__dirname + `/app/controllers/${file}.js`)[method]
}

global.m = (str)=>{
  let file = str.split('@')[0]
  let method = str.split('@')[1]
  return require(__dirname + `/app/middleware/${file}.js`)[method]
}


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


app.use('/r', require(__dirname+'/routes/redirects.js'))
app.use('/', require(__dirname+'/routes/reddit.js'))



// app.use((req, res, next) => {
//   if (req.signedCookies.snoo) req.reddit = snoo(req.signedCookies.snoo.refresh_token)
//   if(req.path !== '/auth'
//      && req.path !== '/accepted'
//      && req.path !== '/redis'
//      && !req.signedCookies.snoo)
//   {
//       return res.redirect('/auth')
//   }
//
//   next()
// })

// fs.readdir('routes',  (err, files) => {
//   _.forEach(files, file=>{
//     require(__dirname + '/routes/' + file)(app)
//   })
//   // fs.readdir('app/middleware' readMiddleware)
  server.listen(8000, function () {
    console.log('Server is ready on port 8000');
  })
//
// })
// function readMiddleware(err, files){
//   _.forEach(files, file=>{
//     require(__dirname + '/app/middleware/' + file)
//   })
//   server.listen(8000, function () {
//     console.log('Server is ready on port 8000');
//   })
// }


//
