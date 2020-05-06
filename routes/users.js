/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { Pool } = require("pg");
const bcrypt = require('bcrypt');
const moment = require('moment');
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: ['12fasf5ywefgd']
}));



module.exports = (db) => {


  const getUserwithEmail = function(email) {
    const queryString = 'SELECT * FROM users WHERE email = $1';
    return db
    .query(queryString, [email])
    .then(res => (res.rows[0]))
  }

  const getUserWithUsername = function(username) {
    const queryString = `SELECT * FROM users WHERE username = $1`;
    return db
    .query(queryString, [username])
    .then(res => (res.rows[0]))
  }

  const authenticateUser =  function(email, password) {
    return getUserwithEmail(email)
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    });
  }

  router.post('/login', (req, res) => {
    const {email, password} = req.body;
    console.log(email);
    console.log(`password is ${password}`);
    // res.send('okay!')
    authenticateUser(email, password)
    .then(user => {
      if (!user) {
        res.send({error: "error"});
        return;
      }
      req.session.userId = user.id;
      let username = user.username;
      res.redirect(`/users/login/${username}`)
    })
    .catch(e => res.send(e));
  });

  const getResourceForUser = function (username) {
    let queryString =`
    SELECT resources.*
    FROM resources
    JOIN users ON user_id = users.id
    WHERE users.username = $1;`
    return db
    .query(queryString, [username])
    .then (res => (res.rows))
  }




  router.get('/login/:username', (req, res) => {
    let username = req.params.username;
    getResourceForUser(username)
    .then(resources => {
      res.render('profile', {resources, username, moment})
    })
  });


  router.get('/login/:username/edit', (req, res) => {
    let username = req.params.username;
    getResourceForUser(username)
    .then(resources => {
      res.render('editProfile', {resources, username, moment})
    })
  });


  //logout
  router.post('/logout', (req, res) => {
    req.session = null;
    res.redirect('/')
  });




  return router;
};

