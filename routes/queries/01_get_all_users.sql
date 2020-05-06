SELECT *
FROM users
WHERE email = x;


-- trends
SELECT resources.*, AVG(resource_reviews.ratings) AS rating
FROM resources
JOIN resource_reviews ON resource_id = resources.id
-- how to get date within 24 hours
GROUP BY AVG(resource_reviews.ratings)
HAVING resource_reviews.rating > 4
;

-- get all pins
<<<<<<< HEAD
SELECT resources.*,

<<<<<<< HEAD
SELECT resources.*, AVG(resource_reviews.rating) AS rating
 FROM resources
 LEFT JOIN resource_reviews ON resource_id = resources.id
 WHERE category = 'Technology';
 GROUP BY resources.id
=======
SELECT resources.*
>>>>>>> draft
=======
>>>>>>> 03bf204da1537c4adfc2f6a9b720f709d76af135
