
const fs = require('fs')
const path = require('path')
const parse = require('./routeParser.js')
routeParse()
fs.watch(path.join(path.normalize(__dirname), '../../../routes'), (event, filename) => {
  routeParse()
})


function routeParse() {
  parse()
  .then(()=>{
    return console.log('Routes are ready');
  })
}
