module.exports = {


mysubreddits (req, res) {
  res.setHeader('Content-Type', 'application/json');
  req.reddit.getModeratedSubreddits().then((r) => {
    res.send(JSON.stringify(r))
  })
},

unmoderated (req, res) {
  res.setHeader('Content-Type', 'application/json');
  var args = {
    limit: 5
  }
  if (req.params.type == 'after') args.after = req.params.name
  else if (req.params.type == 'before') args.before = req.params.name

  req.reddit.getSubreddit('PUBATTLEGROUNDSCSS').getUnmoderated(args)
  .then( listing => {
    res.send(listing)
  })
  .catch( err => res.send({success: false, error: true}) )
}


}
