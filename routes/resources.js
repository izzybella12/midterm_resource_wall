const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.post("/", (req, res) => {
    const { learn } = req.body;
    console.log(learn)
    // console.log(req.query);
    res.send('okay')
    //res.redirect("/results")
  });
  //
  // router.get('/results', (req, res) => {

  // })



  return router;
};
