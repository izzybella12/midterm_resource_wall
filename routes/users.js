/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
// const bcrypt = require('bcrypt');

// login
// people logging in with email or username?




//Homepage
router.get('/', (req, res) => {
//if user decides to login

//if user decides to search something

  res.redirect('resources')
})

router.post('')
//Checking to see if the email and password match the database
const login = function (email, password) {
  return database.getUserwithEmail(email)
  .then(user => {
    if (bcrypt.compareSync(password, user.password)){
      return user;
    }
    return null;
  })
}

//login
router.post('/login', (req, res) => {
  const {email, password} = req.body;
  login(email, password)
  .then(user => {
    if(!user) {
      res.send({error: "Please register"});
      return;
    }
    req.session.userId = user.id;
    res.send({user: {name: user.name, email: user.email, id: user.id}});
  })
  .catch(e => res.send(e));
})


// register page
router.post('/register'), (req, res) => {

}


module.exports = (db) => {

  //homepage
  // login and search
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

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
    GROUP BY AVG(resource_reviews.rating) AS rating, COUNT(resource_reviews.likes AS likes
    HAVING resource_reviews.likes = true
    ORDER BY
    `

//     db.query(queryString, [resources.category] => {
//       if (resources.category.split(' ').length > 1) {
// // fix a tire

//       } else {
//         resource
//       }


//     })
      console.log(req.query.split(''))
    res.send('Ok')

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


//profile
router.get('/profile')
