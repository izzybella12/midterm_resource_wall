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
>>>>>>> 03bf204da1537c4adfc2f6a9b720f709d76af135
  }

  router.post("/", (req, res) => {
    const category = req.body.categories;
    res.redirect(`/resources/${category}`)
<<<<<<< HEAD

    // .then(resources =>(res.redirect('/:category'))
    //redirect to that specific category one result
    // res.redirect('/:category')
=======
>>>>>>> 03bf204da1537c4adfc2f6a9b720f709d76af135
  });

  router.get("/:category", (req, res) => {
    let category = req.params.category;
    getResource(category)
    .then (resources => {
<<<<<<< HEAD
=======

>>>>>>> 03bf204da1537c4adfc2f6a9b720f709d76af135
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



  // })
  // router.get('/results', (req, res) => {

  // })


>>>>>>> 03bf204da1537c4adfc2f6a9b720f709d76af135

  return router;
}
