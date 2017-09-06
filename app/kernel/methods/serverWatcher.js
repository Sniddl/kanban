
const fs = require('fs')
const path = require('path')
const parse = require('./routeParser.js')
const spawn = require('child_process').spawn
const watch = require('node-watch')
let node

runServer()
watch( p('/'), {recursive: false}, (event, name) => {
    runServer(event)
})
watch( p('/app/controllers'), {recursive: true}, (event, name) => {
    runServer(event)
})
watch( p('/routes'), {recursive: true}, (event, name) => {
    runServer(event)
})
watch( p('/resources'), {recursive: true}, (event, name) => {
    runServer(event)
})

function runServer(e=null) {
  console.log(e);
  if (node) node.kill()
  node = spawn('node',
          [
            path.join(path.normalize(__dirname), '../../../server.js')
          ],
          {
            stdio: 'inherit'
          }
          )

  require('./routeParser.js')()
  .then(()=>{
    console.log('routes ready');
  })

  node.on('close', function (code) {
   if (code === 8) console.log('Error detected, waiting for changes...');
  })
}

function p(rel){
  return path.join(path.normalize(__dirname), '../../../', rel)
}
