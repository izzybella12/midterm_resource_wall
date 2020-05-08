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

  const authenticateUser =  function(email, password) {
    return getUserwithEmail(email)
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    });
  }
  
  const getUserwithEmail = function(email) {
    const queryString = 'SELECT * FROM users WHERE email = $1';
    return db
    .query(queryString, [email])
    .then(res => (res.rows[0]))
  }

  const getUserInfo = (username) => {
    const queryString = `
    SELECT *
    FROM USERS
    WHERE username = $1`

    return db
    .query(queryString, [username])
    .then(res => res.rows[0])
  }

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
      res.send("sorry not your user!")
    }
    updateUserProfile(new_username, name, email, password, userId)
    .then(user => {
      let username = new_username;
      res.redirect(`/users/${username}`)
    })
  })


  router.get('/:username/edit', (req, res) => {
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

