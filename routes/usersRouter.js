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



module.exports = (db) => {




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
    let user = req.session.userId;

    getResourceForUser(username)
    .then(resources => {
      res.render('profile', {resources, username, moment, user})
    })
  });

  // const getUserwith = function(email) {
  //   const queryString = 'SELECT * FROM users WHERE email = $1';
  //   return db
  //   .query(queryString, [email])
  //   .then(res => (res.rows[0]))
  // }

  const updateUserProfile = function(username, fullName, email, password, id) {
    queryString = `
    UPDATE users
    SET username = $1, full_name = $2, email = $3, password= $4
    WHERE id = $5
    `
    return db
    .query(queryString, [username, fullName, email, password, id])
  };

  router.post('/login/:username/edit', (req, res) => {
    const user = req.body;
    const name = user.fullName;
    const new_username = user.username;
    const password = bcrypt.hashSync(user.password, 12);
    const email = user.email
    const userId = req.session.userId
    if (!userId) {
      res.send("sorry not your user!")
    }
    updateUserProfile(new_username, name, email, password, userId)
    .then(user => {
      let username = new_username;
      res.redirect(`/users/login/${username}`)
    })
  })

  const getUserInfo = (username) => {
    const queryString = `
    SELECT *
    FROM USERS
    WHERE username = $1`

    return db
    .query(queryString, [username])
    .then(res => res.rows[0])
  }

  router.get('/login/:username/edit', (req, res) => {
    let username = req.params.username;
    const userId = req.session.userId
    if (!userId) {
      res.send('sorry you dont have access')
    }
    getUserInfo(username)
    .then(user => {
      res.render('editProfile', {user, username})
    })
  });

  return router;
};
