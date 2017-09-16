module.exports = {



    required(req, res, next) {
      if (req.signedCookies.snoo) req.reddit = snoo(req.signedCookies.snoo.refresh_token)
      else return res.redirect('/r/auth')
      next()
    }


}
