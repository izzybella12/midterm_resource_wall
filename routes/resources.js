const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  const getResource = function(category) {
    let queryString = `
      SELECT resources.*, AVG(resource_reviews.rating) AS rating
      FROM resources
      JOIN resource_reviews ON resource_id = resources.id
      WHERE resources.category LIKE $1
      GROUP BY resources.id;
      `
    return db
    .query(queryString, [category])
    .then(res => console.log((res.rows)))
    // .then(res => res.rows)
    .catch((err) => console.error(err));
  }

  router.post("/", (req, res) => {
    const category = req.body.categories;
    console.log("this is the cat", category)
    getResource(category)

    // .then(res => res.redirect('/:category'))
    //redirect to that specific category one result
    // res.redirect('/:category')
  });
  //
  // router.get('/results', (req, res) => {

  // })



  return router;
};
