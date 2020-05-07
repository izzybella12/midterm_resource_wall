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
<<<<<<< HEAD

=======
>>>>>>> f2219adf6fd20c855332d455e75a58cfcacf6634
  }

  router.post("/", (req, res) => {
    const category = req.body.categories;
    res.redirect(`/resources/${category}`)
<<<<<<< HEAD

    // .then(resources =>(res.redirect('/:category'))
    //redirect to that specific category one result
    // res.redirect('/:category')
=======
>>>>>>> f2219adf6fd20c855332d455e75a58cfcacf6634
  });

  router.get("/:category", (req, res) => {
    let category = req.params.category;
    getResource(category)
    .then (resources => {
      res.render('results', {resources, category, moment})
    })
    .catch((err) => (res.status(500).send(err)));
  })

<<<<<<< HEAD
  router.post("/:category/"), (req, res) => {
    const resource = req.body.resource
    console.log(resource);
  }
=======
  // router.post("/:category/"), (req, res) => {
  //   const resource = req.body.resource
  //   console.log(resource);
  // }



  // })
  // router.get('/results', (req, res) => {

  // })


>>>>>>> f2219adf6fd20c855332d455e75a58cfcacf6634

  return router;
}
