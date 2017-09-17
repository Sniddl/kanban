const _ = require('lodash')
const crypto = require('crypto')
const bodyParser = require('body-parser')
const express = require('express')
const app = express();
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({
        extended: false
      })


/**
 * @param {base64}  key   - UUID to be used
 * @param {String}  type  - Type of event that is being logged (delete, permission-change, flair)
 * @param {String}  user  - The logged in user initiating the action
 * @param {String}  ev    - Details of the Event.
*/
function log(key, type, user, ev) {
  let tz    = new Date().getTimezoneOffset() / 60,
      sign  = (tz < 0) ? '+' : '-'

  redis.hsetnx('logs', key, JSON.stringify({
      type: type,
      user: user,
      ev: ev,
      unix: Math.round((new Date()).getTime() / 1000),
      tz: sign + tz
    }))
    .then((response) => {
      return key;
    })
    .catch(console.log);
}



module.exports = {
  get(req, res) {
    let users = redis.hgetall('users')
      .then((usersJSON) => {
        _.forEach(usersJSON, function(value, key) {
          usersJSON[key] = JSON.parse(value)
        })
        res.render('admin-panel.html', {
          users: usersJSON
        })
      })
  },







  /**
   * @var {Object} parsed - Current permission at the time of retrieval for logging purp.
   * @var {String} ev - Event for logging.
   * @var {base64} key - UUID for the log to be stored any momento
   * @var {String} user - Change the perms of this user.
   * @var {String} permission - The new permissions
  */
  change_permission(req, res) {
    let user          = req.body.user,
        permission    = req.body.permission,
        parsed,
        oldpermission,
        ev,
        key

    redis.hget('users', user)
      .then((response) => {
        parsed        = JSON.parse(response),
        oldpermission = parsed.permission,
        ev            = user + "-" + oldpermission + " +" + permission,
        key           = crypto.randomBytes(128).toString('base64')

        log(key, 'permission_change', req.signedCookies.snoo.username, ev);
        parsed.permission = permission;

        return redis.hset('users', user, JSON.stringify(parsed))
      }).catch(console.log)
      .then((response) => {
        res.redirect('/admin');
      })
      .catch((e) => {
        redis.hdel('logs', key)
        console.log("Error when saving permission: " + e + "Log deleted: " + key.substring(0, 6));
      });

  }
}
