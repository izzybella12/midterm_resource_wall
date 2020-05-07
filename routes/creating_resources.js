const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');

router.use(cookieSession({
name: 'session',  keys: ['12fasf5ywefgd']
}));

module.exports = (db) => {
  const addResource = function(title, description, url, category, keyword, userId){
    const queryString = `
    INSERT INTO resources(title, description,  url, keyword, category, user_id, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *`
  return db
  .query(queryString, [title, description, url, category, keyword, userId])
  }
  const checkUrl = function(url) {
    const queryString = `
    SELECT *
    FROM resources
    WHERE url = $1`
    return db
    .query(queryString, [url])
  };
  const getUsername = function(userId) {
    const queryString = `
    SELECT username
    FROM users
    WHERE id = $1`
    return db
    .query(queryString, [userId])
  }

  router.post('/create', (req, res) => {
    const resource = req.body;
    const title = resource.title;
    const description = resource.description;
    const url = resource.url;
    const category = resource.category;
    const keywords = resource.keywords;
    const userId = req.session.userId

    if (category === 'Category') {
      res.status(400).send("Please pick a category!")
    }

    Promise
    .all([checkUrl(url), getUsername(userId)])
    .then(([resultByUrl, resultByUsername]) => {
      const username = resultByUsername.rows[0].username
      if (resultByUrl.rowCount) {
        res.status(400).send("A resource with this url has already exists!");
      } else {
        addResource(title, description, url, category, keywords, userId)
        .then(result => {
          res.redirect(`/users/login/${username}`)
        })
      }
    })
  })


  return router
}
