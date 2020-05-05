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
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: ['12fasf5ywefgd']
}));

// login
// people logging in with email or username?



module.exports = (db) => {
//


  const getUserwithEmail = function(email) {
    const queryString = 'SELECT * FROM users WHERE email = $1';
    return db
    .query(queryString, [email])
    .then(res => (res.rows[0]))
    .catch((err) => console.error(err));
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

  router.post("/", (req, res) => {
    const {email, password} = req.body
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
      console.log('this is user.username', user.username);
      res.redirect(`/:user.username`)
    })
    .catch(e => res.send(e));
  });

  // router.post("/:user.username", (res, req) => {
  //   console.log('this is the body', req.params)
  //   console.log('i am a query', req.query)
  // })









// Results of Searched Learning
  router.get("/results", (req, res) => {
    // const { userId } = req.session;
    // if user is signed in, they can look at hte specific resource
    // if (!userId) {
    //   res.error("Please sign in!")
    //   return
    // }
    // look up the category and keywords to find whatever is searched
    // do we want to show how many people pinned it?
    //how to serach via keywords

    let queryString = `
    SELECT resources.*, AVG(resource_reviews.rating) AS rating, COUNT(resource_reviews.likes) AS likes
    FROM resources
    JOIN resource_reviews ON resource_id = resources.id
    WHERE resources.category LIKE '%$1%' OR resources.keywords LIKE ''
    `

//     db.query(queryString, [resources.category] => {
//       if (resources.category.split(' ').length > 1) {
// // fix a tire

//       } else {
//         resource
//       }


//     })
      // const { search } = req.query;
      // // search.length()
      // console.log(search)
      // res.send('Ok')


    // queryString += 1` GROUP BY AVG(resource_reviews.rating) AS rating, COUNT(resource_reviews.likes AS likes
    //   HAVING resource_reviews.likes = true
    //   ORDER BY`

    // "/results/:resourceId"
  });


// "/results/:resourceId"



  //logout
  router.post('/logout', (req, res) => {
    req.session = null;
    res.redirect('/')
  });




  return router;
};

