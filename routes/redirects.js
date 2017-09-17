
const express = require('express')
const router = express.Router()

// KEY:
// m: require middleware
// c: require controller

router.get('/auth', c('oAuth@AuthURL'))
router.get('/accepted', c('oAuth@Accepted'))
router.get('/redis', c('home@redis'))
router.get('/test', function(req, res) {res.render('test.html')})


module.exports = router
