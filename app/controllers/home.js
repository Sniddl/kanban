module.exports = {


  example(req, res) {
    console.log(req.body.message, 'the ID was', req.body.id);
    res.end('Check your server log')
  },

  dashboard(req, res) {
    res.render('index.html')
    // res.send(JSON.stringify(req.reddit))
  },

  redis(req, res) {
    redis.set('testing', 'this is a test', 'EX', 60) //expires in 60 sec
    res.send('test complete')
  }
}
