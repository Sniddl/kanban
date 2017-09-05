module.exports = {


  example(req, res) {
    console.log(req.body.message, 'the ID was', req.body.id);
    res.end('Check your server log')
  },

  dashboard(req, res) {
    res.render('index.html')
    // res.send(JSON.stringify(req.reddit))
  }
}
