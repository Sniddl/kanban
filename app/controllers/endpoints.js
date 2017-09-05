module.exports = {


mysubreddits (req, res) {
  res.setHeader('Content-Type', 'application/json');
  req.reddit.getModeratedSubreddits().then((r) => {
    res.send(JSON.stringify(r))
  })
}


}
