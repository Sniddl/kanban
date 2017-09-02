module.exports = {
  index(req, res) {
    res.render('index.html', {amount: req.params.amount})
  }, // notice trailing commas

  example(req, res) {
    console.log(req.body.message, 'the ID was', req.body.id);
    res.end('Check your server log')
  },
}
