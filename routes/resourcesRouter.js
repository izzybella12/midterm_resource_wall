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
    .then(res =>  (res.rows))
  }

  const getSingleResource = function(resourceID) {
    let queryString = `
    SELECT resources.*, users.username AS username, AVG(resource_reviews.rating) AS rating, COUNT(resource_reviews.liking) AS likes
    FROM resources
    FULL OUTER JOIN resource_reviews ON resource_id = resources.id
    FULL OUTER JOIN users ON resources.user_id = users.id
    WHERE resources.id = $1
    GROUP BY resources.id, username;
    `
    return db
    .query(queryString, [resourceID])
    .then(res => res.rows);
  }

  const allComments = function(resourceID) {
    let queryString =`
    SELECT comment, users.username
    FROM resource_reviews
    JOIN users ON user_id = users.id
    WHERE resource_id = $1
    `
    return db
    .query(queryString, [resourceID])
    .then(res => res.rows)
  }

  const addComment = function(comment, resourceID, userID) {
    let queryString = `
    INSERT INTO resource_reviews(comment, resource_id, user_id) VALUES($1,$2, $3)`
    return db.query(queryString, [comment, resourceID, userID])
  }

  const addRating = function(rating, resource_id, user_id) {
    let queryString = `
    INSERT INTO resource_reviews(rating, resource_id, user_id) VALUES($1,$2, $3)`

    return db.query(queryString, [rating, resource_id, user_id])
  }

  const addLike = function(resource_id, user_id) {
    // let queryString =`
    //   UPDATE resource_reviews
    //   SET liking = T
    //   WHERE resource_id = $1 AND user_id = $2
    //   `

    let queryString = `
    INSERT INTO resource_reviews(liking, resource_id, user_id) VALUES(TRUE, $1, $2)`

      return db.query(queryString, [resource_id, user_id])
  }

  //Routing for cat form to redirect to form
  // Francis is funnily mystified.
  // Francis is always judging.

  router.get("/resources/", (req, res) => {
    res.render("resource");
  });

  router.post("/", (req, res) => {
    const category = req.body.categories;
    res.redirect(`/resources/categories/${category}`)
  });

  router.get("/categories/:category_id", (req, res) => {
    let category = req.params.category_id;
    getResource(category)
    .then (resources => {
      res.render('results', {resources, category, moment})
    })
    .catch((err) => (res.status(500).send(err)));
  })

  router.get("/create") //JUDITH PUT YOURS HERE

  router.get("/:resource_id", (req, res) => {
      let id = req.params.resource_id;

      Promise.all([getSingleResource(id), allComments(id)])
      .then(results => {
        const sResource = results[0][0];
        sResource.comments = results[1];
        res.render('resource', {singleResource: sResource})
      })
      .catch((err) => (console.log("500", err.message)));
  });

  router.post("/:resource_id/comments/new", (req, res) => {
    const resource_id = req.params.resource_id;
    const user_id = req.session.user_id;
    const comment = req.body.comment;

    addComment(comment, resource_id, 1)
      .then(dbRes => res.json("OK"))
  });

  router.post("/:resource_id/likes/new", (req, res) => {
    const resource_id = req.params.resource_id;
    const user_id = req.session.user_id;

    addLike(resource_id, user_id)
    .then(dbRes => res.json("OK"))
  });

  router.post("/:resource_id/ratings/new", (req, res) => {
    const rating = req.params.rating;
    const resource_id = req.params.resource_id;
    const user_id = req.session.user_id;

    addRating(rating, resource_id, 1)
    .then(dbRes => res.json("OK"))
  });

  return router;
}
