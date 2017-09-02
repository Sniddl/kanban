const _ = require('lodash')
const fs = require('fs')
const $p = require('./promises.js')
const path = require('path')

let promises = []


fs.readdirSync('./routes').forEach(file => {
  var p = new Promise(function(resolve, reject) {
    resolve(readRoute('routes/'+file))
  });
  promises.push(p)
})

function readRoute (route) {
  let dataToWrite = ''
  return $p.getLines(route)
  .then((lines) => {
    data = []
    _.forEach(lines, (line) => {
      let a = line.split(':')
          a = [a.shift(), a.join(':')]

      let b = a[1].split('->')
      let d = b[1].split('@')
      let o = {
        action: a[0],
        controller: d[0],
        method: d[1],
        routes: b[0].trim().split(' ')
      }
      data.push(o)
    })
    return data
  })
  .then((data)=> {
    _.forEach(data, (o) => {
      _.forEach(o.routes, (route)=> {
        var mod = path.join(path.normalize(__dirname), '../../controllers', o.controller.trim())
            mod = mod.split('\\').join('\\\\')
        dataToWrite += `\n\tapp.${o.action.toLowerCase()}('${route.trim()}', require('${mod}.js').${o.method.trim()});`
      })
    })
    return dataToWrite
  })
}

module.exports = () => {
  return Promise.all(promises)
          .then(values => {
            var data = `module.exports = (app) => {`
              // console.log(values.join(''));
            data += values.join('') + '}'
            return $p.writeFile('cache/routes.js', data)
          })
}
