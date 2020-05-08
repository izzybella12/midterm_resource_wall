/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
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
  };

  const updateUserProfile = function(username, fullName, email, password, id) {
    queryString = `
    UPDATE users
    SET username = $1, full_name = $2, email = $3, password= $4
    WHERE id = $5
    `
    return db
    .query(queryString, [username, fullName, email, password, id])
  };

  router.get('/:username', (req, res) => {
    let username = req.params.username;
    let user = req.session.userId;
    getResourceForUser(username)
    .then(resources => {
      res.render('profile', {resources, username, moment, user})
    })
  });

  router.post('/:username/edit', (req, res) => {
    const user = req.body;
    const name = user.fullName;
    const new_username = user.username;
    const password = bcrypt.hashSync(user.password, 12);
    const email = user.email
    const userId = req.session.userId
    if (!userId) {
      res.status(401).send("sorry not your profile!")
    }
    updateUserProfile(new_username, name, email, password, userId)
    .then(user => {
      let username = new_username;
      res.redirect(`/users/${username}`)
    })

  router.get('/:username/edit', (req, res) => {
    let username = req.params.username;
    const userId = req.session.userId
    if (!userId) {
      res.status(404).send('sorry you do not have access')
    }
    getUserInfo(username)
    .then(user => {
      res.render('editProfile', {user, username});
    })
  });

  return router;
};

