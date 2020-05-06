const express = require('express');
const router  = express.Router();
// const { Pool } = require("pg");
// const bcrypt = require('bcrypt');
// const cookieSession = require('cookie-session');

// router.use(cookieSession({
//   name: 'session',
//   keys: ['12fasf5ywefgd']
// }));
module.exports =(db) => {


router.post('/', (res, req) => {
  // const {email, password} = req.body;
  // console.log(email);
  // console.log(`password is ${password}`);
  const username = req.body;
  console.log(req.query)
  console.log('Im the user on register', username)
})

return router
};