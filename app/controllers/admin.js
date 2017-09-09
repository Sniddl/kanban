const _ = require('lodash')
const crypto = require('crypto')
var bodyParser = require('body-parser')

var express = require('express'),
    app = express();

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = {

  get(req, res) {
    let users = redis.hgetall('users')
    .then((usersJSON)=>{
      _.forEach(usersJSON, function (value, key) {
        usersJSON[key] = JSON.parse(value)
      })
      res.render('admin-panel.html', {users: usersJSON})
    })
  },

  change_permission(req,res){
    let user          = req.body.user, //Changing the perms of this user;
        permission    = req.body.permission // to this

    redis.hget('users', user)
    .then((response)=>{
      let parsed = JSON.parse(response);

      let oldpermission = parsed.permission, // Current permission at the time of retrieval for logging purp.
          ev            = user + "-" + oldpermission + " +" + permission, //Event for logging
          key           = crypto.randomBytes(128).toString('base64') //Creates a UUID for the log to be stored any momento

      log(key, 'permission_change', req.signedCookies.snoo.username, ev);

      parsed.permission = permission;
      redis.hset('users', user, JSON.stringify(parsed))
      .then((response)=>{
        console.log("Updated user permission with response: " + response);
        res.redirect('/admin');
      })
      .catch((e)=>{
        redis.hdel('logs', key)
        console.log("Error when saving permission: " + e + "Log deleted: " + key.substring(0,6));
      });
    })
    .catch((e)=>{
      console.log("Error when retrieving user for permission change: " + e);
    });
  }
}

function log(key, type, user, ev){
  //key - UUID to be used
  //type - Type of event that is being logged (delete, permission-change, flair)
  //user - user initiating the action - logged in user
  //ev - Details of the event (Post that was deleted, User that was updated and details of it)
  let tz   = new Date().getTimezoneOffset()/60
  let sign = (tz < 0) ? '+':'-'

  redis.hsetnx('logs', key, JSON.stringify({
    type: type,
    user: user,
    ev: ev,
    unix: Math.round((new Date()).getTime() / 1000),
    tz: sign + tz
  }))
  .then((response)=>{
    console.log("Event logged: " + type);
    return key;
  })
  .catch((e)=>{
    console.log("Error when creating " + type + " log. Error: " + e);
  });
}
