// //get a single user with a given email and password
// const getUserWithEmail = function (email) {
//   const queryString = `
//   SELECT *
//   FROM users
//   WHERE email = $1`;
//   // console.log("queryString for getUserwithEmail:", queryString);
//   return pool
//     .query(queryString, [email])
//     .then((res) => res.rows[0])
//       // console.log(res.rows[0]);

//     .catch((err) => console.error(err));
// };
// exports.getUserWithEmail = getUserWithEmail;

