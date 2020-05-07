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

  const getResourceTrending = (category) => {
    let queryString = `
      SELECT resources.*, AVG(resource_reviews.rating) AS rating
      FROM resources
      LEFT JOIN resource_reviews ON resource_id = resources.id
      WHERE created_at >= NOW() - INTERVAL '24 HOURS'
      GROUP BY resources.id
      ORDER BY created_at DESC;
    `
    return db
    .query(queryString)
    .then(res =>  (res.rows))
  };

  let categories = ['Home Improvement', 'Automotive', 'Health & Personal Care', 'Hobbies & Crafts', 'Technology', 'Cooking & Baking', 'Lifestyle', 'Fitness & Wellness', 'Finance & Business', 'Education & Communication'];

  const chooseCategory = categories[Math.floor(Math.random()*categories.length)];


  router.post("/", (req, res) => {
    const category = req.body.categories;
    res.redirect(`/resources/${category}`)
  });

  router.get("/:category", (req, res) => {
    let category = req.params.category;
    if (category === 'trending') {
      getResourceTrending(category)
      .then(resources => {
        res.render('results', {resources, category, moment});
      })
      .catch((err) => (res.status(500).send(err)));
    } else if (category === 'surprise') {
      getResource(chooseCategory)
      .then(resources => {
        res.render('results', {resources, category, moment});
      })
      .catch((err) => (res.status(500).send(err)));
    } else if (!categories.includes(category)) {
      res.status(500).send(`There is not category named ${category}, please go pick another category! <a href='/'>Back to homepage</a>` );
    } else {
      getResource(category)
      .then (resources => {
        res.render('results', {resources, category, moment});
      })
      .catch((err) => (res.status(500).send(err)));
    };
  })
  return router;
}

