const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  const getSingleResource = function(resourceID) {
    let queryString = `
    SELECT resources.*, AVG(resource_reviews.rating) AS rating, COUNT(resource_reviews.liking) AS likes
    FROM resources
    JOIN resource_reviews ON resource_id = resources.id
    WHERE resources.category = 'Food'
    GROUP BY resources.id;
    `
    return db
    .query(queryString, resourceID)
    .then(res => console.log('this is res:', res.rows))
    // .then(res => res.rows)
    .catch((err) => console.error(err));
  }


  router.get("/:id", (req, res) => {
    let id = req.params.id;
<<<<<<< HEAD
    getResource(id)
    .then (resources => {
      console.log(resources);
      res.render('results', {resources})
=======
    getSingleResource(id)
    .then (resources => {
      console.log(resources);
      res.render('resource', {resources})
>>>>>>> draft
    })
    .catch((err) => (res.status(500).send(err)));
  })

  return router;


  const addLike = function(resourceID) {
    let queryString =`
    UPDATE resource_reviews
    SET liking = TRUE
    WHERE id = $1
    `
  }

  const addComment = function(comment, resourceID) {
    let queryString = `
    UPDATE resource_reviews
    SET comment = $1
    WHERE id = $2
    `
  }

  const addRating = function(rating, resourceID) {
    let queryString = `
    UPDATE resource_reviews
    SET rating = $1
    WHERE id = $2
    `
  }

}

//
