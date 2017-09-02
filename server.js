const express     =  require('express')
const app         =  express()
const server      =  require('http').Server(app)
const io          =  require('socket.io')(server)
const Redis       =  require('ioredis');
const nunjucks    =  require('nunjucks')
const bodyParser  =  require('body-parser')
const _           =  require('lodash')

// const redis = new Redis();
nunjucks.configure('resources/views', {
  autoescape: true,
  express: app
})

server.listen(8000)

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

require('./app/kernel/methods/routeParser.js')()
.then(()=>{
  console.log('ready');
  require('./cache/routes.js')(app)
})

//
