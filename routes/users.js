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

  router.post('/', (req, res) => {
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
      res.redirect(`/users/${username}`)
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

  router.get('/:username', (req, res) => {
    let username = req.params.username;
    getResourceForUser(username)
    .then(resources => {
      res.render('profile', {resources, username})
    })

  });



  // const addUser = function (username, email, password) {
  //   const queryString = `
  //   INSERT INTO users (username, email, password)
  //   VALUES ($1, $2, $3) RETURNING *`
  //   return db
  //   .query(queryString, [username, email, password])
  //   .then(res => res.rows[0])
  // }

<<<<<<< HEAD


  // router.post('/', (res, req) => {
=======
  // router.post('/register', (res, req) => {
>>>>>>> bcd08a5207ab658c41826d9e69e79367f2363545
  //   // const {email, password} = req.body;
  //   // console.log(email);
  //   // console.log(`password is ${password}`);
  //   const username = req.body;
  //   console.log('Im the user on register', username)
<<<<<<< HEAD
    // res.send('oK')
    // console.log(req.query)
=======
  // })
   
    // console.log(req.query) 
>>>>>>> bcd08a5207ab658c41826d9e69e79367f2363545
    // const email = user.email;
    // const username = user.username;
    // const password = user.password;
    // const hashedPassword = bcrypt.hashSync(password, 12);

      // if (!email || !password ||!username) {
      //   res.statusCode(400).send("Fields cannot be blank!");

      // } else if (getUserwithEmail(email) || getUserWithUsername(username)) {
      //   res.status(400).send("An account with this email or username already exists!");
      // } else {
      //   res.send('your registered!')
      //   res.redirect("/")
        //req.session.userId = user.id;

    // })
    // .catch(e => res.send(e));
<<<<<<< HEAD

=======
  
>>>>>>> bcd08a5207ab658c41826d9e69e79367f2363545

  // router.get('/register', (req, res) => {
  //   res.json
  // })


<<<<<<< HEAD
=======
  router.get('/login/:username', (req, res) => {
    let username = req.params.username;
    getResourceForUser(username)
    .then(resources => {
      res.render('profile', {resources, username, moment})
    })
>>>>>>> bcd08a5207ab658c41826d9e69e79367f2363545



  //logout
  router.post('/logout', (req, res) => {
    req.session = null;
    res.redirect('/')
  });




  return router;
};

