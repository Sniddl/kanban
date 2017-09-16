
const express = require('express')
const router = express.Router()

// KEY:
// m: require middleware
// c: require controller

router.use(m('oAuth@required'))


router.get('/admin', c('admin@get'))
router.get('/docs', c('home@docs'))
router.post('/changepermission', c('admin@change_permission'))
router.get('/api/mysubreddits', c('endpoints@mysubreddits'))
router.get('/api/unmoderated', c('endpoints@unmoderated'))


module.exports = router
