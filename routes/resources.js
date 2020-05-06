const express = require('express');
const router  = express.Router();
const moment = require('moment');

module.exports = (db) => {

  const getResource = function(category) {
    let queryString = `
      SELECT resources.*, AVG(resource_reviews.rating) AS rating
      FROM resources
      LEFT JOIN resource_reviews ON resource_id = resources.id
      WHERE category = $1
      GROUP BY resources.id
      ORDER BY created_at DESC;
      `
    return db
    .query(queryString, [category])
<<<<<<< HEAD
    .then(res => (res.rows))
=======
    .then(res =>  (res.rows))
>>>>>>> 69773ebbbe6d33405d1fa67f480e9bd5be831ca6
  }

  router.post("/", (req, res) => {
    const category = req.body.categories;
    res.redirect(`/resources/${category}`)
  });

<<<<<<< HEAD
  
=======
>>>>>>> 69773ebbbe6d33405d1fa67f480e9bd5be831ca6
  router.get("/:category", (req, res) => {
    let category = req.params.category;
    getResource(category)
    .then (resources => {
     
      res.render('results', {resources, category, moment})
    })
    .catch((err) => (res.status(500).send(err)));
  })





  // })
  // router.get('/results', (req, res) => {

  // })



  return router;
}
