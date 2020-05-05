const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  const getSingleResource = function(resourceID) {
    let queryString = `
    SELECT resources.*, AVG(resource_reviews.rating) AS rating, COUNT(resource_reviews.liking) AS likes
    FROM resources
    JOIN resource_reviews ON resource_id = resources.id
    WHERE id = $1
    GROUP BY resources.id;
    `
    return db
    .query(queryString, resourceID)
    .then(res => console.log('this is res:', res.rows))
    // .then(res => res.rows)
    .catch((err) => console.error(err));
  }

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
