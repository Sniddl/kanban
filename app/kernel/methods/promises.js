const fs = require('fs')

const $p = {
/*====================================================================*/
getLines(file) {
  return new Promise(function(resolve, reject) {
    let lines = []
    let r = require('readline').createInterface({
      input: fs.createReadStream(file)
    });
    r.on('line', (line) => {
      lines.push(line)
    })
    r.on('close', () => {
      resolve(lines)
    })
  });
},
/*====================================================================*/
writeFile(file, data) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(file, data, (err) => {
      if (err) reject(err);
      resolve()
    });
  });
},
/*====================================================================*/
}

module.exports = $p
